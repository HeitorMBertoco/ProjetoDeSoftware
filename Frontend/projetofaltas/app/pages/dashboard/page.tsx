"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/Components/ui/Button";
import ImagemSenai from "@/assets/SENAI-SP.jpg";
import Image from "next/image";
import { SearchIcon } from "lucide-react";
import { Text } from "@/Components/ui/Text";

interface Usuario {
  nome: string;
  email: string;
}

export default function HomeDashboard() {
  const router = useRouter();

  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const [botao, setbotao] = useState<"red" | "disable">("disable");
  const [botao1, setbotao1] = useState<"red" | "disable">("disable");

  const btStyles = {
    red: "danger",
    disable: "ghost",
  } as const;

  const textStyles = {
    red: "success",
    disable: "muted",
  } as const;

  useEffect(() => {
    const dadosGravados = localStorage.getItem("usuario_logado");

    if (!dadosGravados) {
      router.push("/");
      return;
    }

    setUsuario(JSON.parse(dadosGravados));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("usuario_logado");
    router.push("/");
  };

  if (!usuario) {
    return null;
  }

  return (
    <main className="root flex flex-row">
      <div className="bg-[#F1F1F1] rounded-2xl w-[90vw] h-[90vh] flex flex-row items-center pr-3">

        <section className="sidebar flex flex-col w-[15vw] rounded-2xl items-center bg-white shadow-black h-[90vh] p-7 z-1">

          <Image
            src={ImagemSenai}
            alt="Senai"
            width={100}
            height={37.5}
          />

          <Button
            variant={btStyles[botao]}
            className="mb-3 mt-3 text-center w-[11vw] h-[7vh]"
            onClick={() => {
              setbotao("red");
              setbotao1("disable");
            }}
          >
            <Text
              variant="subtitle"
              color={textStyles[botao]}
            >
              Reg. Entradas
            </Text>
          </Button>

          <Button
            variant={btStyles[botao1]}
            className="mb-3 text-center w-[11vw] h-[7vh]"
            onClick={() => {
              setbotao1("red");
              setbotao("disable");
            }}
          >
            <Text
              variant="subtitle"
              color={textStyles[botao1]}
            >
              Lista de Alunos
            </Text>
          </Button>

        </section>


        <section className="flex flex-col w-[75vw] h-[90vh] rounded-2xl gap-4">

          <div className="flex flex-row justify-center items-center h-[10vh]">


            <div className="search w-[40vw] bg-white shadow-black h-[7vh] mr-[3vw] items-center flex gap-1 rounded-4xl">

              <SearchIcon className="m-4 text-zinc-700" />

              <input
                className="placeholder-zinc-500 border-b-0 focus:border-0 hover:border-0 w-full outline-0 font-medium h-full"
                placeholder="Pesquisar.."
              />

            </div>

            <div className="inbox h-[7vmin] w-[10vw] rounded-4xl shadow-black bg-white mr-[3vw]" />

            <div className="profile flex flex-col flex-wrap justify-center gap-1.5 w-[10vw] h-[10vh]">

              <div className="avatar h-[7vmin] w-[7vmin] rounded-4xl shadow-black bg-white" />

              <span className="avatartext font-bold text-[1vw] mb-0.5">
                Jonas Luis Olivera
              </span>

              <span className="avatartext font-bold text-[0.8vw] mb-0.5 text-zinc-400">
                gmail.com@algo
              </span>

            </div>

          </div>

          <div className="flex flex-col h-[80vh] items-center">
            <div className="flex w-full ml-[5vw] items-center"> 
              <Text
                variant="h1"
                weight="bold"
                align="left"
                className="mb-2"
              >
                Entradas e Saidas
              </Text>
              <div className="mr-125">  </div><Button variant="danger"/>
              </div>
            
            <div className="w-[70vw] h-[70vh]">

              

              <table className="bg-white w-[70vw] h-[70vh] rounded-2xl table-fixed border-collapse overflow-hidden">


                <thead>
                  <tr className="border-b border-zinc-300">

                    <th className="w-[14.2857%] px-2 py-2 text-left">
                      <Text variant="body" color="muted">
                        Nome
                      </Text>
                    </th>

                    <th className="w-[14.2857%] px-2 py-2 text-left">
                      <Text variant="body" color="muted">
                        Data/Hora
                      </Text>
                    </th>

                    <th className="w-[14.2857%] px-2 py-2 text-left">
                      <Text variant="body" color="muted">
                        Entrada/Saida
                      </Text>
                    </th>

                    <th className="w-[14.2857%] px-2 py-2 text-left">
                      <Text variant="body" color="muted">
                        Motivos
                      </Text>
                    </th>

                    <th className="w-[14.2857%] px-2 py-2 text-left">
                      <Text variant="body" color="muted">
                        Turma
                      </Text>
                    </th>

                    <th className="w-[14.2857%] px-2 py-2 text-left">
                      <Text variant="body" color="muted">
                        Quem emitiu
                      </Text>
                    </th>

                    <th className="w-[14.2857%] px-2 py-2 text-left">
                      <Text variant="body" color="muted">
                        Quem permitiu
                      </Text>
                    </th>

                  </tr>
                </thead>

                <tbody>

                  <tr className="border-t border-zinc-300">

                    <td className="w-[14.2857%] px-2 py-3">
                      <Text variant="subtitle">
                        abuh
                      </Text>
                    </td>

                    <td className="w-[14.2857%] px-2 py-3">
                      <Text variant="subtitle">
                        abuh
                      </Text>
                    </td>

                    <td className="w-[14.2857%] px-2 py-3">
                      <Text variant="subtitle">
                        abuh
                      </Text>
                    </td>

                    <td className="w-[14.2857%] px-2 py-3">
                      <Text variant="subtitle">
                        abuh
                      </Text>
                    </td>

                    <td className="w-[14.2857%] px-2 py-3">
                      <Text variant="subtitle">
                        abuh
                      </Text>
                    </td>

                    <td className="w-[14.2857%] px-2 py-3">
                      <Text variant="subtitle">
                        abuh
                      </Text>
                    </td>

                    <td className="w-[14.2857%] px-2 py-3">
                      <Text variant="subtitle">
                        abuh
                      </Text>
                    </td>

                  </tr>

                  <tr className="border-t border-zinc-300">

                    <td className="px-2 py-3">
                      <Text variant="subtitle">
                        abuh
                      </Text>
                    </td>

                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>

                  </tr>

                  <tr className="border-t border-zinc-300">

                    <td className="px-2 py-3">
                      <Text variant="subtitle">
                        abuh
                      </Text>
                    </td>

                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>

                  </tr>

                  <tr className="border-t border-zinc-300">

                    <td className="px-2 py-3">
                      <Text variant="subtitle">
                        abuh
                      </Text>
                    </td>

                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>

                  </tr>

                  <tr className="border-t border-zinc-300">

                    <td className="px-2 py-3">
                      <Text variant="subtitle">
                        abuh
                      </Text>
                    </td>

                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>

                  </tr>

                  <tr className="border-t border-zinc-300">

                    <td className="px-2 py-3">
                      <Text variant="subtitle">
                        abuh
                      </Text>
                    </td>

                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>

                  </tr>


                  <tr className="border-t border-zinc-300">

                    <td className="px-2 py-3">
                      <Text variant="subtitle">
                        abuh
                      </Text>
                    </td>

                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>

                  </tr>

                  <tr className="border-t border-zinc-300">

                    <td className="px-2 py-3">
                      <Text variant="subtitle">
                        abuh
                      </Text>
                    </td>

                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>

                  </tr>

                  <tr className="border-t border-zinc-300">

                    <td className="px-2 py-3">
                      <Text variant="subtitle">
                        abuh
                      </Text>
                    </td>

                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>

                  </tr>


                  <tr className="border-t border-zinc-300">

                    <td className="px-2 py-3">
                      <Text variant="subtitle">
                        abuh
                      </Text>
                    </td>

                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>
                    <td className="px-2 py-3"></td>

                  </tr>

                </tbody>

              </table>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}
