"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/Components/ui/Button";
import ImagemSenai from "@/assets/SENAI-SP.jpg";
import Image from "next/image";
import { Funnel, SearchIcon, X } from "lucide-react";
import { Text } from "@/Components/ui/Text";

interface Entrada {
  id: string;
  nome: string;
  dataHora: string;
  entradaSaida: string;
  motivos: string;
  turma: string;
  quemEmitiu: string;
  quemPermitiu: string;
}

interface Usuario {
  nome: string;
  email: string;
}

const MOCK_DATA: Entrada[] = Array.from({ length: 50 }, (_, i) => ({
  id: String(i + 1),
  nome: [
    "Carlos Silva",
    "Ana Souza",
    "Pedro Lima",
    "Julia Mendes",
    "Lucas Rocha",
  ][i % 5],
  dataHora: `${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}/05/2025 ${String(8 + (i % 10)).padStart(2, "0")}:${String((i * 7) % 60).padStart(2, "0")}`,
  entradaSaida: i % 2 === 0 ? "Entrada" : "Saída",
  motivos: [
    "Consulta médica",
    "Visita familiar",
    "Atividade externa",
    "Outros",
  ][i % 4],
  turma: ["DS-1A", "DS-1B", "DS-2A", "DS-2B"][i % 4],
  quemEmitiu: ["Prof. João", "Prof. Maria", "Prof. Carlos"][i % 3],
  quemPermitiu: ["Dir. Amanda", "Coord. Roberto"][i % 2],
}));

const PAGE_SIZE = 8;

