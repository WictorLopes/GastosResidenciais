import { api } from "./axios";
import type { Categoria } from "../types/Categoria";

export async function listarCategorias(): Promise<Categoria[]> {
  const { data } = await api.get<Categoria[]>("/categorias");
  return data;
}

export async function criarCategoria(categoria: Omit<Categoria, "id">): Promise<Categoria> {
  const { data } = await api.post<Categoria>("/categorias", categoria);
  return data;
}

export async function atualizarCategoria(id: number, categoria: Omit<Categoria, "id">): Promise<void> {
  await api.put(`/categorias/${id}`, categoria);
}

export async function excluirCategoria(id: number): Promise<void> {
  await api.delete(`/categorias/${id}`);
}
