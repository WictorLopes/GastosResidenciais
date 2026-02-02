import { api } from './axios'
import type {
  Relatorio,
  TotaisGeraisPorPessoa,
  TotaisGeraisPorCategoria,
} from '../types/Relatorio'

export async function getRelatorio() {
  const { data } = await api.get<Relatorio>('/relatorios/totais-por-pessoa')
  return data
}

export async function obterTotaisPorPessoa() {
  const { data } = await api.get<TotaisGeraisPorPessoa>(
    "/relatorios/totais-por-pessoa"
  );
  return data;
}

export async function obterTotaisPorCategoria() {
  const { data } = await api.get<TotaisGeraisPorCategoria>(
    "/relatorios/totais-por-categoria"
  );
  return data;
}

