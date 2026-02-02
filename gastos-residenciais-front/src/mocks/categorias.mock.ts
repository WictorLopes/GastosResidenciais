import type { Categoria } from "../types/Categoria";

export const categoriasMock: Categoria[] = [
  { id: 1, descricao: "Salário", finalidade: "Receita" },
  { id: 2, descricao: "Freelance", finalidade: "Receita" },
  { id: 3, descricao: "Alimentação", finalidade: "Despesa" },
  { id: 4, descricao: "Moradia", finalidade: "Despesa" },
  { id: 5, descricao: "Transporte", finalidade: "Despesa" },
  { id: 6, descricao: "Lazer", finalidade: "Despesa" },
  { id: 7, descricao: "Saúde", finalidade: "Despesa" },
  { id: 8, descricao: "Educação", finalidade: "Despesa" },
  { id: 9, descricao: "Investimentos", finalidade: "Receita" },
  { id: 10, descricao: "Outros", finalidade: "Despesa" },
];
