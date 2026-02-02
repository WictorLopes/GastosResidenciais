import { api } from "./axios";
import type { Relatorio } from "../types/Relatorio";

export async function getRelatorio() {
  const response = await api.get<Relatorio>("/relatorios/totais-por-pessoa");
  return response.data;
}
