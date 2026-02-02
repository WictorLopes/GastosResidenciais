import { useEffect, useState } from "react";
import {
  listarTransacoes,
  criarTransacao,
  atualizarTransacao,
  excluirTransacao,
} from "../api/transacaoService";
import { listarCategorias } from "../api/categoriaService";
import { listarPessoas } from "../api/pessoaService";
import type { Transacao } from "../types/Transacao";
import type { Categoria } from "../types/Categoria";
import type { Pessoa } from "../types/Pessoa";
import {
  PlusCircle,
  Edit,
  Trash2,
  Save,
  Loader2,
  DollarSign,
} from "lucide-react";
import {
  obterTotaisPorPessoa,
  obterTotaisPorCategoria,
} from "../api/relatorioService";

import type {
  TotaisGeraisPorPessoa,
  TotaisGeraisPorCategoria,
} from "../types/Relatorio";

export function Transacoes() {
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState<number | "">("");
  const [tipo, setTipo] = useState<"Receita" | "Despesa">("Receita");
  const [categoriaId, setCategoriaId] = useState<number | "">("");
  const [pessoaId, setPessoaId] = useState<number | "">(1);
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [filtroTipo, setFiltroTipo] = useState<"todas" | "Receita" | "Despesa">(
    "todas",
  );
  const [totaisPessoa, setTotaisPessoa] =
    useState<TotaisGeraisPorPessoa | null>(null);
  const [totaisCategoria, setTotaisCategoria] =
    useState<TotaisGeraisPorCategoria | null>(null);
  const [pessoaSelecionada, setPessoaSelecionada] = useState<number | "todas">(
    "todas",
  );
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<
    number | "todas"
  >("todas");
  const pessoasFiltradas =
    pessoaSelecionada === "todas"
      ? (totaisPessoa?.pessoas ?? [])
      : (totaisPessoa?.pessoas.filter(
          (p) => p.pessoaId === pessoaSelecionada,
        ) ?? []);

  const categoriasFiltradas =
    categoriaSelecionada === "todas"
      ? (totaisCategoria?.categorias ?? [])
      : (totaisCategoria?.categorias.filter(
          (c) => c.categoriaId === categoriaSelecionada,
        ) ?? []);
  const totalPessoaFiltrado = pessoasFiltradas.reduce(
    (acc, p) => {
      acc.receitas += p.totalReceitas;
      acc.despesas += p.totalDespesas;
      acc.saldo += p.saldo;
      return acc;
    },
    { receitas: 0, despesas: 0, saldo: 0 },
  );

  const totalCategoriaFiltrado = categoriasFiltradas.reduce(
    (acc, c) => {
      acc.receitas += c.totalReceitas;
      acc.despesas += c.totalDespesas;
      acc.saldo += c.saldo;
      return acc;
    },
    { receitas: 0, despesas: 0, saldo: 0 },
  );
  const transacoesFiltradas =
    filtroTipo === "todas"
      ? transacoes
      : transacoes.filter((t) => tipoParaString(t.tipo) === filtroTipo);

  function tipoParaString(tipo: number) {
    return tipo === 1 ? "Receita" : "Despesa";
  }

  async function carregar() {
    setLoading(true);
    try {
      const t = await listarTransacoes();
      setTransacoes(t);
      const c = await listarCategorias();
      setCategorias(c);
      const p = await listarPessoas();
      setPessoas(p);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    } finally {
      setLoading(false);
    }
  }

  async function carregarRelatorios() {
    try {
      const [pessoas, categorias] = await Promise.all([
        obterTotaisPorPessoa(),
        obterTotaisPorCategoria(),
      ]);

      setTotaisPessoa(pessoas);
      setTotaisCategoria(categorias);
    } catch (e) {
      console.error("Erro ao carregar relatórios", e);
    }
  }

  useEffect(() => {
    carregar();
    carregarRelatorios();
  }, []);

  async function salvar() {
    if (!descricao || !valor || !categoriaId || !pessoaId || !data)
      return alert("Preencha todos os campos");

    function tipoParaNumero(tipo: "Receita" | "Despesa"): 1 | 0 {
      return tipo === "Receita" ? 1 : 0;
    }

    const payload = {
      descricao,
      valor: Number(valor),
      tipo: tipoParaNumero(tipo),
      categoriaId,
      pessoaId,
      data,
    };

    setSubmitting(true);
    try {
      if (editandoId) {
        await atualizarTransacao(editandoId, payload);
        setEditandoId(null);
      } else {
        await criarTransacao(payload);
      }
      setDescricao("");
      setValor("");
      setTipo("Receita");
      setCategoriaId("");
      setPessoaId("");
      setData("");
      carregar();
      carregarRelatorios();
    } catch (error) {
      console.error("Erro ao salvar transação:", error);
    } finally {
      setSubmitting(false);
    }
  }

  function editar(t: Transacao) {
    setEditandoId(t.id);
    setDescricao(t.descricao);
    setValor(t.valor);
    setTipo(tipoParaString(t.tipo) as "Receita" | "Despesa");
    setCategoriaId(t.categoria?.id ?? "");
    setPessoaId(t.pessoa?.id ?? "");
    setData(t.data?.slice(0, 10) ?? "");
  }

  async function remover(id: number) {
    if (confirm("Deseja excluir esta transação?")) {
      await excluirTransacao(id);
      carregar();
      carregarRelatorios();
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <DollarSign className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">
            Gerenciar Transações
          </h1>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {editandoId ? "Editar Transação" : "Adicionar Nova Transação"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <input
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Descrição"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
            <input
              type="number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Valor"
              value={valor}
              onChange={(e) => setValor(Number(e.target.value))}
            />
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={tipo}
              onChange={(e) => setTipo(e.target.value as "Receita" | "Despesa")}
            >
              <option value="Receita">Receita</option>
              <option value="Despesa">Despesa</option>
            </select>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={categoriaId}
              onChange={(e) => setCategoriaId(Number(e.target.value))}
            >
              <option value="">Selecione a categoria</option>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.descricao}
                </option>
              ))}
            </select>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={pessoaId}
              onChange={(e) => setPessoaId(Number(e.target.value))}
            >
              {pessoas.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nome}
                </option>
              ))}
            </select>
            <input
              type="date"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={salvar}
              disabled={submitting || !descricao.trim()}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
            >
              {submitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : editandoId ? (
                <>
                  <Save className="w-5 h-5" />
                  Atualizar
                </>
              ) : (
                <>
                  <PlusCircle className="w-5 h-5" />
                  Adicionar
                </>
              )}
            </button>
          </div>
        </div>

        {/* Lista Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Transações Cadastradas ({transacoesFiltradas.length})
            </h2>

            <div className="mt-4 flex gap-3 items-center">
              <label className="text-sm font-medium text-gray-600">
                Filtrar por tipo:
              </label>

              <select
                value={filtroTipo}
                onChange={(e) =>
                  setFiltroTipo(
                    e.target.value as "todas" | "Receita" | "Despesa",
                  )
                }
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="todas">Todas</option>
                <option value="Receita">Receitas</option>
                <option value="Despesa">Despesas</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          ) : transacoes.length === 0 ? (
            <div className="text-center py-16">
              <DollarSign className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                Nenhuma transação cadastrada. Adicione uma nova transação acima.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
                      Descrição
                    </th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
                      Valor
                    </th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
                      Tipo
                    </th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
                      Categoria
                    </th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
                      Pessoa
                    </th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
                      Data
                    </th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {transacoesFiltradas.map((t) => (
                    <tr
                      key={t.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-6 font-medium text-gray-800">
                        {t.descricao}
                      </td>
                      <td
                        className={`py-4 px-6 font-bold ${tipoParaString(t.tipo) === "Receita" ? "text-green-600" : "text-red-600"}`}
                      >
                        R$ {t.valor.toFixed(2)}
                      </td>
                      <td className="py-4 px-6">{tipoParaString(t.tipo)}</td>
                      <td className="py-4 px-6">
                        {t.categoria?.descricao ?? "-"}
                      </td>
                      <td className="py-4 px-6">{t.pessoa?.nome ?? "-"}</td>
                      <td className="p-3">
                        {t.data
                          ? new Date(t.data).toLocaleDateString("pt-BR") // formata para dd/mm/aaaa
                          : "-"}
                      </td>
                      <td className="py-4 px-6 flex gap-2">
                        <button
                          onClick={() => editar(t)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => remover(t.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Excluir"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {/* Totais por Pessoa */}
        {totaisPessoa && (
          <div className="mt-10 bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <DollarSign className="w-6 h-6 text-blue-600" />
                    Totais por Pessoa
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Resumo financeiro por pessoa
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <div className="flex-1">
                  <div className="flex gap-4 items-center">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <DollarSign className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Filtro de pessoa</p>
                      <select
                        className="mt-1 bg-transparent text-lg font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg px-2 py-1"
                        value={pessoaSelecionada}
                        onChange={(e) =>
                          setPessoaSelecionada(
                            e.target.value === "todas"
                              ? "todas"
                              : Number(e.target.value),
                          )
                        }
                      >
                        <option value="todas">Todas as pessoas</option>
                        {totaisPessoa.pessoas.map((p) => (
                          <option key={p.pessoaId} value={p.pessoaId}>
                            {p.pessoa}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <p className="text-sm text-gray-600">Receitas</p>
                    <p className="text-2xl font-bold text-green-600">
                      R$ {totalPessoaFiltrado.receitas.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-xl">
                    <p className="text-sm text-gray-600">Despesas</p>
                    <p className="text-2xl font-bold text-red-600">
                      R$ {totalPessoaFiltrado.despesas.toFixed(2)}
                    </p>
                  </div>
                  <div
                    className={`text-center p-4 rounded-xl ${
                      totalPessoaFiltrado.saldo >= 0
                        ? "bg-emerald-50"
                        : "bg-rose-50"
                    }`}
                  >
                    <p className="text-sm text-gray-600">Saldo Total</p>
                    <p
                      className={`text-2xl font-bold ${
                        totalPessoaFiltrado.saldo >= 0
                          ? "text-emerald-600"
                          : "text-rose-600"
                      }`}
                    >
                      R$ {totalPessoaFiltrado.saldo.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-gray-200">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
                        <div className="flex items-center gap-2">
                          <span>Pessoa</span>
                        </div>
                      </th>
                      <th className="py-4 px-6 text-center text-sm font-semibold text-gray-700">
                        Receitas
                      </th>
                      <th className="py-4 px-6 text-center text-sm font-semibold text-gray-700">
                        Despesas
                      </th>
                      <th className="py-4 px-6 text-center text-sm font-semibold text-gray-700">
                        Saldo
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {pessoasFiltradas.map((p) => {
                      const maxVal = Math.max(p.totalReceitas, p.totalDespesas);
                      const receitaPercent =
                        maxVal > 0 ? (p.totalReceitas / maxVal) * 100 : 0;
                      const despesaPercent =
                        maxVal > 0 ? (p.totalDespesas / maxVal) * 100 : 0;

                      return (
                        <tr
                          key={p.pessoaId}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center">
                                <span className="font-semibold text-blue-600">
                                  {p.pessoa.charAt(0)}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium text-gray-800">
                                  {p.pessoa}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <div className="flex flex-col items-center">
                              <span className="font-bold text-green-600">
                                R$ {p.totalReceitas.toFixed(2)}
                              </span>
                              <div className="w-24 h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                                <div
                                  className="h-full bg-green-500 rounded-full"
                                  style={{ width: `${receitaPercent}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <div className="flex flex-col items-center">
                              <span className="font-bold text-red-600">
                                R$ {p.totalDespesas.toFixed(2)}
                              </span>
                              <div className="w-24 h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                                <div
                                  className="h-full bg-red-500 rounded-full"
                                  style={{ width: `${despesaPercent}%` }}
                                ></div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                p.saldo >= 0
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-rose-100 text-rose-800"
                              }`}
                            >
                              R$ {p.saldo.toFixed(2)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Totais por Categoria */}
        {totaisCategoria && (
          <div className="mt-10 bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <DollarSign className="w-6 h-6 text-purple-600" />
                    Totais por Categoria
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Análise financeira por categoria
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 items-center">
                  <div className="text-center p-3 bg-white rounded-xl shadow-sm">
                    <p className="text-sm text-gray-600">Categorias Ativas</p>
                    <p className="text-xl font-bold text-purple-600">
                      {categoriasFiltradas.length}
                    </p>
                  </div>

                  <div className="hidden sm:flex items-center gap-2">
                    <div className="flex items-center gap-1 text-sm">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-gray-600">Receitas</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-gray-600">Despesas</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Filtro e Resumo */}
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
                <div className="flex-1 max-w-md">
                  <div className="flex gap-4 items-center">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <DollarSign className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Filtrar por categoria
                      </label>
                      <select
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-white"
                        value={categoriaSelecionada}
                        onChange={(e) =>
                          setCategoriaSelecionada(
                            e.target.value === "todas"
                              ? "todas"
                              : Number(e.target.value),
                          )
                        }
                      >
                        <option value="todas">Todas as categorias</option>
                        {totaisCategoria.categorias.map((c) => (
                          <option key={c.categoriaId} value={c.categoriaId}>
                            {c.categoria}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Cards de Resumo */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full lg:w-auto">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Receitas</p>
                        <p className="text-2xl font-bold text-green-700">
                          R$ {totalCategoriaFiltrado.receitas.toFixed(2)}
                        </p>
                      </div>
                      <div className="p-2 bg-green-100 rounded-lg">
                        <DollarSign className="w-5 h-5 text-green-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-4 border border-red-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Despesas</p>
                        <p className="text-2xl font-bold text-red-700">
                          R$ {totalCategoriaFiltrado.despesas.toFixed(2)}
                        </p>
                      </div>
                      <div className="p-2 bg-red-100 rounded-lg">
                        <DollarSign className="w-5 h-5 text-red-600" />
                      </div>
                    </div>
                  </div>

                  <div
                    className={`rounded-xl p-4 border ${
                      totalCategoriaFiltrado.saldo >= 0
                        ? "bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-100"
                        : "bg-gradient-to-br from-rose-50 to-red-50 border-rose-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Saldo Total</p>
                        <p
                          className={`text-2xl font-bold ${
                            totalCategoriaFiltrado.saldo >= 0
                              ? "text-emerald-700"
                              : "text-rose-700"
                          }`}
                        >
                          R$ {totalCategoriaFiltrado.saldo.toFixed(2)}
                        </p>
                      </div>
                      <div
                        className={`p-2 rounded-lg ${
                          totalCategoriaFiltrado.saldo >= 0
                            ? "bg-emerald-100"
                            : "bg-rose-100"
                        }`}
                      >
                        <DollarSign
                          className={`w-5 h-5 ${
                            totalCategoriaFiltrado.saldo >= 0
                              ? "text-emerald-600"
                              : "text-rose-600"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid de Categorias */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoriasFiltradas.map((c) => {
                  const total = c.totalReceitas + c.totalDespesas;
                  const receitaPercent =
                    total > 0 ? (c.totalReceitas / total) * 100 : 0;
                  const despesaPercent =
                    total > 0 ? (c.totalDespesas / total) * 100 : 0;

                  return (
                    <div
                      key={c.categoriaId}
                      className="group bg-white rounded-xl p-6 hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-purple-300 hover:scale-[1.02]"
                    >
                      {/* Cabeçalho da Categoria */}
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 text-lg mb-1">
                            {c.categoria}
                          </h3>
                          <p className="text-sm text-gray-500">
                            ID: {c.categoriaId}
                          </p>
                        </div>
                        <span
                          className={`px-3 py-1.5 rounded-full text-sm font-semibold ${
                            c.saldo >= 0
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-rose-50 text-rose-700 border border-rose-200"
                          }`}
                        >
                          {c.saldo >= 0 ? "Positivo" : "Negativo"}
                        </span>
                      </div>

                      {/* Gráfico de Barras */}
                      <div className="mb-6">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-600">Distribuição</span>
                          <div className="flex gap-3">
                            <span className="text-green-600 font-medium">
                              {receitaPercent.toFixed(0)}%
                            </span>
                            <span className="text-red-600 font-medium">
                              {despesaPercent.toFixed(0)}%
                            </span>
                          </div>
                        </div>
                        <div className="h-3 bg-gray-100 rounded-full overflow-hidden flex">
                          {c.totalReceitas > 0 && (
                            <div
                              className="h-full bg-green-500 transition-all duration-500"
                              style={{ width: `${receitaPercent}%` }}
                              title={`Receitas: ${receitaPercent.toFixed(1)}%`}
                            ></div>
                          )}
                          {c.totalDespesas > 0 && (
                            <div
                              className="h-full bg-red-500 transition-all duration-500"
                              style={{ width: `${despesaPercent}%` }}
                              title={`Despesas: ${despesaPercent.toFixed(1)}%`}
                            ></div>
                          )}
                        </div>
                      </div>

                      {/* Valores Detalhados */}
                      <div className="space-y-4 mb-6">
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-sm font-medium text-gray-700">
                              Receitas
                            </span>
                          </div>
                          <span className="font-bold text-green-700">
                            R$ {c.totalReceitas.toFixed(2)}
                          </span>
                        </div>

                        <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                            <span className="text-sm font-medium text-gray-700">
                              Despesas
                            </span>
                          </div>
                          <span className="font-bold text-red-700">
                            R$ {c.totalDespesas.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Saldo Final */}
                      <div className="pt-5 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-gray-600">Saldo Final</p>
                            <p
                              className={`text-2xl font-bold ${
                                c.saldo >= 0
                                  ? "text-emerald-600"
                                  : "text-rose-600"
                              }`}
                            >
                              R$ {c.saldo.toFixed(2)}
                            </p>
                          </div>
                          <div
                            className={`p-3 rounded-lg ${
                              c.saldo >= 0
                                ? "bg-emerald-100 text-emerald-600"
                                : "bg-rose-100 text-rose-600"
                            }`}
                          >
                            <DollarSign className="w-6 h-6" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
