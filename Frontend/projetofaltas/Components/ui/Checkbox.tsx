import React, { InputHTMLAttributes, forwardRef } from 'react';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Rótulo do checkbox
   */
  label?: string;
  /**
   * Tamanho do checkbox
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Descricão adicional
   */
  description?: string;
  /**
   * Classes CSS adicionais
   */
  className?: string;
}

const sizeStyles = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      size = 'md',
      description,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    return (
      <div className="flex gap-3">
        <input
          ref={ref}
          type="checkbox"
          id={id}
          className={`
            ${sizeStyles[size]}
            rounded
            border-gray-300
            text-blue-600
            shadow-sm
            focus:border-blue-500
            focus:ring-blue-500
            cursor-pointer
            transition-all
            ${className}
          `}
          {...props}
        />
        {label && (
          <div className="flex flex-col gap-0.5">
            <label
              htmlFor={id}
              className="text-sm font-medium text-gray-700 cursor-pointer"
            >
              {label}
            </label>
            {description && (
              <span className="text-xs text-gray-500">{description}</span>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
