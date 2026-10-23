const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://apifaltas.runasp.net/api';

export function getAuthToken(): string {
  if (typeof window === 'undefined') return '';

  const directToken = localStorage.getItem('token');
  if (directToken) {
    return directToken;
  }

  const usuarioLogado = localStorage.getItem('usuario_logado');
  if (usuarioLogado) {
    try {
      const parsed = JSON.parse(usuarioLogado);
      if (parsed.token) {
        return parsed.token;
      }
    } catch {
      // Ignora erro de JSON parse
    }
  }

  return '';
}

export function getAuthHeaders(extraHeaders: HeadersInit = {}): HeadersInit {
  const token = getAuthToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(extraHeaders as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const config: RequestInit = {
    ...options,
    headers: getAuthHeaders(options.headers || {}),
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `Erro na requisição: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}
