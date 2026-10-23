import { notFound } from "next/navigation";
import { IRegistro, IRegistroPatch, IRegistroPost } from "../types/registro";
import { getAuthHeaders } from "./client";

const urlBase = "https://apifaltas.runasp.net/api/registro/";

export async function ListarRegistros(): Promise<IRegistro[]> {
    try {
        const response = await fetch(`${urlBase}ListarRegistros`, {
            method: 'GET',
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }

        const data: IRegistro[] = await response.json();
        return data;

    } catch (error) {
        console.error("Falha ao buscar registros:", error);
        return [];
    }
}

export async function ListarRegistrosPorPagina(pagina: number = 1): Promise<IRegistro[]> {
    try {
        const response = await fetch(`${urlBase}ListarRegistrosPorPagina?pagina=${pagina}`, {
            method: 'GET',
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }

        const data: IRegistro[] = await response.json();
        return data;

    } catch (error) {
        console.error("Falha ao buscar registros por página:", error);
        return [];
    }
}

export async function ListarRegistrosAtivos(): Promise<IRegistro[]> {
    try {
        const response = await fetch(`${urlBase}ListarRegistrosAtivos`, {
            method: 'GET',
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }

        const data: IRegistro[] = await response.json();
        return data;

    } catch (error) {
        console.error("Falha ao buscar registros ativos:", error);
        return [];
    }
}

export async function ListarRegistrosAtivosPorPagina(pagina: number = 1): Promise<IRegistro[]> {
    try {
        const response = await fetch(`${urlBase}ListarRegistrosAtivosPorPagina?pagina=${pagina}`, {
            method: 'GET',
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }

        const data: IRegistro[] = await response.json();
        return data;

    } catch (error) {
        console.error("Falha ao buscar registros ativos por página:", error);
        return [];
    }
}

export async function ListarRegistroPorId(id: string): Promise<IRegistro> {
    try {
        const response = await fetch(`${urlBase}ListarRegistroPorId/${id}`, {
            method: 'GET',
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }

        const data: IRegistro = await response.json();
        return data;

    } catch (error) {
        console.error("Falha ao buscar registro:", error);
        return notFound();
    }
}

export async function AlternarEstadoRegistro(id: string): Promise<void> {
    try {
        const response = await fetch(`${urlBase}AlternarEstadoRegistro/${id}`, {
            method: 'DELETE',
            headers: getAuthHeaders()
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }

    } catch (error) {
        console.error('Falha ao alternar estado de registro:', error);
        throw error;
    }
}

export async function InserirRegistro(registro: IRegistroPost): Promise<IRegistro | null> {
    try {
        const response = await fetch(`${urlBase}InserirRegistro`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify(registro)
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }

        const data = await response.json().catch(() => null);
        return data;

    } catch (error) {
        console.error('Falha ao inserir registro:', error);
        throw error;
    }
}

export async function AtualizarRegistro(turma: IRegistroPatch, id: string): Promise<void> {
    try {
        const response = await fetch(`${urlBase}AtualizarRegistro/${id}`, {
            method: 'PATCH',
            headers: getAuthHeaders(),
            body: JSON.stringify(turma)
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }

    } catch (error) {
        console.error('Falha ao atualizar registro:', error);
        throw error;
    }
}
