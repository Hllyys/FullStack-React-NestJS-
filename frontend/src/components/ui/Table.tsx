import { PropsWithChildren, HTMLAttributes } from 'react';

export function Table({ children }: PropsWithChildren) {
  return (
    <div className="overflow-auto rounded-2xl border bg-white shadow">
      <table className="min-w-full text-sm">{children}</table>
    </div>
  );
}

export function THead({
  children,
  className = '',
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLTableSectionElement>>) {
  return (
    <thead
      {...rest}
      className={`bg-indigo-200 text-slate-800 ${className}`}
    >
      {children}
    </thead>
  );
}

export function TBody({
  children,
  className = '',
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLTableSectionElement>>) {
  return (
    <tbody
      {...rest}
      className={`divide-y divide-gray-200 ${className}`}
    >
      {children}
    </tbody>
  );
}

export function TR({
  children,
  className = '',
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLTableRowElement>>) {
  return (
    <tr
      {...rest}
      className={`hover:bg-slate-50 odd:bg-white even:bg-slate-50 ${className}`}
    >
      {children}
    </tr>
  );
}

export function TH({
  children,
  className = '',
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLTableCellElement>>) {
  return (
    <th
      {...rest}
      className={`px-4 py-3 font-semibold text-left ${className}`}
    >
      {children}
    </th>
  );
}

export function TD({
  children,
  className = '',
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLTableCellElement>>) {
  return (
    <td
      {...rest}
      className={`px-4 py-2 text-slate-700 ${className}`}
    >
      {children}
    </td>
  );
}
