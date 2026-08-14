import React, { forwardRef, InputHTMLAttributes } from 'react';
import { Input, InputProps } from '../ui/Input';
import { Label } from '../ui/Label';

export interface FormFieldProps extends Omit<InputProps, 'variant' | 'size'> {
  /**
   * Rótulo do campo
   */
  label?: string;
  /**
   * ID do input (usar para conectar label ao input)
   */
  id: string;
  /**
   * Campo obrigatório
   * @default false
   */
  required?: boolean;
  /**
   * Mensagem de erro
   */
  error?: string;
  /**
   * Mensagem de sucesso
   */
  success?: string;
  /**
   * Mensagem de dica/ajuda
   */
  hint?: string;
  /**
   * Mostrar contador de caracteres
   * @default false
   */
  showCharCount?: boolean;
  /**
   * Comprimento máximo para o contador
   */
  maxLength?: number;
  /**
   * Classes CSS adicionais para o container
   */
  containerClassName?: string;
  /**
   * Callback quando o valor muda (útil para validação em tempo real)
   */
  onValueChange?: (value: string) => void;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      label,
      id,
      required = false,
      error,
      success,
      hint,
      showCharCount = false,
      maxLength,
      containerClassName = '',
      onValueChange,
      onChange,
      ...props
    },
    ref
  ) => {
    const [charCount, setCharCount] = React.useState(0);

    const determineVariant = (): 'default' | 'error' | 'success' => {
      if (error) return 'error';
      if (success) return 'success';
      return 'default';
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setCharCount(value.length);
      onValueChange?.(value);
      onChange?.(e);
    };

    return (
      <div className={`flex flex-col gap-2 ${containerClassName}`}>
        {label && (
          <Label htmlFor={id} required={required} hint={hint}>
            {label}
          </Label>
        )}

        <Input
          ref={ref}
          id={id}
          variant={determineVariant()}
          maxLength={maxLength}
          onChange={handleChange}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          {...props}
        />

        {/* Exibir contador de caracteres */}
        {showCharCount && maxLength && (
          <div className="flex justify-end">
            <span className="text-xs text-gray-500">
              {charCount} / {maxLength}
            </span>
          </div>
        )}

        {/* Exibir mensagem de erro */}
        {error && (
          <div
            id={`${id}-error`}
            className="text-sm text-red-600 font-medium flex items-center gap-1"
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18.101 12.93c1.649-1.243 2.505-3.012 2.505-4.856 0-3.963-3.026-7.1-6.556-7.1-3.529 0-6.556 3.137-6.556 7.1 0 1.844.856 3.613 2.505 4.856L5.477 20h12.046l-1.422-7.07zM9.5 13a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm5 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </div>
        )}

        {/* Exibir mensagem de sucesso */}
        {success && !error && (
          <div className="text-sm text-green-600 font-medium flex items-center gap-1">
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            {success}
          </div>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';