"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/Components/ui/Button";
import ImagemSenai from "@/assets/SENAI-SP.jpg";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Funnel, RefreshCw, SearchIcon, X } from "lucide-react";
import { Text } from "@/Components/ui/Text";
import { Form } from "@/Components/form/Form";
import { FormField } from "@/Components/form/FormField";
import { Select } from "@/Components/ui/Select";
import { Label } from "@/Components/ui/Label";
import { Textarea } from "@/Components/ui/Textarea";
import { Entrada } from "@/lib/types/entradas";
import { ListarRegistros, InserirRegistro, ListarRegistrosPorPagina } from "@/lib/api/registro";
import { ListarAlunos } from "@/lib/api/aluno";
import { ListarTurmas } from "@/lib/api/turma";
import { IAluno } from "@/lib/types/aluno";
import { ITurma } from "@/lib/types/turma";
import { IRegistro } from "@/lib/types/registro";

interface Usuario {
  nome: string;
  email: string;
  token?: string;
}

const PAGE_SIZE = 8;

export default function HomeDashboard() {
  const router = useRouter();

  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [botao, setBotao] = useState<"red" | "disable">("red");
  const [botao1, setBotao1] = useState<"red" | "disable">("disable");
  const [todosRegistros, setTodosRegistros] = useState<Entrada[]>([]);
  const [alunos, setAlunos] = useState<IAluno[]>([]);
  const [turmas, setTurmas] = useState<ITurma[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [filtroNome, setFiltroNome] = useState("");
  const [filtroTurma, setFiltroTurma] = useState("");
  const [showFiltro, setShowFiltro] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [modalStep, setModalStep] = useState<1 | 2>(1);

  const getInitialFormData = () => {
    const agora = new Date();
    const ano = agora.getFullYear();
    const mes = String(agora.getMonth() + 1).padStart(2, "0");
    const dia = String(agora.getDate()).padStart(2, "0");
    const hora = String(agora.getHours()).padStart(2, "0");
    const minuto = String(agora.getMinutes()).padStart(2, "0");

    return {
      alunoId: "",
      nome: "",
      hora: `${hora}:${minuto}`,
      data: `${ano}-${mes}-${dia}`,
      entradaSaida: "Entrada",
      motivos: "",
      turma: "",
      quemEmitiu: "",
      quemPermitiu: "",
      quemBuscou: "",
      telefone: "",
    };
  };

  const [formData, setFormData] = useState(getInitialFormData);

  const formatTelefone = (value: string): string => {
    const apenasNumeros = value.replace(/\D/g, "").slice(0, 11);

    if (apenasNumeros.length === 0) return "";
    if (apenasNumeros.length <= 2) return `(${apenasNumeros}`;
    if (apenasNumeros.length <= 6) return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2)}`;
    if (apenasNumeros.length <= 10) {
      return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2, 6)}-${apenasNumeros.slice(6)}`;
    }
    return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2, 7)}-${apenasNumeros.slice(7, 11)}`;
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === "telefone") {
      setFormData((prev) => ({ ...prev, telefone: formatTelefone(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const encontrarTurma = (alunoId?: string, turmasLista: ITurma[] = turmas): string => {
    if (!alunoId) return "-";
    const turmaEncontrada = turmasLista.find((t) =>
      t.listaAlunos?.some((a) => a.id === alunoId)
    );
    return turmaEncontrada?.nome || "-";
  };

  const formatarRegistros = (lista: IRegistro[], turmasLista: ITurma[] = turmas): Entrada[] => {
    return lista.map((item) => {
      let dataHoraFormatada = "-";
      if (item.data) {
        const dataObj = new Date(item.data);
        if (!isNaN(dataObj.getTime())) {
          dataHoraFormatada = dataObj.toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          });
        } else {
          dataHoraFormatada = String(item.data);
        }
      }

      return {
        id: String(item.id),
        nome: item.aluno?.nome || "Aluno não identificado",
        dataHora: dataHoraFormatada,
        entradaSaida: (item.entradaSaida as "Entrada" | "Saída") || "Entrada",
        motivos: item.motivo || "Não informado",
        turma: encontrarTurma(item.alunoId, turmasLista),
        quemEmitiu: item.quemEmitiu || "-",
        quemPermitiu: item.quemPermitiu || "-",
        quemBuscou: item.quemBuscou || "-",
        telefone: item.telefone || "",
      };
    });
  };

  const carregarDadosApi = async () => {
    setIsRefreshing(true);
    setLoading(true);
    var result = await ListarRegistros()
    result = result.reverse()

    try {
      const [resRegistros, resAlunos, resTurmas] = await Promise.allSettled([
        result,
        ListarAlunos(),
        ListarTurmas(),
      ]);

      let turmasCarregadas: ITurma[] = [];
      if (resTurmas.status === "fulfilled" && Array.isArray(resTurmas.value)) {
        turmasCarregadas = resTurmas.value;
        setTurmas(turmasCarregadas);
      }

      if (resAlunos.status === "fulfilled" && Array.isArray(resAlunos.value)) {
        setAlunos(resAlunos.value);
      }

      if (resRegistros.status === "fulfilled" && Array.isArray(resRegistros.value)) {
        const formatados = formatarRegistros(resRegistros.value, turmasCarregadas);
        setTodosRegistros(formatados);
      }
    } catch (error) {
      console.error("Erro ao carregar dados da API:", error);
    } finally {
      setIsRefreshing(false);
      setLoading(false);
    }
  };


    const registrosFiltrados = useMemo(() => {
    const nomeFiltro = filtroNome.trim().toLowerCase();
    const turmaFiltro = filtroTurma.trim().toLowerCase();

    return todosRegistros.filter((e) => {
      const matchNome = !nomeFiltro || (e.nome || "").toLowerCase().includes(nomeFiltro);
      const matchTurma = !turmaFiltro || (e.turma || "").toLowerCase().includes(turmaFiltro);
      return matchNome && matchTurma;
    });
  }, [todosRegistros, filtroNome, filtroTurma]);

  // Total de itens e total de páginas calculados dinamicamente
  const totalRegistros = registrosFiltrados.length;
  const totalPages = Math.max(1, Math.ceil(totalRegistros / PAGE_SIZE));

  // Garante que a página atual seja sempre válida
  const paginaAtual = Math.min(Math.max(1, currentPage), totalPages);

  // Fatiamento imediato para a página atual (sem lag e sem desincronia de estado)
  const entradas = useMemo(() => {
    const start = (paginaAtual - 1) * PAGE_SIZE;
    return registrosFiltrados.slice(start, start + PAGE_SIZE);
  }, [registrosFiltrados, paginaAtual]);

  const mudarPagina = (novaPagina: number) => {
    if (novaPagina >= 1 && novaPagina <= totalPages) {
      setCurrentPage(novaPagina);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (modalStep === 1 && formData.entradaSaida === "Saída") {
      setModalStep(2);
      return;
    }

    const alunoEncontrado = alunos.find(
      (a) => a.id === formData.alunoId || a.nome.toLowerCase() === formData.nome.trim().toLowerCase()
    );

    if (!alunoEncontrado?.id) {
      alert("Por favor, selecione um aluno válido existente na lista.");
      return;
    }

    try {
      setLoading(true);
      const dataIso = new Date(`${formData.data}T${formData.hora || "00:00"}`);

      await InserirRegistro({
        alunoId: alunoEncontrado.id,
        data: isNaN(dataIso.getTime()) ? new Date() : dataIso,
        entradaSaida: formData.entradaSaida,
        motivo: formData.motivos || null,
        quemEmitiu: formData.quemEmitiu || "Sistema",
        quemPermitiu: formData.quemPermitiu || "Coordenação",
        quemBuscou: formData.quemBuscou || "",
        telefone: formData.telefone || null,
        ativo: true,
      });

      await carregarDadosApi();
      setFormData(getInitialFormData());
      setModalStep(1);
      setModalActive(false);
    } catch (err: any) {
      alert("Erro ao cadastrar registro na API: " + (err.message || "Erro de comunicação"));
    } finally {
      setLoading(false);
    }
  };

  const btStyles = { red: "danger", disable: "ghost" } as const;
  const textStyles = { red: "success", disable: "muted" } as const;

  useEffect(() => {
    const dadosGravados = localStorage.getItem("usuario_logado");
    const token = localStorage.getItem("token");

    if (!dadosGravados && !token) {
      router.push("/");
      return;
    }

    if (dadosGravados) {
      try {
        const parsed = JSON.parse(dadosGravados);
        setUsuario(parsed);
      } catch {
        setUsuario(null);
      }
    }

    carregarDadosApi();
  }, [router]);

  // Ao alterar o filtro, retorna à primeira página
  useEffect(() => {
    setCurrentPage(1);
  }, [filtroNome, filtroTurma]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalActive(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const getPageNumbers = () => {
    const pages: (number | "...")[] = [];

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    if (paginaAtual > 4) {
      pages.push("...");
    }

    const start = Math.max(2, paginaAtual - 1);
    const end = Math.min(totalPages - 1, paginaAtual + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (paginaAtual < totalPages - 3) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  const opcoesTurmas = turmas.map((t) => ({ value: t.nome, label: t.nome }));

  if (!usuario) return null;

  return (
    <main className="root flex flex-row">
      <div className="bg-[#F1F1F1] rounded-2xl w-[90vw] h-[93vh] flex flex-row items-center pr-3">
        <section className="sidebar flex flex-col w-[15vw] rounded-2xl items-center bg-white shadow-black h-[93vh] p-7 z-1">
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
                value={filtroNome}
                onChange={(e) => setFiltroNome(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="h-[6vh] w-[6vh] rounded-full border border-zinc-100 bg-white shrink-0 shadow-sm" />

                <div className="flex flex-col">
                  <span className="font-bold text-[0.95vw] leading-tight">
                    {usuario.nome}
                  </span>

                  <span className="font-medium text-[0.75vw] text-zinc-400 leading-tight">
                    {usuario.email}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-1 items-center gap-6 pb-4">
            <div className="flex w-full px-[2vw] items-center justify-between gap-4">
              <Text variant="h1" weight="bold" align="left" className="whitespace-nowrap shrink-0">
                Entradas e Saídas
              </Text>

              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  className="flex items-center justify-center w-9 h-9 p-0 shadow-sm cursor-pointer"
                  title="Atualizar lista"
                  onClick={carregarDadosApi}
                  disabled={isRefreshing}
                >
                  <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
                </Button>

                <Button
                  variant="danger"
                  className="gap-1.5 px-4 h-9 shadow-sm whitespace-nowrap cursor-pointer"
                  onClick={() => {
                    setFormData(getInitialFormData());
                    setModalActive(true);
                  }}
                >
                  <span className="text-sm px-2 font-bold text-white leading-none">
                    Novo Registro
                  </span>
                </Button>

                <div className="flex items-center gap-2 relative">
                  <Button
                    variant="danger"
                    className="flex items-center justify-center w-9 h-9 p-0 shadow-sm cursor-pointer"
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
                            Carregando registros...
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
                            <Text variant="subtitle" className="text-[10px]">{e.dataHora}</Text>
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

              <div className="flex items-center justify-between px-6 py-3 border-t border-zinc-200">
                <span className="text-xs font-medium text-zinc-500">
                  {totalRegistros} {totalRegistros === 1 ? "registro" : "registros"} · Página {paginaAtual} de {totalPages}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    title="Página anterior"
                    disabled={paginaAtual <= 1}
                    onClick={() => mudarPagina(paginaAtual - 1)}
                    className="flex items-center justify-center w-8 h-8 rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {getPageNumbers().map((p, i) =>
                    p === "..." ? (
                      <span
                        key={`ellipsis-${i}`}
                        className="px-2 text-zinc-400 text-sm select-none"
                      >
                        …
                      </span>
                    ) : (
                      <button
                        type="button"
                        key={`page-${p}`}
                        onClick={() => mudarPagina(p)}
                        className={`min-w-8 h-8 px-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                          paginaAtual === p
                            ? "bg-red-600 text-white shadow-sm"
                            : "text-zinc-600 hover:bg-zinc-100 border border-zinc-200"
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}

                  <button
                    type="button"
                    title="Próxima página"
                    disabled={paginaAtual >= totalPages}
                    onClick={() => mudarPagina(paginaAtual + 1)}
                    className="flex items-center justify-center w-8 h-8 rounded-lg border border-zinc-200 text-zinc-600 hover:bg-zinc-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    <ChevronRight size={16} />
                  </button>
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
          className={`w-[60vw] h-[85vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl transition-all duration-170 ease-in-out ${
            modalActive
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 translate-y-4"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100">
            <div>
              <Text variant="h3" color="default" weight="bold">
                {modalStep === 1 ? "Novo Registro" : "Informações de Saída"}
              </Text>
              <Text variant="caption" color="muted">
                {modalStep === 1
                  ? "Registre uma nova entrada ou saída de aluno."
                  : "Informe quem buscou o aluno e o telefone de contato."}
              </Text>
            </div>

            <button
              onClick={() => {
                setModalActive(false);
                setModalStep(1);
              }}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-700 cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <Form onSubmit={handleFormSubmit} spacing="md">
            {modalStep === 1 ? (
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                
                <div>
                  <FormField
                    id="nome-aluno"
                    label="Nome do Aluno"
                    placeholder="Selecione ou digite o nome"
                    required
                    value={formData.nome}
                    list="lista-alunos-datalist"
                    onChange={(e) => {
                      const val = e.target.value;
                      const encontrado = alunos.find(
                        (a) => a.nome.toLowerCase() === val.trim().toLowerCase()
                      );
                      setFormData((prev) => ({
                        ...prev,
                        nome: val,
                        alunoId: encontrado ? encontrado.id : prev.alunoId,
                        turma: encontrado ? encontrarTurma(encontrado.id) : prev.turma,
                      }));
                    }}
                  />
                  <datalist id="lista-alunos-datalist">
                    {alunos.map((aluno) => (
                      <option key={aluno.id} value={aluno.nome}>
                        {aluno.rm ? `RM: ${aluno.rm}` : ""}
                      </option>
                    ))}
                  </datalist>
                </div>

                {/* DIREITA - 1: MOTIVO */}
                <div className="row-span-2 flex flex-col gap-2">
                  <Label htmlFor="motivos" required>
                    Motivo
                  </Label>
                  <Textarea
                    id="motivos"
                    rows={4}
                    placeholder="Digite o motivo..."
                    className="h-full min-h-27.5"
                    value={formData.motivos}
                    onChange={(e) => handleInputChange("motivos", e.target.value)}
                  />
                </div>

                {/* ESQUERDA - 2: HORA */}
                <FormField
                  id="hora"
                  type="time"
                  label="Hora"
                  required
                  value={formData.hora}
                  onChange={(e) => handleInputChange("hora", e.target.value)}
                />

                {/* ESQUERDA - 3: DATA */}
                <FormField
                  id="data"
                  type="date"
                  label="Data"
                  required
                  value={formData.data}
                  onChange={(e) => handleInputChange("data", e.target.value)}
                />

                {/* DIREITA - 2: TURMA */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="turma">
                    Turma
                  </Label>
                  <Select
                    id="turma"
                    value={formData.turma}
                    onChange={(e) => handleInputChange("turma", e.target.value)}
                    placeholder="Selecione a turma"
                    options={opcoesTurmas}
                  />
                </div>

                {/* ESQUERDA - 4: ENTRADA / SAÍDA */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="entradaSaida" required>
                    Entrada / Saída
                  </Label>
                  <div className="flex items-center gap-4 pt-1">
                    <label
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-all ${
                        formData.entradaSaida === "Entrada"
                          ? "border-red-500 bg-red-50 text-red-700 font-semibold"
                          : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="entradaSaida"
                        value="Entrada"
                        checked={formData.entradaSaida === "Entrada"}
                        onChange={() => handleInputChange("entradaSaida", "Entrada")}
                        className="accent-red-600 w-4 h-4 cursor-pointer"
                      />
                      Entrada
                    </label>

                    <label
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-all ${
                        formData.entradaSaida === "Saída"
                          ? "border-red-500 bg-red-50 text-red-700 font-semibold"
                          : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="entradaSaida"
                        value="Saída"
                        checked={formData.entradaSaida === "Saída"}
                        onChange={() => handleInputChange("entradaSaida", "Saída")}
                        className="accent-red-600 w-4 h-4 cursor-pointer"
                      />
                      Saída
                    </label>
                  </div>
                </div>

                
                <FormField
                  id="quemEmitiu"
                  label="Quem emitiu"
                  placeholder="Ex: Prof. João"
                  required
                  value={formData.quemEmitiu}
                  onChange={(e) => handleInputChange("quemEmitiu", e.target.value)}
                />

                {/* INPUT LONGO: QUEM PERMITIU */}
                <div className="col-span-2">
                  <FormField
                    id="quemPermitiu"
                    label="Quem permitiu"
                    placeholder="Ex: Dir. Amanda"
                    required
                    value={formData.quemPermitiu}
                    onChange={(e) => handleInputChange("quemPermitiu", e.target.value)}
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <FormField
                  id="quemBuscou"
                  label="Quem buscou"
                  placeholder="Ex: Maria Souza (Mãe)"
                  value={formData.quemBuscou}
                  onChange={(e) => handleInputChange("quemBuscou", e.target.value)}
                />

                <FormField
                  id="telefone"
                  type="text"
                  label="Telefone"
                  placeholder="Ex: (11) 99999-9999"
                  maxLength={15}
                  value={formData.telefone}
                  onChange={(e) => handleInputChange("telefone", e.target.value)}
                />
              </div>
            )}

            {/* BOTÕES */}
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-zinc-100">
              {modalStep === 1 ? (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={(e) => {
                      e.preventDefault();
                      setModalActive(false);
                      setModalStep(1);
                    }}
                  >
                    Cancelar
                  </Button>
                  {formData.entradaSaida === "Saída" ? (
                    <Button
                      type="button"
                      variant="danger"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setModalStep(2);
                      }}
                    >
                      Próximo
                    </Button>
                  ) : (
                    <Button type="submit" variant="danger">
                      Salvar Registro
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={(e) => {
                      e.preventDefault();
                      setModalStep(1);
                    }}
                  >
                    Voltar
                  </Button>
                  <Button type="submit" variant="danger">
                    Salvar Registro
                  </Button>
                </>
              )}
            </div>
          </Form>
        </div>
      </div>
    </main>
  );
}
