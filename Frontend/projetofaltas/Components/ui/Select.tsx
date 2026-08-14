import React, { SelectHTMLAttributes, forwardRef } from 'react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /**
   * Opções do select
   */
  options: SelectOption[];
  /**
   * Placeholder/opção padrão
   */
  placeholder?: string;
  /**
   * Tamanho do select
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Mostrar borda ao focar
   * @default true
   */
  withBorder?: boolean;
  /**
   * Classes CSS adicionais
   */
  className?: string;
}

const sizeStyles = {
  sm: 'px-2.5 py-1.5 text-sm',
  md: 'px-3 py-2 text-base',
  lg: 'px-4 py-3 text-lg',
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      placeholder,
      size = 'md',
      withBorder = true,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'w-full font-medium text-gray-900 placeholder-gray-400 transition-all duration-200 outline-none appearance-none cursor-pointer bg-no-repeat bg-right pr-10';
    const borderStyles = withBorder
      ? 'border rounded-lg border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500'
      : 'border-b border-gray-300 focus:border-blue-500';
    const sizeClass = sizeStyles[size];

    const chevronIcon = `
      url('data:image/svg+xml;charset=US-ASCII,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2020%2020%22><path%20fill=%22%236b7280%22%20d=%22M5.293%207.293a1%201%20100%201.414L10%2012.414l4.707-4.707a1%201%200-1.414-1.414L10%209.586%205.293%204.879z%22/></svg>')
    `;

    return (
      <select
        ref={ref}
        className={`
          ${baseStyles}
          ${borderStyles}
          ${sizeClass}
          ${className}
        `}
        style={{ backgroundImage: chevronIcon }}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
    );
  }
);

Select.displayName = 'Select';
