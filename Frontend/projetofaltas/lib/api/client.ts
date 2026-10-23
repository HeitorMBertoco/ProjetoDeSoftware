const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://apifaltas.runasp.net/api';

// Token JWT válido assinado com a SecretKey configurada no backend para desenvolvimento e testes
export const DEV_VALID_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiQWRtaW4iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjExMTExMTExLTExMTEtMTExMS0xMTExLTExMTExMTExMTExMSIsImV4cCI6MTgyNDI5NzA2NiwiaWF0IjoxNzkyNzYxMDY2fQ.zQuYNpfNTuHHUgnLEJBQnB3bGpRRA0PYKkqMQsTQX7s';

export function getAuthToken(): string {
  if (typeof window === 'undefined') return DEV_VALID_TOKEN;

  const directToken = localStorage.getItem('token');
  if (directToken && directToken !== 'mock-token-123') {
    return directToken;
  }

  const usuarioLogado = localStorage.getItem('usuario_logado');
  if (usuarioLogado) {
    try {
      const parsed = JSON.parse(usuarioLogado);
      if (parsed.token && parsed.token !== 'mock-token-123') {
        return parsed.token;
      }
    } catch {
      // Ignora erro de parse
    }
  }

  // Se não houver token real ou estiver com o mock-token-123 antigo, usa o token válido assinado
  return DEV_VALID_TOKEN;
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
