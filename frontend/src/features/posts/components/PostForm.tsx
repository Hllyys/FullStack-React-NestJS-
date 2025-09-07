import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import type { User } from '../../users/types/user.schema';
import type { Post } from '../../users/types/post.schema';

type PostFormValues = {
  userId: number;
  title: string;
  body: string;
};

export default function PostForm({
  post,
  users = [],
  onSubmit,
}: {
  post?: Post;
  users: User[];
  onSubmit: (v: PostFormValues) => Promise<void> | void;
}) {
  const [error, setError] = useState<string | null>(null);

  return (
    <form
      key={post?.id ?? 'new-post'}
      id="post-form"
      className="space-y-3"
      onSubmit={async (e) => {
        e.preventDefault();
        setError(null);

        const fd = new FormData(e.currentTarget as HTMLFormElement);
        const values: PostFormValues = {
          userId: Number(fd.get('userId') || 0),
          title: String(fd.get('title') || ''),
          body: String(fd.get('body') || ''),
        };

        // ✅ Validasyon
        if (!values.title || values.title.length < 3) {
          setError('Title must be at least 3 characters.');
          return;
        }
        if (!values.body || values.body.length < 5) {
          setError('Content must be at least 5 characters.');
          return;
        }

        try {
          await onSubmit(values);
        } catch (err: unknown) {
          let msg = 'An unexpected error occurred.';

          if (axios.isAxiosError(err)) {
            const axiosErr = err as AxiosError<{ message?: string }>;
            msg =
              axiosErr.response?.data?.message ??
              axiosErr.message ??
              msg;
          } else if (err instanceof Error) {
            msg = err.message;
          }

          setError(msg);
        }
      }}
    >
      {/* Genel hata mesajı */}
      {error && (
        <div className="p-2 rounded bg-red-100 text-red-700 border border-red-300">
          {error}
        </div>
      )}

      {/* User */}
      <div>
        <label className="label">User</label>
        <select
          name="userId"
          className="input border-gray-300 bg-white"
          defaultValue={post?.userId ?? ''}
          required
        >
          <option value="" disabled>
            Please select
          </option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name} (#{u.id})
            </option>
          ))}
        </select>
      </div>

      {/* Title */}
      <div>
        <label className="label">Title</label>
        <Input
          name="title"
          placeholder="Title"
          defaultValue={post?.title ?? ''}
          required
        />
      </div>

      {/* Content */}
      <div>
        <label className="label">Content</label>
        <textarea
          name="body"
          placeholder="Content"
          className="input border-gray-300 bg-white min-h-28"
          defaultValue={post?.body ?? ''}
          required
        />
      </div>

      {/* Aksiyonlar */}
      <div className="flex justify-end gap-2 pt-2">
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
