import React, { InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'size' | 'prefix' | 'suffix'
  > {
  /**
   * Variante visual do input
   * @default 'default'
   */
  variant?: 'default' | 'error' | 'success';

  /**
   * Tamanho do input
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';

  /**
   * Mostrar borda ao focar
   * @default true
   */
  withBorder?: boolean;

  /**
   * Mostrar sombra ao focar
   * @default false
   */
  withShadow?: boolean;

  className?: string;

  prefix?: React.ReactNode;

  suffix?: React.ReactNode;
}

const sizeStyles = {
  sm: 'px-2.5 py-1.5 text-sm',
  md: 'px-3 py-2 text-base',
  lg: 'px-4 py-3 text-lg',
};

const variantStyles = {
  default: 'border-gray-300 focus:border-red-500 focus:ring-red-500',
  error: 'border-red-500 focus:border-red-600 focus:ring-red-500',
  success: 'border-green-500 focus:border-green-600 focus:ring-green-500',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'default',
      size = 'md',
      withBorder = true,
      withShadow = false,
      className = '',
      prefix,
      suffix,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'w-full font-medium text-gray-900 placeholder-gray-400 transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-0';

    const borderStyles = withBorder
      ? `border rounded-lg ${variantStyles[variant]}`
      : 'border-b border-gray-300 focus:border-red-500';

    const shadowStyles = withShadow ? 'focus:shadow-lg' : '';

    const sizeClass = sizeStyles[size];

    const prefixClass = prefix ? 'pl-10' : '';

    const suffixClass = suffix ? 'pr-10' : '';

    const containerClass = 'relative inline-flex items-center w-full';

    return (
      <div className={containerClass}>
        {prefix && (
          <div className="absolute left-3 flex items-center pointer-events-none text-gray-500">
            {prefix}
          </div>
        )}

        <input
          ref={ref}
          className={`${baseStyles} ${borderStyles} ${shadowStyles} ${sizeClass} ${prefixClass} ${suffixClass} ${className}`.trim()}
          {...props}
        />

        {suffix && (
          <div className="absolute right-3 flex items-center pointer-events-none text-gray-500">
            {suffix}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';