export default function HomeDashboard() {
  const router = useRouter();

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [botao, setBotao] = useState<"red" | "disable">("disable");
  const [botao1, setBotao1] = useState<"red" | "disable">("disable");
  const [entradas, setEntradas] = useState<Entrada[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroTurma, setFiltroTurma] = useState("");
  const [showFiltro, setShowFiltro] = useState(false);
  const [modalActive, setModalActive] = useState(false);

  const btStyles = { red: "danger", disable: "ghost" } as const;
  const textStyles = { red: "success", disable: "muted" } as const;

  useEffect(() => {
    const dadosGravados = localStorage.getItem("usuario_logado");

    if (!dadosGravados) {
      router.push("/");
      return;
    }

    setUsuario(JSON.parse(dadosGravados));
  }, [router]);

  useEffect(() => {
    fetchEntradas(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    fetchEntradas(1);
  }, [filtroNome, filtroTurma]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalActive(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const fetchEntradas = async (page: number) => {
    setLoading(true);

    try {
      await new Promise((r) => setTimeout(r, 200));

      const filtered = MOCK_DATA.filter((e) => {
        const matchNome = e.nome
          .toLowerCase()
          .includes(filtroNome.toLowerCase());

        const matchTurma = e.turma
          .toLowerCase()
          .includes(filtroTurma.toLowerCase());

        return matchNome && matchTurma;
      });

      const start = (page - 1) * PAGE_SIZE;

      setEntradas(filtered.slice(start, start + PAGE_SIZE));
      setTotalPages(Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)));
      setTotalRegistros(filtered.length);
    } catch (error) {
      console.error("Erro ao buscar entradas:", error);
    } finally {
      setLoading(false);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (currentPage > 3) pages.push("...");

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) pages.push("...");

    pages.push(totalPages);

    return pages;
  };

  if (!usuario) return null;

  return (
    <main className="root flex flex-row">
      <div className="bg-[#F1F1F1] rounded-2xl w-[90vw] h-[90vh] flex flex-row items-center pr-3">
        <section className="sidebar flex flex-col w-[15vw] rounded-2xl items-center bg-white shadow-black h-[90vh] p-7 z-1">
          <Image src={ImagemSenai} alt="Senai" width={100} height={37.5} />

          <Button
            variant={btStyles[botao]}
            className="mb-3 mt-3 text-center w-[11vw] h-[7vh]"
            onClick={() => {
              setBotao("red");
              setBotao1("disable");
            }}
          >
            <Text variant="subtitle" color={textStyles[botao]}>
              Reg. Entradas
            </Text>
          </Button>

          <Button
            variant={btStyles[botao1]}
            className="mb-3 text-center w-[11vw] h-[7vh]"
            onClick={() => {
              setBotao1("red");
              setBotao("disable");
            }}
          >
            <Text variant="subtitle" color={textStyles[botao1]}>
              Lista de Alunos
            </Text>
          </Button>
        </section>

        <section className="flex flex-col w-[75vw] h-[90vh] rounded-2xl gap-4">
          <div className="flex flex-row justify-between items-center h-[10vh] px-[2vw]">
            <div className="search w-[57vw] bg-white border border-zinc-100 h-[6vh] shadow-sm items-center flex gap-1 rounded-full">
              <SearchIcon className="ml-4 text-zinc-400" size={18} />

              <input
                className="placeholder-zinc-400 w-full outline-0 font-medium h-full text-sm bg-transparent"
                placeholder="Pesquisar.."
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="h-[6vh] w-[6vh] rounded-full border border-zinc-100 bg-white shrink-0 shadow-sm" />

                <div className="flex flex-col">
                  <span className="font-bold text-[0.95vw] leading-tight">
                    Jonas Luis Olivera
                  </span>

                  <span className="font-medium text-[0.75vw] text-zinc-400 leading-tight">
                    gmail.com@algo
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-1 items-center gap-6 pb-4">
            <div className="flex w-full px-[2vw] gap-5 items-center">
              <Text variant="h1" weight="bold" align="left">
                Entradas e Saidas
              </Text>

              <Button
                variant="danger"
                className="gap-1.5 px-4 flex-initial h-9 w-60 ml-[40vw] shadow-sm"
                onClick={() => setModalActive(true)}
              >
                <span className="text-sm mx-4 font-bold text-white leading-none">
                  Novo Registro
                </span>
              </Button>

              <div className="flex items-center gap-2 relative">
                <Button
                  variant="danger"
                  className="flex items-center justify-center w-9 h-9 p-0 shadow-sm"
                  onClick={() => setShowFiltro((v) => !v)}
                >
                  <Funnel size={16} />
                </Button>

                {showFiltro && (
                  <div className="absolute right-0 top-[110%] bg-white border border-zinc-200 rounded-xl shadow-lg p-4 flex flex-col gap-3 z-50 w-55">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-semibold text-zinc-500">
                        Nome
                      </span>

                      <input
                        value={filtroNome}
                        onChange={(e) => setFiltroNome(e.target.value)}
                        placeholder="Buscar por nome..."
                        className="border border-zinc-200 rounded-lg px-3 py-2 text-sm outline-0 focus:border-zinc-400"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-semibold text-zinc-500">
                        Turma
                      </span>

                      <input
                        value={filtroTurma}
                        onChange={(e) => setFiltroTurma(e.target.value)}
                        placeholder="Buscar por turma..."
                        className="border border-zinc-200 rounded-lg px-3 py-2 text-sm outline-0 focus:border-zinc-400"
                      />
                    </div>

                    <button
                      onClick={() => {
                        setFiltroNome("");
                        setFiltroTurma("");
                      }}
                      className="text-xs text-zinc-400 hover:text-zinc-600 text-left cursor-pointer"
                    >
                      Limpar filtros
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="w-[70vw] flex flex-col flex-1 overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="overflow-auto flex-1">
                <table className="w-full table-fixed border-collapse">
                  <thead className="sticky top-0 bg-white z-10">
                    <tr className="border-b border-zinc-300">
                      {[
                        "Nome",
                        "Data/Hora",
                        "Entrada/Saida",
                        "Motivos",
                        "Turma",
                        "Quem emitiu",
                        "Quem permitiu",
                      ].map((h) => (
                        <th
                          key={h}
                          className="w-[14.2857%] px-3 py-3 text-left"
                        >
                          <Text variant="body" color="muted">
                            {h}
                          </Text>
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={7} className="text-center py-8">
                          <Text variant="body" color="muted">
                            Carregando...
                          </Text>
                        </td>
                      </tr>
                    ) : entradas.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-8">
                          <Text variant="body" color="muted">
                            Nenhum resultado encontrado
                          </Text>
                        </td>
                      </tr>
                    ) : (
                      entradas.map((e) => (
                        <tr
                          key={e.id}
                          className="border-t border-zinc-100 hover:bg-zinc-50 transition-colors"
                        >
                          <td className="px-3 py-3">
                            <Text variant="subtitle">{e.nome}</Text>
                          </td>

                          <td className="px-3 py-3">
                            <Text variant="subtitle">{e.dataHora}</Text>
                          </td>

                          <td className="px-3 py-3">
                            <span
                              className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                e.entradaSaida === "Entrada"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-600"
                              }`}
                            >
                              {e.entradaSaida}
                            </span>
                          </td>

                          <td className="px-3 py-3">
                            <Text variant="subtitle">{e.motivos}</Text>
                          </td>

                          <td className="px-3 py-3">
                            <Text variant="subtitle">{e.turma}</Text>
                          </td>

                          <td className="px-3 py-3">
                            <Text variant="subtitle">{e.quemEmitiu}</Text>
                          </td>

                          <td className="px-3 py-3">
                            <Text variant="subtitle">{e.quemPermitiu}</Text>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-center px-4 py-2 border-t border-zinc-200 relative">
                <span className="text-xs text-zinc-400 absolute left-4">
                  {totalRegistros} registros · página {currentPage} de{" "}
                  {totalPages}
                </span>

                <div className="flex items-center gap-1">
                  {getPageNumbers().map((p, i) =>
                    p === "..." ? (
                      <span
                        key={`ellipsis-${i}`}
                        className="px-1 text-zinc-400 text-sm"
                      >
                        …
                      </span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => setCurrentPage(p)}
                        className={`w-7 h-7 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                          currentPage === p
                            ? "bg-red-600 text-white"
                            : "text-zinc-600 hover:bg-zinc-100"
                        }`}
                      >
                        {p}
                      </button>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div
        className={`fixed inset-0 z-999 flex items-center justify-center bg-black/30 backdrop-blur-md p-4 transition-all duration-170 ease-in-out ${
          modalActive
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setModalActive(false)}
      >
        <div
          className={`w-[60vw] h-[80vh] rounded-2xl bg-white p-6 shadow-2xl transition-all duration-170 ease-in-out ${
            modalActive
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-4"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-zinc-900">Novo Registro</h2>

              <p className="text-sm text-zinc-400">
                Registre uma nova entrada ou saída.
              </p>
            </div>

            <button
              onClick={() => setModalActive(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
