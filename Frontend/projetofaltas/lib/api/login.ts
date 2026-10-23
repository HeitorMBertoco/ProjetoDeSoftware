import { ILogin, IRecuperarSenha, IValidarRecuperacaoSenha } from ".././types/auth";

const urlBase = "https://apifaltas.runasp.net/api/auth/";
const token = ""

export async function RealizarLogin(login: ILogin): Promise<void> {
    try {
        const response = await fetch(`${urlBase}Login`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login)
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }

    } catch (error) {
        console.error('Falha ao realizar login:', error);
    }
}

export async function ReuperarSenha(recuperarSenha: IRecuperarSenha): Promise<void> {
    try {
        const response = await fetch(`${urlBase}RecuperarSenha`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recuperarSenha)
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }

    } catch (error) {
        console.error('Falha ao recuperar senha:', error);
    }
}

export async function ValidarTokenRecuperacao(recuperarSenha: IValidarRecuperacaoSenha): Promise<void> {
    try {
        const response = await fetch(`${urlBase}RecuperarSenha`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recuperarSenha)
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} ${response.statusText}`);
        }

    } catch (error) {
        console.error('Falha ao validar token de alteraçao de senha:', error);
    }
}