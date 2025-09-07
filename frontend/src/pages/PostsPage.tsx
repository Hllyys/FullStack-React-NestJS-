import { useCallback, useEffect, useMemo, useState } from 'react';
import { postsApi, type Post } from '../api/posts';
import { usersApi, type User } from '../api/users';
import { getErrorMessage } from '../lib/errors';
import Modal from '../components/ui/Modal';

type Form = { title: string; body: string; userId: number | '' };

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  //  metin arama
  const [q, setQ] = useState('');

  const [form, setForm] = useState<Form>({ title: '', body: '', userId: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const isEditing = useMemo(() => editingId !== null, [editingId]);

  const loadUsers = useCallback(async (): Promise<void> => {
    try {
      setUsers(await usersApi.list());
    } catch {
      alert("Error");
    }
  }, []);

  const loadPosts = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const data = await postsApi.list();
      setPosts(data);
    } catch (err: unknown) {
      alert(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  useEffect(() => {
    void loadPosts();
  }, [loadPosts]);

  // id -> user hızlı erişim
  const userById = useMemo(() => {
    const m = new Map<number, User>();
    users.forEach((u) => m.set(u.id, u));
    return m;
  }, [users]);

  // arama filtresi (Title + Content + kullanıcı adı/ad)
  const filteredPosts = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return posts;

    return posts.filter((p) => {
      const title = (p.title ?? '').toLowerCase();
      const body = (p.body ?? '').toLowerCase();
      const u = userById.get(p.userId);
      const uname = (u?.username ?? '').toLowerCase();
      const name = (u?.name ?? '').toLowerCase();
      return (
        title.includes(term) ||
        body.includes(term) ||
        uname.includes(term) ||
        name.includes(term)
      );
    });
  }, [posts, q, userById]);

  function resetForm(): void {
    setForm({ title: '', body: '', userId: '' });
    setEditingId(null);
  }

  function handleNew(): void {
    resetForm();
    setOpen(true);
  }

  function handleEdit(p: Post): void {
    setEditingId(p.id);
    setForm({ title: p.title, body: p.body, userId: p.userId });
    setOpen(true);
  }

  async function handleDelete(id: number): Promise<void> {
    if (!confirm('Delete?')) return;
    try {
      await postsApi.remove(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
      if (editingId === id) resetForm();
    } catch (err: unknown) {
      alert(getErrorMessage(err));
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    if (!form.userId) {
      alert('Select useriz');
      return;
    }
    try {
      if (isEditing && editingId) {
        const updated = await postsApi.update(editingId, {
          title: form.title,
          body: form.body,
          userId: form.userId as number,
        });
        setPosts((prev) => prev.map((p) => (p.id === editingId ? updated : p)));
      } else {
        const created = await postsApi.create({
          title: form.title,
          body: form.body,
          userId: form.userId as number,
        });
        setPosts((prev) => [...prev, created]);
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
        <h1 className="text-xl font-semibold">Posts</h1>
        <button className="btn btn-primary" onClick={handleNew}>
         Add
        </button>
      </div>

      {/* Arama + Yenile */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <input
          className="input"
          placeholder="Search: title,username, content"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />

        <button
          className="px-4 py-2 rounded-lg bg-amber-500 text-white hover:bg-amber-600 transition"
          onClick={() => {
            void loadPosts();
          }}
        >
          Refresh
        </button>
      </div>

      {/* Liste */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="card overflow-x-auto p-0">
          <table className="w-full border-collapse">
            <thead className="bg-slate-100 text-left">
              <tr>
                <th className="p-3">Order</th>
                <th className="p-3">Title</th>
                <th className="p-3">Contents</th>
                <th className="p-3">User</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredPosts.map((p) => {
                const u = userById.get(p.userId);
                return (
                  <tr key={p.id} className="border-t">
                    <td className="p-3">{p.id}</td>
                    <td className="p-3">{p.title}</td>
                    <td className="p-3">{p.body}</td>
                    {/* id yerine isim */}
                    <td className="p-3">{u ? u.name : `Kullanıcı #${p.userId}`}</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button
                          className="btn btn-sm btn-primary"
                          onClick={() => handleEdit(p)}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-sm btn-error"
                          onClick={() => {
                            void handleDelete(p.id);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredPosts.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-6 text-center">
                    No results found
                  </td>
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
              <h3 className="text-lg font-semibold">
                {isEditing ? 'Edit Post' : 'New post'}
              </h3>
              <button className="btn btn-ghost" onClick={() => setOpen(false)}>
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-3">
              <input
                className="input"
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                autoFocus
                required
              />
              <input
                className="input"
                placeholder="Content"
                value={form.body}
                onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
                required
              />
              <select
                className="select"
                value={form.userId === '' ? '' : String(form.userId)}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    userId: e.target.value ? Number(e.target.value) : '',
                  }))
                }
                required
              >
                <option value="">Select user…</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.id} — {u.name}
                  </option>
                ))}
              </select>

              <div className="mt-2 flex justify-end gap-2">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  {isEditing ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
}
