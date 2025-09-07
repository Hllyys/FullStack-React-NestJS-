import { useEffect, useMemo, useState } from 'react';
import { usersApi, type User } from '../api/users';         
import { getErrorMessage } from '../lib/errors';
import Modal from '../components/ui/Modal';               
import { postsApi } from '../api/posts';

type Form = { name: string; email: string };

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<Form>({ name: '', email: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  const isEditing = useMemo(() => editingId !== null, [editingId]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        setUsers(await usersApi.list());
      } catch (err: unknown) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function resetForm(): void {
    setForm({ name: '', email: '' });
    setEditingId(null);
  }

  function handleNew(): void {
    resetForm();
    setOpen(true);
  }

  function handleEdit(u: User): void {
    setEditingId(u.id);
    setForm({ name: u.name, email: u.email });
    setOpen(true);
  }

  async function handleDelete(id: number): Promise<void> {
    const posts = await postsApi.listByUser(id); // /posts?userId=id
  if (posts.length > 0) {
    alert("This user has posts. Delete or disable posts first.");
    return; 
  }
    if (!confirm('Delete ? ?')) return;
    try {
      await usersApi.remove(id);
      setUsers(prev => prev.filter(u => u.id !== id));
      if (editingId === id) resetForm();
    } catch (err: unknown) {
      alert(getErrorMessage(err));
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    try {
      if (isEditing && editingId) {
        const updated = await usersApi.update(editingId, form);
        setUsers(prev => prev.map(u => (u.id === editingId ? updated : u)));
      } else {
        const created = await usersApi.create(form);
        setUsers(prev => [...prev, created]);
      }
      resetForm();
      setOpen(false);
    } catch (err: unknown) {
      alert(getErrorMessage(err));
    }
  }

  return (
    <div className="mx-auto max-w-5xl p-4">
      {/* Title + sağ üst Ekle */}
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Users</h1>
        <button className="btn btn-primary" onClick={handleNew}>Add</button>
      </div>

      {loading && <p>Loading......</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="card overflow-x-auto p-0">
          <table className="w-full border-collapse">
            <thead className="bg-slate-100 text-left">
              <tr>
                <th className="p-3">Order</th>
                <th className="p-3">Name</th>
                <th className="p-3">E-mail</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} className="border-t">
                  <td className="p-3">{u.id}</td>
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleEdit(u)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => { void handleDelete(u.id); }}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-6 text-center">No record</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {open && (
        <Modal>
          <div className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold">{isEditing ? 'Kullanıcıyı Düzenle' : 'New user'}</h3>
              <button className="btn btn-ghost" onClick={() => setOpen(false)}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-3">
              <input
                className="input"
                placeholder="Name surname"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                autoFocus
                required
              />
              <input
                className="input"
                placeholder="E-mail"
                type="email"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                required
              />

              <div className="mt-2 flex justify-end gap-2">
                <button type="button" className="btn btn-ghost" onClick={() => setOpen(false)}>Close</button>
                <button type="submit" className="btn btn-primary">{isEditing ? 'Update' : 'Add'}</button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
}
