export interface TotaisPorPessoa {
  pessoaId: number
  pessoa: string
  totalReceitas: number
  totalDespesas: number
  saldo: number
}

export interface Relatorio {
  pessoas: TotaisPorPessoa[]
  totalReceitas: number
  totalDespesas: number
  saldoGeral: number
}

export type TotaisGeraisPorPessoa = {
  pessoas: TotaisPorPessoa[]
  totalReceitas: number
  totalDespesas: number
  saldoGeral: number
}

export type TotaisPorCategoria = {
  categoriaId: number
  categoria: string
  totalReceitas: number
  totalDespesas: number
  saldo: number
}

export type TotaisGeraisPorCategoria = {
  categorias: TotaisPorCategoria[]
  totalReceitas: number
  totalDespesas: number
  saldoGeral: number
}
