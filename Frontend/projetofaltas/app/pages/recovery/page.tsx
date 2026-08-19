'use client'
import Image from "next/image"
import { Form, FormGroup } from "@/Components/form/Form"
import { FormField } from "@/Components/form/FormField"
import { useRouter } from "next/navigation"
import { Button } from "@/Components/ui/Button"
import { Text } from "@/Components/ui/Text"
import "@/app/globals.css"

export default function ForgotPassword() {
    const router = useRouter()
    return (
        <main className="root">
            <div className="card w-xl text-left">
                
                <Image width={156} height={40} className="text-left card-logo" src="https://upload.wikimedia.org/wikipedia/commons/8/8c/SENAI_S%C3%A3o_Paulo_logo.png" alt="Senai"></Image>
                <Text as="div" align="left" className="text-left mb-1 mt-8" variant="h1">Esqueceu sua senha? </Text>
                <Text as="div" className="mb-6 break-normal text-left"align="left" variant="caption" color="muted">Coloque seu Email na caixa abaixo e siga as instruções no documento</Text>
            
                <Form className="form mb-32">
                    <FormGroup columns={1}>
                        <FormField className="mb-1" id="2" label="Email" required ></FormField>
                        <Button type="submit" variant="danger">Enviar</Button>
                    </FormGroup>


                </Form>
                <Text variant="small" className="text-left" align="left" color="muted">Não esqueceu sua senha? Volte Para o <span onClick={() => {router.push("/")}} className="text-red-500 underline">Login</span> </Text>
                </div>

        </main>
    )
}