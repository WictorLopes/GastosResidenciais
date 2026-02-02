import { useEffect, useState } from "react";
import {
  listarPessoas,
  criarPessoa,
  atualizarPessoa,
  excluirPessoa,
} from "../api/pessoaService";
import type { Pessoa } from "../types/Pessoa";
import { UserPlus, Edit, Trash2, Save, Loader2, Users, X } from "lucide-react";

export function Pessoas() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState<number>(0);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function carregar() {
    setLoading(true);
    try {
      const data = await listarPessoas();
      setPessoas(data);
    } catch (error) {
      console.error("Erro ao carregar pessoas:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function salvar() {
    if (!nome.trim()) return alert("Por favor, informe o nome");

    setSubmitting(true);
    try {
      if (editandoId) {
        await atualizarPessoa(editandoId, { nome, idade });
        setEditandoId(null);
      } else {
        await criarPessoa({ nome, idade });
      }

      setNome("");
      setIdade(0);
      await carregar();
    } catch (error) {
      console.error("Erro ao salvar pessoa:", error);
    } finally {
      setSubmitting(false);
    }
  }

  function editar(pessoa: Pessoa) {
    setEditandoId(pessoa.id);
    setNome(pessoa.nome);
    setIdade(pessoa.idade);
  }

  function cancelarEdicao() {
    setEditandoId(null);
    setNome("");
    setIdade(0);
  }

  async function remover(id: number) {
    if (confirm("Deseja excluir esta pessoa?")) {
      try {
        await excluirPessoa(id);
        await carregar();
      } catch (error) {
        console.error("Erro ao excluir pessoa:", error);
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Users className="w-8 h-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">Gerenciar Pessoas</h1>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {editandoId ? "Editar Pessoa" : "Adicionar Nova Pessoa"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome
              </label>
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Digite o nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Idade
              </label>
              <input
                type="number"
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Idade"
                value={idade || ""}
                onChange={(e) => setIdade(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={salvar}
              disabled={submitting || !nome.trim()}
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
                  <UserPlus className="w-5 h-5" />
                  Adicionar
                </>
              )}
            </button>

            {editandoId && (
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
              Pessoas Cadastradas ({pessoas.length})
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          ) : pessoas.length === 0 ? (
            <div className="text-center py-16">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">
                Nenhuma pessoa cadastrada. Adicione uma nova pessoa acima.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Nome</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Idade</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {pessoas.map((pessoa) => (
                    <tr key={pessoa.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 font-medium text-gray-800">{pessoa.nome}</td>
                      <td className="py-4 px-6">{pessoa.idade} anos</td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            pessoa.idade >= 18
                              ? "bg-green-100 text-green-800"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {pessoa.idade >= 18 ? "Adulto" : "Menor"}
                        </span>
                      </td>
                      <td className="py-4 px-6 flex gap-2">
                        <button
                          onClick={() => editar(pessoa)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Editar"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => remover(pessoa.id)}
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
