import type {
  Relatorio,
  TotaisGeraisPorPessoa,
  TotaisGeraisPorCategoria,
} from "../types/Relatorio";

/* =========================
   RELATÓRIO GERAL
========================= */
export const relatorioMock: Relatorio = {
  pessoas: [
    {
      pessoaId: 1,
      pessoa: "Wictor",
      totalReceitas: 4500,
      totalDespesas: 1370,
      saldo: 3130,
    },
    {
      pessoaId: 2,
      pessoa: "Allana",
      totalReceitas: 0,
      totalDespesas: 1750,
      saldo: -1750,
    },
    {
      pessoaId: 3,
      pessoa: "Will",
      totalReceitas: 2000,
      totalDespesas: 180,
      saldo: 1820,
    },
    {
      pessoaId: 4,
      pessoa: "Guilherme",
      totalReceitas: 0,
      totalDespesas: 300,
      saldo: -300,
    },
    {
      pessoaId: 5,
      pessoa: "Monique",
      totalReceitas: 0,
      totalDespesas: 400,
      saldo: -400,
    },
    {
      pessoaId: 6,
      pessoa: "Adriano",
      totalReceitas: 600,
      totalDespesas: 0,
      saldo: 600,
    },
  ],
  totalReceitas: 7100,
  totalDespesas: 4000,
  saldoGeral: 3100,
};

/* =========================
   TOTAIS POR PESSOA
========================= */
export const totaisPorPessoaMock: TotaisGeraisPorPessoa = {
  pessoas: relatorioMock.pessoas,
  totalReceitas: relatorioMock.totalReceitas,
  totalDespesas: relatorioMock.totalDespesas,
  saldoGeral: relatorioMock.saldoGeral,
};

/* =========================
   TOTAIS POR CATEGORIA
========================= */
export const totaisPorCategoriaMock: TotaisGeraisPorCategoria = {
  categorias: [
    {
      categoriaId: 1,
      categoria: "Salário",
      totalReceitas: 7100,
      totalDespesas: 0,
      saldo: 7100,
    },
    {
      categoriaId: 2,
      categoria: "Alimentação",
      totalReceitas: 0,
      totalDespesas: 1200,
      saldo: -1200,
    },
    {
      categoriaId: 3,
      categoria: "Moradia",
      totalReceitas: 0,
      totalDespesas: 1800,
      saldo: -1800,
    },
    {
      categoriaId: 4,
      categoria: "Lazer",
      totalReceitas: 0,
      totalDespesas: 600,
      saldo: -600,
    },
    {
      categoriaId: 5,
      categoria: "Outros",
      totalReceitas: 0,
      totalDespesas: 400,
      saldo: -400,
    },
  ],
  totalReceitas: 7100,
  totalDespesas: 4000,
  saldoGeral: 3100,
};
