import { useMemo, useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import type { User } from '../types/user.schema';

type Props = {
  user?: User;                 // düzenleme: mevcut kullanıcı
  users?: User[];              // benzersizlik kontrolü için tüm kullanıcılar
  onSubmit: (v: { name: string; email: string }) => Promise<void> | void;
};

type Values = { name: string; email: string };
type Errors = Partial<Record<keyof Values, string>>;

export default function UserForm({ user, users = [], onSubmit }: Props) {
  const [values, setValues] = useState<Values>({
    name: user?.name ?? '',
    email: user?.email ?? '',
  });
  const [touched, setTouched] = useState<{ name: boolean; email: boolean }>({
    name: false,
    email: false,
  });

  // --- Doğrulama ---
  function validate(v: Values, all: User[], currentId?: number): Errors {
    const errs: Errors = {};

    // name
    const name = v.name.trim();
    if (name.length < 2) {
      errs.name = 'Name must be at least 2 characters.';
    } else {
      const exists = all.some(
        (u) => u.id !== currentId && u.name.trim().toLowerCase() === name.toLowerCase()
      );
      if (exists) errs.name = 'This name is already in use.';
    }

    // email
    const email = v.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // basit format kontrolü
    if (!emailRegex.test(email)) {
      errs.email = 'Enter a valid email address.';
    } else if (!email.toLowerCase().endsWith('.com')) {
      errs.email = 'Email must end with .com';
    } else {
      const exists = all.some(
        (u) => u.id !== currentId && u.email.trim().toLowerCase() === email.toLowerCase()
      );
      if (exists) errs.email = 'This email is already registered.';
    }

    return errs;
  }

  // Sadece id’yi bağımlılığa alarak exhaustive-deps uyarısını çözüyoruz
  const userId = user?.id;
  const errors = useMemo(() => validate(values, users, userId), [values, users, userId]);
  const isValid = !errors.name && !errors.email;

  // --- Handlers ---
  function setValue<K extends keyof Values>(k: K, v: string) {
    setValues((prev) => ({ ...prev, [k]: v }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setTouched({ name: true, email: true });
    if (!isValid) return;
    await onSubmit({ name: values.name.trim(), email: values.email.trim() });
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit} noValidate>
      {/* Name */}
      <div>
        <label className="label">Name</label>
        <Input
          name="name"
          placeholder="Full name"
          value={values.name}
          onChange={(e) => setValue('name', e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, name: true }))}
          aria-invalid={Boolean(touched.name && errors.name)}
          aria-describedby="name-error"
          required
        />
        {touched.name && errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-600">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="label">Email</label>
        <Input
          name="email"
          type="email"
          placeholder="email@example.com"
          value={values.email}
          onChange={(e) => setValue('email', e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          aria-invalid={Boolean(touched.email && errors.email)}
          aria-describedby="email-error"
          required
        />
        {touched.email && errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600">
            {errors.email}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-2">
        <Button type="submit" className="min-w-28" disabled={!isValid}>
          Save
        </Button>
      </div>
    </form>
  );
}
