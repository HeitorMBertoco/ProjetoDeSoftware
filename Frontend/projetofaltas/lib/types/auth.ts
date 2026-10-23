export interface ILogin {
    login: string,
    senha: string
};

export interface IRecuperarSenha {
    email: string,
};

export interface IValidarRecuperacaoSenha{
    novaSenha: string,
    token: string
};