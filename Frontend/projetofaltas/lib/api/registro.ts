import { notFound } from "next/navigation";
import { IRegistro, IRegistroPatch, IRegistroPost } from "../types/registro";

const urlBase = "https://apifaltas.runasp.net/api/registro/";

export async function ListarRegistros(): Promise<IRegistro[]> {
    try {
        const response = await fetch(`${urlBase}ListarRegistros`);

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

export async function ListarRegistrosPorPagina(): Promise<IRegistro[]> {
    try {
        const response = await fetch(`${urlBase}ListarRegistrosPorPagina`);

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
        const response = await fetch(`${urlBase}ListarRegistrosAtivos`);

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

export async function ListarRegistrosAtivosPorPagina(): Promise<IRegistro[]> {
    try {
        const response = await fetch(`${urlBase}ListarRegistrosAtivosPorPagina`);

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
        const response = await fetch(`${urlBase}ListarRegistroPorId/${id}`);

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
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }


    } catch (error) {
        console.error('Falha ao alternar estado de registro:', error);
    }
}

export async function InserirRegistro(registro: IRegistroPost): Promise<void> {
    try {
        const response = await fetch(`${urlBase}InserirRegistro`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(registro)
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }

    } catch (error) {
        console.error('Falha ao inserir registro:', error);
    }
}

export async function AtualizarRegistro(turma: IRegistroPatch, id: string): Promise<void> {
    try {
        const response = await fetch(`${urlBase}AtualizarRegistro/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(turma)
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }

    } catch (error) {
        console.error('Falha ao atualizar turma:', error);
    }
}