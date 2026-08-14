"use client";
import Image from 'next/image';
import { Montserrat } from 'next/font/google';

import useRouter from 'next/navigation';
import "@/app/globals.css";

import { useForm } from '@/hook/Useform';
import { Form, FormGroup } from '@/Components/form/Form';
import { FormField } from '@/Components/form/FormField';
import { Button } from '@/Components/ui/Button';

export default function MyForm() {
  const { values, errors, handleChange, handleSubmit } = useForm({
    initialValues: { email: '' },
    validate: (v) => ({ email: !v.email ? 'Obrigatório' : '' }),
    onSubmit: async (data) => {  }
  });

{
    return(
    <div className='rootSignup'>

        <div className="containercadastro">
            <div className='imagemcadastro'>

            </div>

            <Form spacing='md' onSubmit={handleSubmit} className="formcadastro">
                <FormGroup spacing='md' columns={2}>
                    <FormField id='nome' label='Nome' required/>
                    
                    <FormField id='sobrenome' label='Sobrenome' required/>
                </FormGroup>
                <FormGroup spacing='md' columns={1}>
                    <FormField id='email' label='Email' type='email' required/>
                    
                </FormGroup>
                <FormGroup spacing='md' columns={1}>
                <FormField id='password' label='Senha' type='password' required/>
                </FormGroup>
                <Button type='submit' variant='danger' size='lg'>Cadastrar</Button>
            </Form>
        </div>
    </div>
    )

}}
