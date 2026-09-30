import { notFound } from "next/navigation";
import { IAluno, IAlunoPatch, IAlunoPost } from "../types/aluno";

const urlBase = "https://apifaltas.runasp.net/api/aluno/";
const token = ""

export async function ListarAlunos(): Promise<IAluno[]> {
    try {
        const response = await fetch(`${urlBase}ListarAlunos`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }

        const data: IAluno[] = await response.json();
        console.log(data)
        return data;

    } catch (error) {
        console.error("Falha ao buscar alunos:", error);
        return [];
    }
}

export async function ListarAlunosComFaltas(): Promise<IAluno[]> {
    try {
        const response = await fetch(`${urlBase}ListarAlunosComFaltas`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

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
        const response = await fetch(`${urlBase}ListarAlunosComFaltasExcessivas`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

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
        const response = await fetch(`${urlBase}ListarAlunosPorNome/${nome}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

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
        const response = await fetch(`${urlBase}ListarAlunoPorId/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

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
                'Authorization': `Bearer ${token}`
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
                'Authorization': `Bearer ${token}`
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
                'Authorization': `Bearer ${token}`
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