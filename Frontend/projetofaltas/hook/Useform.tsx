import { useState, useCallback } from 'react';

export interface UseFormOptions<T> {
  /**
   * Valores iniciais do formulário
   */
  initialValues: T;
  /**
   * Função de validação customizada
   */
  validate?: (values: T) => Record<string, string>;
  /**
   * Callback chamado ao submeter o formulário
   */
  onSubmit?: (values: T) => void | Promise<void>;
}

export interface UseFormReturn<T> {
  /**
   * Valores atuais do formulário
   */
  values: T;
  /**
   * Erros de validação
   */
  errors: Record<string, string | undefined>;
  /**
   * Campos tocados pelo usuário
   */
  touched: Record<string, boolean>;
  /**
   * Se o formulário está em processo de submissão
   */
  isSubmitting: boolean;
  /**
   * Se houve erro na submissão
   */
  submitError?: string;
  /**
   * Mudança de valor em um campo
   */
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  /**
   * Blur em um campo (marca como tocado)
   */
  handleBlur: (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  /**
   * Submissão do formulário
   */
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  /**
   * Definir valor de um campo
   */
  setFieldValue: <K extends keyof T>(field: K, value: T[K]) => void;
  /**
   * Definir erro de um campo
   */
  setFieldError: (field: string, error: string) => void;
  /**
   * Resetar formulário para valores iniciais
   */
  reset: () => void;
  /**
   * Validar um campo específico
   */
  validateField: (field: string) => string | undefined;
}

/**
 * Hook para gerenciar estado, validação e submissão de formulários
 * Oferece uma API similar ao Formik, mas mais leve
 *
 * @example
 * const { values, errors, handleChange, handleSubmit } = useForm({
 *   initialValues: { name: '', email: '' },
 *   validate: (values) => ({
 *     name: !values.name ? 'Nome é obrigatório' : '',
 *   }),
 *   onSubmit: async (values) => {
 *     await api.post('/signup', values);
 *   },
 * });
 */
export function useForm<T extends Record<string, unknown>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormOptions<T>): UseFormReturn<T> {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>();

  /**
   * Validar todo o formulário
   */
  const validateForm = useCallback((): Record<string, string | undefined> => {
    if (!validate) return {};
    return validate(values);
  }, [values, validate]);

  /**
   * Validar um campo específico
   */
  const validateField = useCallback(
    (field: string): string | undefined => {
      if (!validate) return undefined;
      const newErrors = validate(values);
      return newErrors[field];
    },
    [values, validate]
  );

  /**
   * Gerenciar mudança de valor
   */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target as HTMLInputElement;

      const fieldValue =
        type === 'checkbox'
          ? (e.target as HTMLInputElement).checked
          : value;

      setValues((prev) => ({
        ...prev,
        [name]: fieldValue,
      }));

      // Limpar erro ao mudar
      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: undefined,
        }));
      }
    },
    [errors]
  );

  /**
   * Gerenciar blur (marcar como tocado)
   */
  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name } = e.target;

      setTouched((prev) => ({
        ...prev,
        [name]: true,
      }));

      // Validar campo ao sair dele
      const error = validateField(name);

      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    },
    [validateField]
  );

  /**
   * Gerenciar submissão
   */
  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setSubmitError(undefined);

      // Validar todos os campos
      const newErrors = validateForm();
      const hasErrors = Object.values(newErrors).some((error) => error);

      if (hasErrors) {
        setErrors(newErrors);
        return;
      }

      try {
        setIsSubmitting(true);
        await onSubmit?.(values);
      } catch (error) {
        setSubmitError(
          error instanceof Error
            ? error.message
            : 'Erro ao submeter formulário'
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [validateForm, onSubmit, values]
  );

  /**
   * Definir valor de um campo
   */
  const setFieldValue = useCallback(
    <K extends keyof T>(field: K, value: T[K]) => {
      setValues((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  /**
   * Definir erro de um campo
   */
  const setFieldError = useCallback((field: string, error: string) => {
    setErrors((prev) => ({
      ...prev,
      [field]: error,
    }));
  }, []);

  /**
   * Resetar para valores iniciais
   */
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setSubmitError(undefined);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    submitError,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldError,
    reset,
    validateField,
  };
}