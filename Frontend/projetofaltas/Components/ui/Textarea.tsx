import React, { TextareaHTMLAttributes, forwardRef } from 'react';

export interface TextareaProps
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'size'
  > {
  /**
   * Variante visual do textarea
   * @default 'default'
   */
  variant?: 'default' | 'error' | 'success' | 'ghost';

  /**
   * Tamanho do textarea
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
  ghost: 'border-gray-300 focus:border-red-500 focus:ring-red-500',
};

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      variant = 'default',
      size = 'md',
      withBorder = true,
      withShadow = false,
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'w-full font-medium text-gray-900 placeholder-gray-400 transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-0 resize-none';

    const borderStyles = withBorder
      ? `border rounded-lg ${variantStyles[variant]}`
      : 'border-b border-gray-300 focus:border-red-500';

    const shadowStyles = withShadow ? 'focus:shadow-lg' : '';

    const sizeClass = sizeStyles[size];

    return (
      <textarea
        ref={ref}
        className={`${baseStyles} ${borderStyles} ${shadowStyles} ${sizeClass} ${className}`.trim()}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
