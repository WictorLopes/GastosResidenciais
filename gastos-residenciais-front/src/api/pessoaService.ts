import { api } from "./axios";
import type { Pessoa } from "../types/Pessoa";
import { pessoasMock } from "../mocks/pessoas.mock";


export async function listarPessoas() {
  try {
    const response = await api.get("/pessoas");

    if (!response.data || response.data.length === 0) {
      throw new Error();
    }

    return response.data;
  } catch {
    console.warn("⚠️ Mock pessoas");
    return pessoasMock;
  }
}

export async function criarPessoa(pessoa: Omit<Pessoa, "id">) {
  const { data } = await api.post<Pessoa>("/pessoas", pessoa);
  return data;
}

export async function atualizarPessoa(id: number, pessoa: Omit<Pessoa, "id">) {
  await api.put(`/pessoas/${id}`, pessoa);
}

export async function excluirPessoa(id: number) {
  await api.delete(`/pessoas/${id}`);
}
