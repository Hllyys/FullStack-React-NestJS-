import { SelectHTMLAttributes } from 'react';


export default function Select({ className = '', ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
return <select {...props} className={`input border-gray-300 bg-white ${className}`} />;
}