import { InputHTMLAttributes, forwardRef } from 'react';


const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
({ className = '', ...props }, ref) => (
<input ref={ref} {...props} className={`input border-gray-300 bg-white ${className}`} />
),
);


export default Input;