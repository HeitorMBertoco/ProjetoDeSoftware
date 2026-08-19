import React, { HTMLAttributes } from 'react';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  /**
   * Conteúdo do texto
   */
  children?: React.ReactNode;
  /**
   * Tipo/variante do texto
   * @default 'body'
   */
  variant?: 'h1' | 'h2' | 'h3' | 'subtitle' | 'body' | 'caption' | 'small';
  /**
   * Cor do texto
   * @default 'default'
   */
  color?: 'default' | 'muted' | 'primary' | 'error' | 'success';
  /**
   * Peso da fonte
   */
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  /**
   * Alinhamento do texto
   */
  align?: 'left' | 'center' | 'right';
  /**
   * Elemento HTML para renderizar
   */
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3';
  /**
   * Classes CSS adicionais
   */
  className?: string;
}

const variantStyles = {
  h1: 'text-4xl font-bold ',
  h2: 'text-3xl font-bold ',
  h3: 'text-2xl font-semibold leading-snug',
  subtitle: 'text-lg font-semibold leading-normal',
  body: 'text-base leading-normal',
  caption: 'text-sm leading-relaxed',
  small: 'text-xs leading-normal',
};

const colorStyles = {
  default: 'text-gray-900',
  muted: 'text-gray-600',
  primary: 'text-blue-600',
  error: 'text-red-600',
  success: 'text-green-600',
};

const weightStyles = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const alignStyles = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  color = 'default',
  weight,
  align = 'left',
  as = 'p',
  className = '',
  ...props
}) => {
  const variantClass = variantStyles[variant];
  const colorClass = colorStyles[color];
  const weightClass = weight ? weightStyles[weight] : '';
  const alignClass = alignStyles[align];

  const Element = as;

  return (
    <Element
      className={`
        ${variantClass}
        ${colorClass}
        ${weightClass}
        ${alignClass}
        ${className}
      `}
      {...props}
    >
      {children}
    </Element>
  );
};

Text.displayName = 'Text';
