import { api } from "./axios";
import type { Pessoa } from "../types/Pessoa";

export async function listarPessoas() {
  const { data } = await api.get<Pessoa[]>("/pessoas");
  return data;
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
