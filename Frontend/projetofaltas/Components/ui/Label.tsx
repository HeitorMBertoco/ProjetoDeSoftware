import React, { LabelHTMLAttributes } from 'react';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * Texto do rótulo
   */
  children?: React.ReactNode;
  /**
   * Mostrar como obrigatório
   * @default false
   */
  required?: boolean;
  /**
   * Tamanho do rótulo
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Classes CSS adicionais
   */
  className?: string;
  /**
   * Dica/informação adicional
   */
  hint?: string;
}

const sizeStyles = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export const Label: React.FC<LabelProps> = ({
  children,
  required = false,
  size = 'md',
  className = '',
  hint,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label
        className={`
          font-medium text-gray-700
          ${sizeStyles[size]}
          ${className}
        `}
        {...props}
      >
        {children}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {hint && <span className="text-xs text-gray-500">{hint}</span>}
    </div>
  );
};

Label.displayName = 'Label';