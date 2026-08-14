import React, { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Variante visual do botão
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  /**
   * Tamanho do botão
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'full';
  /**
   * Estado de carregamento
   * @default false
   */
  isLoading?: boolean;
  /**
   * Estado desabilitado
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Mostrar como ícone
   * @default false
   */
  isIcon?: boolean;
  /**
   * Ícone ou elemento à esquerda
   */
  leftIcon?: React.ReactNode;
  /**
   * Ícone ou elemento à direita
   */
  rightIcon?: React.ReactNode;
  /**
   * Conteúdo do botão
   */
  children?: React.ReactNode;
  /**
   * Texto de carregamento
   */
  loadingText?: string;
  /**
   * Classes CSS adicionais
   */
  className?: string;
}

const variantStyles = {
  primary:
    'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 active:bg-blue-800',
  secondary:
    'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500 active:bg-gray-300',
  outline:
    'border-2 border-gray-300 text-gray-900 hover:border-gray-400 hover:bg-gray-50 focus:ring-gray-500 active:bg-gray-100',
  ghost:
    'text-gray-700 hover:bg-gray-100 focus:ring-gray-400 active:bg-gray-200',
  danger:
    'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 active:bg-red-800',
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm font-medium',
  md: 'px-4 py-2 text-base font-medium',
  lg: 'px-6 py-3 text-lg font-medium',
  full: 'w-full px-4 py-2.5 text-base font-medium',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      isDisabled = false,
      isIcon = false,
      leftIcon,
      rightIcon,
      children,
      loadingText = 'Carregando...',
      className = '',
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantClass = variantStyles[variant];
    const sizeClass = isIcon ? 'p-2' : sizeStyles[size];

    const isDisabledState = isDisabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabledState}
        className={`
          ${baseStyles}
          ${variantClass}
          ${sizeClass}
          ${className}
        `}
        {...props}
      >
        {isLoading && (
          <svg
            className="w-4 h-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && leftIcon && <span>{leftIcon}</span>}
        <span>{isLoading ? loadingText : children}</span>
        {!isLoading && rightIcon && <span>{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';