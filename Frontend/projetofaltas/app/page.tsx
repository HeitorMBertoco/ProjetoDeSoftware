"use client";
import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Input } from '@/Components/ui/Input';
import "./globals.css";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErro('');

    try {
      const res = await fetch('https://apifaltas.runasp.net/api/Auth/Login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login: email, senha: password }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        setErro(errorData.mensagem || 'Credenciais inválidas.');
        setLoading(false);
        return;
      }

      const data = await res.json();
      const token = data.token;

      if (!token) {
        setErro('Token não retornado pelo servidor.');
        setLoading(false);
        return;
      }

      localStorage.setItem(
        'usuario_logado',
        JSON.stringify({
          id: 1,
          nome: email.split('@')[0] || 'Usuário',
          email: email,
          token: token,
        })
      );
      localStorage.setItem('token', token);
      router.push('/pages/dashboard/');
    } catch (err) {
      console.error('Erro ao conectar ao servidor:', err);
      setErro('Falha na comunicação com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="root">
      <section className="card">
        <Image width={156} height={40} className="card-logo" src="https://upload.wikimedia.org/wikipedia/commons/8/8c/SENAI_S%C3%A3o_Paulo_logo.png" alt="Senai" />
        <h1 className="card-title">Bem vindo de volta!</h1>

        <form className="form" onSubmit={handleLogin}>
          {erro && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-lg p-2.5 mb-2 text-center font-medium">
              {erro}
            </div>
          )}

          <div className="form-field">
            <label className="emailLabel" htmlFor="email">Email / Login</label>
            <Input
              id="email"
              type="text"
              placeholder="Digite seu email ou login"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label className="passwordLabel" htmlFor="password">Senha</label>
            <Input
              id="password"
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-options">
            <label className="checkbox-wrap">
              <input className='checkbox' type="checkbox" />
              <span>Lembrar de mim por 30 dias</span>
            </label>
            <a href="#" onClick={() => {router.push("./pages/recovery/")}} className="link-muted">Esqueceu sua <span className="link-accent">senha?</span></a>
          </div>

          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? 'ENTRANDO...' : 'LOGIN'}
          </button>

          <p className="card-footer">
            Não tem uma conta? <a href="#" onClick={() => router.push("/pages/signup/")} className="link-accent">Cadastre-se</a>
          </p>
        </form>
      </section>
    </main>
  );
}
