export interface IRegistro {
    id: string,
    alunoId: string,
    aluno: {
        id: string,
        nome: string,
        idade: number,
        cpf: string,
        rm: string,
        quantidadeFaltas: number
    },
    data: Date,
    entradaSaida: string,
    motivo: string | null,
    quemEmitiu: string,
    quemPermitiu: string,
    quemBuscou: string,
    telefone: string | null,
    ativo: boolean
}

export interface IRegistroPost {
    alunoId: string,
    data: Date,
    motivo: string | null,
    entradaSaida: string,
    quemEmitiu: string,
    quemPermitiu: string,
    quemBuscou: string,
    telefone: string | null,
    ativo: boolean
}

export interface IRegistroPatch {
    alunoId: string | null,
    data: Date | null,
    motivo: string | null,
    entradaSaida: string | null,
    quemEmitiu: string | null,
    quemPermitiu: string | null,
    quemBuscou: string | null,
    telefone: string | null,
    ativo: boolean | null
}