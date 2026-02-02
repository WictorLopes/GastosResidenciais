export interface TotaisPorPessoa {
  pessoaId: number;
  pessoa: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

export interface Relatorio {
  pessoas: TotaisPorPessoa[];
  totalReceitas: number;
  totalDespesas: number;
  saldoGeral: number;
}
