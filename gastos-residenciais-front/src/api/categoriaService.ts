import { api } from "./axios";
import type { Categoria } from "../types/Categoria";
import { categoriasMock } from "../mocks/categorias.mock";

export async function listarCategorias() {
  try {
    const response = await api.get("/categorias");

    if (!response.data || response.data.length === 0) {
      throw new Error();
    }

    return response.data;
  } catch {
    console.warn("⚠️ Mock categorias");
    return categoriasMock;
  }
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
