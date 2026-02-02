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

  useEffect(() => {
    carregar();
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
              Transações Cadastradas ({transacoes.length})
            </h2>
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
                  {transacoes.map((t) => (
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
      </div>
    </div>
  );
}
