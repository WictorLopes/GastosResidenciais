export interface CreateTransacaoPayload {
  descricao: string;
  valor: number;
  tipo: 0 | 1;
  categoriaId: number;
  pessoaId: number;
  data: string;
}
