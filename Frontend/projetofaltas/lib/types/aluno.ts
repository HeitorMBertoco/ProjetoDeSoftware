export interface IAluno {
    id: string,
    nome: string,
    idade: number,
    cpf: string,
    rm: string,
    quantidadeFaltas: number
};

export interface IAlunoPost {
    nome: string,
    idade: number,
    cpf: string,
    rm: string
}

export interface IAlunoPatch {
    nome: string | null,
    idade: number | null,
    cpf: string | null,
    rm: string | null,
    quantidadeFaltas: number | null
}