import { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'outline' | 'danger' | 'success';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

export default function Button({ className = '', variant = 'outline', ...props }: Props) {
  const v =
    variant === 'primary'
      ? 'btn-primary'
      : variant === 'danger'
      ? 'btn-danger'
      : variant === 'success'
      ? 'btn-success'
      : 'btn-outline';

  return <button {...props} className={`btn ${v} ${className}`} />;
}
