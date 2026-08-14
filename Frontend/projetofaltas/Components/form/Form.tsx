import React, { FormHTMLAttributes } from 'react';

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  /**
   * Conteúdo do formulário
   */
  children?: React.ReactNode;
  /**
   * Espaçamento entre campos
   * @default 'md'
   */
  spacing?: 'sm' | 'md' | 'lg';
  /**
   * Classes CSS adicionais
   */
  className?: string;
}

const spacingStyles = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
};

export const Form: React.FC<FormProps> = ({
  children,
  spacing = 'md',
  className = '',
  ...props
}) => {
  return (
    <form
      className={`
        flex flex-col
        ${spacingStyles[spacing]}
        w-full
        ${className}
      `}
      {...props}
    >
      {children}
    </form>
  );
};

Form.displayName = 'Form';

/**
 * Componente FormSection - agrupa campos relacionados
 */
export interface FormSectionProps {
  /**
   * Título da seção
   */
  title?: string;
  /**
   * Descrição da seção
   */
  description?: string;
  /**
   * Conteúdo da seção
   */
  children?: React.ReactNode;
  /**
   * Espaçamento entre campos
   * @default 'md'
   */
  spacing?: 'sm' | 'md' | 'lg';
  /**
   * Classes CSS adicionais
   */
  className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
  spacing = 'md',
  className = '',
}) => {
  return (
    <div className={`flex flex-col ${spacingStyles[spacing]} ${className}`}>
      {(title || description) && (
        <div className="flex flex-col gap-1">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          )}
          {description && (
            <p className="text-sm text-gray-600">{description}</p>
          )}
        </div>
      )}
      <div className={`flex flex-col ${spacingStyles[spacing]}`}>
        {children}
      </div>
    </div>
  );
};

FormSection.displayName = 'FormSection';

/**
 * Componente FormGroup - agrupa múltiplos campos em uma linha
 */
export interface FormGroupProps {
  /**
   * Conteúdo do grupo
   */
  children?: React.ReactNode;
  /**
   * Número de colunas
   * @default 1
   */
  columns?: 1 | 2 | 3;
  /**
   * Espaçamento entre campos
   * @default 'md'
   */
  spacing?: 'sm' | 'md' | 'lg';
  /**
   * Classes CSS adicionais
   */
  className?: string;
}

const columnStyles = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-3',
};

export const FormGroup: React.FC<FormGroupProps> = ({
  children,
  columns = 1,
  spacing = 'md',
  className = '',
}) => {
  const gapClass = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
  }[spacing];

  return (
    <div
      className={`
        grid
        ${columnStyles[columns]}
        ${gapClass}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

FormGroup.displayName = 'FormGroup';
