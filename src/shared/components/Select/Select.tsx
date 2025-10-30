import type { FC, SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface Option {
  value: string;
  label: string;
  className?: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

const Select: FC<SelectProps> = ({ options, value, onChange, className, ...props }) => {
  return (
    <select
      value={value}
      onClick={e => e.stopPropagation()}
      onChange={e => {
        e.stopPropagation();
        onChange(e);
      }}
      className={cn(
        'text-xs font-medium px-2 py-1 rounded-full bg-white dark:bg-zinc-800 cursor-pointer',
        'whitespace-nowrap border focus:outline-none focus:ring-2 focus:ring-blue-400 min-w-[90px]',
        className
      )}
      {...props}
    >
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className={option.className}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
