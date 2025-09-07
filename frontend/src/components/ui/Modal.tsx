import { PropsWithChildren } from 'react';

export default function Modal({ children }: PropsWithChildren) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/30 backdrop-blur-sm p-4">
      <div className="card w-full max-w-lg">{children}</div>
    </div>
  );
}
