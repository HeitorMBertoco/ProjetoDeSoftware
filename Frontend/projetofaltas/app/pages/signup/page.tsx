"use client";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import CadastroImage from "@/assets/CFP 662 2.jpg";
import SenaiImage from "@/assets/SENAI-SP.jpg";
import { useRouter } from "next/navigation";
import "@/app/globals.css";

import { useForm } from "@/hook/Useform";

import { Form, FormGroup } from "@/Components/form/Form";
import { FormField } from "@/Components/form/FormField";
import { Button } from "@/Components/ui/Button";
import { Text } from "@/Components/ui/Text";

export default function MyForm() {
  const router = useRouter();
  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: { email: "" },
    validate: (v) => ({ email: !v.email ? "Obrigatório" : "" }),
    onSubmit: async (data) => {},
  });

  {
    return (
      <div className="rootSignup">
        <div className="containercadastro">
          <div className="imagemcadastro">
            <Image
              className="ImagemCadastro"
              src={CadastroImage}
              alt="Cadastro"
              width={570}
              height={0}
            />
          </div>

          <Form spacing="md" onSubmit={handleSubmit} className="formcadastro">
            <Text variant="h1">
              Crie sua <span className="text-red-600">Conta</span>
            </Text>

            <Text color="muted">
              Já tem uma conta? faça&nbsp;
              <span
                onClick={() => router.push("/")}
                className="text-red-600 underline cursor-pointer"
              >
                Log-in
              </span>
            </Text>

            <FormGroup spacing="sm" columns={2}>
              <FormField id="nome" label="Nome" required />
              <FormField id="sobrenome" label="Sobrenome" required />
            </FormGroup>

            <FormField id="email" label="Email" type="email" required />

            <FormField id="password" label="Senha" type="password" required />

            <Button type="submit" variant="danger" size="full">
              COMPLETAR CADASTRO
            </Button>

            <Image
              className="LogoSenai"
              src={SenaiImage}
              alt="Senai"
              width={150}
              height={50}
            />
          </Form>
        </div>
      </div>
    );
  }
}
