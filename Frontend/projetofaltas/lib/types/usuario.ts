export interface IUsuario {
    id: string,
    nome: string,
    sobrenome: string,
    login: string,
    senhaHash: string,
    senhaSalt: string,
    tokenRecuperacao: string | null,
    tokenValidade: string | null,
    lembrarDeMim: boolean,
    nomeArquivoFoto: string | null,
    ativo: boolean
}

export interface IUsuarioPost {
  nome: string,
  sobrenome: string | null,
  login: string,
  senha: string
}

export interface IUsuarioPatch {
  nome: string | null,
  sobrenome: string | null,
  login: string | null,
  senha: string | null,
  lembrarDeMim: boolean | null,
  ativo: boolean | null
}