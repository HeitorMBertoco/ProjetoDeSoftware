import { notFound } from "next/navigation";
import { IAluno, IAlunoPatch, IAlunoPost } from "../types/aluno";

const urlBase = "https://apifaltas.runasp.net/api/aluno/";

export async function ListarAlunos(): Promise<IAluno[]> {
    try {
        const response = await fetch(`${urlBase}ListarAlunos`);

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }

        const data: IAluno[] = await response.json();
        return data;

    } catch (error) {
        console.error("Falha ao buscar alunos:", error);
        return [];
    }
}

export async function ListarAlunosComFaltas(): Promise<IAluno[]> {
    try {
        const response = await fetch(`${urlBase}ListarAlunosComFaltas`);

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }

        const data: IAluno[] = await response.json();
        return data;

    } catch (error) {
        console.error("Falha ao buscar alunos com faltas:", error);
        return [];
    }
}

export async function ListarAlunosComFaltasExcessivas(): Promise<IAluno[]> {
    try {
        const response = await fetch(`${urlBase}ListarAlunosComFaltasExcessivas`);

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }

        const data: IAluno[] = await response.json();
        return data;

    } catch (error) {
        console.error("Falha ao buscar alunos com faltas excessivas:", error);
        return [];
    }
}

export async function ListarAlunosPorNome(nome: string): Promise<IAluno[]> {
    try {
        const response = await fetch(`${urlBase}ListarAlunosPorNome/${nome}`);

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }

        const data: IAluno[] = await response.json();
        return data;

    } catch (error) {
        console.error("Falha ao buscar alunos por nome:", error);
        return [];
    }
}

export async function ListarAlunoPorId(id: string): Promise<IAluno> {
    try {
        const response = await fetch(`${urlBase}ListarAlunoPorId/${id}`);

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }

        const data: IAluno = await response.json();
        return data;

    } catch (error) {
        console.error("Falha ao buscar aluno:", error);
        return notFound();
    }
}

export async function DeletarAluno(id: string): Promise<void> {
    try {
        const response = await fetch(`${urlBase}DeletarAluno/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }
    

    } catch (error) {
        console.error('Falha ao excluir aluno:', error);
    }
}

export async function InserirAluno(aluno: IAlunoPost): Promise<void> {
    try {
        const response = await fetch(`${urlBase}InserirAluno`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(aluno)
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }

    } catch (error) {
        console.error('Falha ao inserir aluno:', error);
    }
}

export async function AtualizarAluno(aluno: IAlunoPatch, id: string): Promise<void> {
    try {
        const response = await fetch(`${urlBase}AtualizarAluno/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(aluno)
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }

    } catch (error) {
        console.error('Falha ao atualizar aluno:', error);
    }
}