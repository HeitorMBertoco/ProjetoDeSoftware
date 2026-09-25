export interface Entrada {
  id: string;
  nome: string;
  dataHora: string;
  entradaSaida: 'Entrada' | 'Saída';
  motivos: string;
  turma: string;
  quemEmitiu: string;
  quemPermitiu: string;
  quemBuscou?: string;
  telefone?: string;
}

export interface CriarEntradaPayload {
  nome: string;
  dataHora: string;
  entradaSaida: 'Entrada' | 'Saída';
  motivos: string;
  turma: string;
  quemEmitiu: string;
  quemPermitiu: string;
  quemBuscou?: string;
  telefone?: string;
}

export interface FiltroEntradasParams {
  nome?: string;
  turma?: string;
  page?: number;
  limit?: number;
}

export interface RespostaPaginada<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}
