import { useEffect, useState } from "react";
import type { Categoria } from "../types/Categoria";
import {
  listarCategorias,
  criarCategoria,
  atualizarCategoria,
  excluirCategoria,
} from "../api/categoriaService";
import { Edit, Trash2, Save, Loader2, PlusCircle, X } from "lucide-react";

export function Categorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [descricao, setDescricao] = useState("");
  const [finalidade, setFinalidade] = useState<"Receita" | "Despesa">("Receita");
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function carregar() {
    setLoading(true);
    try {
      const data = await listarCategorias();
      setCategorias(data);
    } catch (error) {
      console.error("Erro ao carregar categorias:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function salvar() {
    if (!descricao.trim() || !finalidade) return alert("Preencha todos os campos");

    setSubmitting(true);
    const payload = { descricao, finalidade };

    try {
      if (editandoId !== null) {
        await atualizarCategoria(editandoId, payload);
        setEditandoId(null);
      } else {
        await criarCategoria(payload);
      }
      setDescricao("");
      setFinalidade("Receita");
      await carregar();
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
    } finally {
      setSubmitting(false);
    }
  }

  function editar(c: Categoria) {
    setEditandoId(c.id);
    setDescricao(c.descricao);
    setFinalidade(c.finalidade);
  }

  function cancelarEdicao() {
    setEditandoId(null);
    setDescricao("");
    setFinalidade("Receita");
  }

  async function remover(id: number) {
    if (confirm("Deseja excluir esta categoria?")) {
      try {
        await excluirCategoria(id);
        await carregar();
      } catch (error) {
        console.error("Erro ao excluir categoria:", error);
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <PlusCircle className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">Gerenciar Categorias</h1>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {editandoId !== null ? "Editar Categoria" : "Adicionar Nova Categoria"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Digite a descrição"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Finalidade
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                value={finalidade}
                onChange={(e) =>
                  setFinalidade(e.target.value as "Receita" | "Despesa")
                }
              >
                <option value="Receita">Receita</option>
                <option value="Despesa">Despesa</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={salvar}
              disabled={submitting || !descricao.trim()}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
            >
              {submitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : editandoId !== null ? (
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

            {editandoId !== null && (
              <button
                onClick={cancelarEdicao}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all flex items-center gap-2"
              >
                <X className="w-5 h-5" />
                Cancelar
              </button>
            )}
          </div>
        </div>

        {/* Lista Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Categorias Cadastradas ({categorias.length})
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          ) : categorias.length === 0 ? (
            <div className="text-center py-16">
              <PlusCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                Nenhuma categoria cadastrada. Adicione uma nova acima.
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
                      Finalidade
                    </th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {categorias.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 font-medium text-gray-800">{c.descricao}</td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            c.finalidade === "Receita"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {c.finalidade}
                        </span>
                      </td>
                      <td className="py-4 px-6 flex gap-2">
                        <button
                          onClick={() => editar(c)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => remover(c.id)}
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
