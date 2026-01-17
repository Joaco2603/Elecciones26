import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className = '', icon, ...props }, ref) => {
  return (
    <div className="relative w-full">
      {icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400">
          {icon}
        </div>
      )}
      <input
        ref={ref}
        className={`w-full rounded-lg border border-blue-200 bg-white px-4 py-2 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${icon ? 'pl-10' : ''} ${className}`}
        {...props}
      />
    </div>
  );
});

Input.displayName = 'Input';
