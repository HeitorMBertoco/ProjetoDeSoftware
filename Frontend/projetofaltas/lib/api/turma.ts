import { notFound } from "next/navigation";
import { IInserirAlunos, ITurma, ITurmaPatch, ITurmaPost } from "../types/turma";

const urlBase = "https://apifaltas.runasp.net/api/turma/";

export async function ListarTurmas(): Promise<ITurma[]> {
    try {
        const response = await fetch(`${urlBase}ListarTurmas`);

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }

        const data: ITurma[] = await response.json();
        return data;

    } catch (error) {
        console.error("Falha ao buscar turmas:", error);
        return [];
    }
}

export async function ListarTurmaPorId(id: string): Promise<ITurma> {
    try {
        const response = await fetch(`${urlBase}ListarTurmaPorId/${id}`);

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }

        const data: ITurma = await response.json();
        return data;

    } catch (error) {
        console.error("Falha ao buscar turma:", error);
        return notFound();
    }
}

export async function DeletarTurma(id: string): Promise<void> {
    try {
        const response = await fetch(`${urlBase}DeletarTurma/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }
    

    } catch (error) {
        console.error('Falha ao excluir turma:', error);
    }
}

export async function InserirTurma(turma: ITurmaPost): Promise<void> {
    try {
        const response = await fetch(`${urlBase}InserirTurma`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(turma)
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }

    } catch (error) {
        console.error('Falha ao inserir turma:', error);
    }
}

export async function AtualizarTurma(turma: ITurmaPatch, id: string): Promise<void> {
    try {
        const response = await fetch(`${urlBase}AtualizarTurma/${id}`, {
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

export async function InserirAlunos(alunos: IInserirAlunos, id: string): Promise<void> {
    try {
        const response = await fetch(`${urlBase}InserirAlunos/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(alunos)
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }

    } catch (error) {
        console.error('Falha ao inserir alunos na turma:', error);
    }
}