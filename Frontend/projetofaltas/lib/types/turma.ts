import { IAluno } from './aluno';

export interface ITurma {
    id: string,
    nome: string,
    quantidadeMaximaAlunos: number,
    curso: string,
    listaAlunos: IAluno[]
}

export interface ITurmaPost {
    nome: string,
    quantidadeMaximaAlunos: number,
    curso: string
}

export interface ITurmaPatch {
    nome: string | null,
    quantidadeMaximaAlunos: number | null,
    curso: string | null
}

export interface IInserirAlunos {
    turmaId: string,
    alunoIds: string[]
}