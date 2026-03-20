"use client";
import Image from 'next/image';
import { Montserrat } from 'next/font/google';
import { Input } from "@/Components/ui/input";
import "./globals.css";

export default function Home() {
  return (
    <main className="root">
      <section className="card">
        <Image width={312} height={80} className="card-logo" src="https://upload.wikimedia.org/wikipedia/commons/8/8c/SENAI_S%C3%A3o_Paulo_logo.png"alt="Senai"></Image>
        <h1 className={"card-title"}>Bem vindo de volta</h1>

        <form className="form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-field">
            <label className="emailLabel" htmlFor="email">Email</label>
            <Input id="email" type="email" placeholder="Digite seu email" />
          </div>

          <div className="form-field">
            <label className="passwordLabel" htmlFor="password">Senha</label>
            <Input id="password" type="password" placeholder="Digite sua senha" />
          </div>

          <div className="form-options">
            <label className="checkbox-wrap">
              <input type="checkbox" />
              <span>Lembrar de mim por 30 dias</span>
            </label>
            <a href="#" className="link-muted">Esqueceu sua <span className="link-accent">senha?</span></a>
          </div>

          <button className="btn-primary" type="submit">LOGIN</button>

          <p className="card-footer">
            Não tem uma conta? <a href="#" className="link-accent">Cadastre-se</a>
          </p>
        </form>
      </section>
    </main>
  );
}
