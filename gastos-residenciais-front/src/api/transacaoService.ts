import { api } from "./axios";
import type { Transacao } from "../types/Transacao";

export async function listarTransacoes() {
  const { data } = await api.get<Transacao[]>("/transacoes");
  return data;
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
