export interface Categoria {
  id: number;
  descricao: string;
}

export interface Pessoa {
  id: number;
  nome: string;
  idade: number;
}

export interface Transacao {
  id: number;
  descricao: string;
  valor: number;
  tipo: 0 | 1; // 0 = Receita, 1 = Despesa
  categoria: Categoria;
  pessoa?: Pessoa;
  data: string;
}

export interface CreateTransacaoPayload {
  descricao: string;
  valor: number;
  tipo: 0 | 1;
  categoriaId: number;
  pessoaId: number;
  data: string;
}