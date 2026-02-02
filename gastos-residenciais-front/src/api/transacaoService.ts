import { api } from "./axios";
import type { Transacao } from "../types/Transacao";
import { transacoesMock } from "../mocks/transacoes.mock";


export async function listarTransacoes() {
    try {
  const response = await api.get<Transacao[]>("/transacoes");
   if (!response.data || response.data.length === 0) {
      throw new Error("Sem dados");
    }

    return response.data;
   } catch {
    console.warn("Mock transações");
    return transacoesMock;
  }
}

import type { CreateTransacaoPayload } from "../types/Transacao";

export async function criarTransacao(data: CreateTransacaoPayload) {
  const { data: res } = await api.post("/transacoes", data);
  return res;
}

export async function atualizarTransacao(id: number, data: CreateTransacaoPayload) {
  await api.put(`/transacoes/${id}`, data);
}


export async function excluirTransacao(id: number) {
  await api.delete(`/transacoes/${id}`);
}
