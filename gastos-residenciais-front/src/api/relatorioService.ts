import { api } from "./axios";
import {
  relatorioMock,
  totaisPorPessoaMock,
  totaisPorCategoriaMock,
} from "../mocks/relatorios.mock";

import type {
  Relatorio,
  TotaisGeraisPorPessoa,
  TotaisGeraisPorCategoria,
} from "../types/Relatorio";

export async function getRelatorio(): Promise<Relatorio> {
  try {
    const { data } = await api.get<Relatorio>(
      "/relatorios/totais-por-pessoa"
    );

    if (!data || !data.pessoas || data.pessoas.length === 0) {
      throw new Error();
    }

    return data;
  } catch {
    console.warn("⚠️ Backend offline → usando RELATÓRIO MOCK");
    return relatorioMock;
  }
}

export async function obterTotaisPorPessoa(): Promise<TotaisGeraisPorPessoa> {
  try {
    const { data } = await api.get<TotaisGeraisPorPessoa>(
      "/relatorios/totais-por-pessoa"
    );

    if (!data || !data.pessoas) throw new Error();

    return data;
  } catch {
    console.warn("⚠️ Mock totais por pessoa");
    return totaisPorPessoaMock;
  }
}

export async function obterTotaisPorCategoria(): Promise<TotaisGeraisPorCategoria> {
  try {
    const { data } = await api.get<TotaisGeraisPorCategoria>(
      "/relatorios/totais-por-categoria"
    );

    if (!data || !data.categorias) throw new Error();

    return data;
  } catch {
    console.warn("⚠️ Mock totais por categoria");
    return totaisPorCategoriaMock;
  }
}
