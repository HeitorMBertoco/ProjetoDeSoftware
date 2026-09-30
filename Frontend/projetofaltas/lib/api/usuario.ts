import { notFound } from "next/navigation";
import { IUsuario, IUsuarioPatch, IUsuarioPost } from "../types/usuario";

const urlBase = "https://apifaltas.runasp.net/api/usuario/";
const token = ""

export async function ListarUsuarios(): Promise<IUsuario[]> {
    try {
        const response = await fetch(`${urlBase}ListarUsuarios`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }

        const data: IUsuario[] = await response.json();
        return data;

    } catch (error) {
        console.error("Falha ao buscar usuarios:", error);
        return [];
    }
}

export async function ListarUsuarioPorId(id: string): Promise<IUsuario> {
    try {
        const response = await fetch(`${urlBase}ListarUsuarioPorId/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }

        const data: IUsuario = await response.json();
        return data;

    } catch (error) {
        console.error("Falha ao buscar usuario:", error);
        return notFound();
    }
}

export async function DeletarUsuario(id: string): Promise<void> {
    try {
        const response = await fetch(`${urlBase}DeletarUsuario/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }


    } catch (error) {
        console.error('Falha ao deletar usuario:', error);
    }
}

export async function InserirUsuario(usuario: IUsuarioPost): Promise<void> {
    try {
        const response = await fetch(`${urlBase}InserirUsuario`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }

    } catch (error) {
        console.error('Falha ao inserir usuario:', error);
    }
}

export async function AtualizarUsuario(usuario: IUsuarioPatch, id: string): Promise<void> {
    try {
        const response = await fetch(`${urlBase}AtualizarUsuario/${id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }

    } catch (error) {
        console.error('Falha ao atualizar usuario:', error);
    }
}

export async function AtualizarImagemUsuario(id: string, Imagem: File): Promise<void> {
    try {
        const imagem = new FormData();
        imagem.append("arquivo", Imagem);

        const response = await fetch(`${urlBase}AtualizarImagemUsuario/${id}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: imagem
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }

    } catch (error) {
        console.error('Falha ao atualizar a imagem do usuario:', error);
    }
}