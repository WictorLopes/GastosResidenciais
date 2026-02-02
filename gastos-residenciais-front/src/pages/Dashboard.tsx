import { useEffect, useState } from "react";
import { getRelatorio } from "../api/relatorioService";
import type { Relatorio } from "../types/Relatorio";
import { TrendingUp, TrendingDown, DollarSign, } from "lucide-react";

export function Dashboard() {
  const [data, setData] = useState<Relatorio | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRelatorio()
      .then(setData)
      .catch((err) => {
        console.error("Erro ao carregar relatório:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Skeleton */}
          <div className="mb-8">
            <div className="h-10 w-64 bg-gray-300 rounded-lg animate-pulse mb-3"></div>
            <div className="h-4 w-80 bg-gray-300 rounded-lg animate-pulse"></div>
          </div>

          {/* Cards Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-8">
            <div className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl p-6 animate-pulse">
              <div className="flex justify-between">
                <div className="space-y-3">
                  <div className="h-5 w-24 bg-gray-400 rounded"></div>
                  <div className="h-9 w-36 bg-gray-400 rounded"></div>
                </div>
                <div className="w-12 h-12 bg-gray-400 rounded-full"></div>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-300/50">
                <div className="h-4 w-32 bg-gray-400 rounded"></div>
              </div>
            </div>

            {[1, 2].map((i) => (
              <div
                key={i}
                className="bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl p-6 animate-pulse"
              >
              </div>
            ))}
          </div>

          {/* Resumo Section Skeleton */}
          <div className="bg-gray-200 rounded-2xl p-6 animate-pulse">
            <div className="h-7 w-32 bg-gray-400 rounded mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="h-5 w-40 bg-gray-400 rounded mb-4"></div>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-14 bg-gray-300 rounded-lg"></div>
                  ))}
                </div>
              </div>
              <div>
                <div className="h-5 w-32 bg-gray-400 rounded mb-4"></div>
                <div className="h-32 bg-gray-300 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return <p className="p-4 text-gray-500">Nenhum dado disponível</p>;

  const cards = [
    {
      title: "Receitas",
      value: data.totalReceitas,
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-gradient-to-r from-green-500 to-emerald-600",
      textColor: "text-white",
      borderColor: "border-green-200",
    },
    {
      title: "Despesas",
      value: data.totalDespesas,
      icon: <TrendingDown className="w-6 h-6" />,
      color: "bg-gradient-to-r from-red-500 to-rose-600",
      textColor: "text-white",
      borderColor: "border-red-200",
    },
    {
      title: "Saldo Geral",
      value: data.saldoGeral,
      icon: <DollarSign className="w-6 h-6" />,
      color:
        data.saldoGeral >= 0
          ? "bg-gradient-to-r from-blue-500 to-cyan-600"
          : "bg-gradient-to-r from-amber-500 to-orange-600",
      textColor: "text-white",
      borderColor:
        data.saldoGeral >= 0 ? "border-blue-200" : "border-amber-200",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 px-4 md:px-8 py-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Dashboard Financeiro
          </h1>
          <p className="text-gray-600 mt-2">
            Visão geral das suas finanças residenciais
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`${card.color} ${card.textColor} rounded-2xl shadow-lg p-6 transform transition-transform hover:scale-105 hover:shadow-xl`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm font-medium opacity-90">{card.title}</p>
                  <p className="text-3xl font-bold mt-2">
                    R$ {card.value.toFixed(2)}
                  </p>
                </div>
                <div className="bg-white/20 p-3 rounded-full">{card.icon}</div>
              </div>
              <div className="pt-4 border-t border-white/20">
                <p className="text-sm opacity-90">
                  {card.title === "Saldo Geral" && (
                    <span>
                      {data.saldoGeral >= 0 ? "✅ Positivo" : "⚠️ Atenção"}
                    </span>
                  )}
                  {card.title === "Receitas" && (
                    <span>📈 Total de entradas</span>
                  )}
                  {card.title === "Despesas" && <span>📉 Total de saídas</span>}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Resumo */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Resumo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-700 mb-3">Detalhamento</h3>
              <ul className="space-y-3">
                <li className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-green-700">Receitas</span>
                  <span className="font-bold text-green-800">
                    R$ {data.totalReceitas.toFixed(2)}
                  </span>
                </li>
                <li className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                  <span className="text-red-700">Despesas</span>
                  <span className="font-bold text-red-800">
                    R$ {data.totalDespesas.toFixed(2)}
                  </span>
                </li>
                <li
                  className={`flex justify-between items-center p-3 ${data.saldoGeral >= 0 ? "bg-blue-50" : "bg-amber-50"} rounded-lg`}
                >
                  <span
                    className={
                      data.saldoGeral >= 0 ? "text-blue-700" : "text-amber-700"
                    }
                  >
                    Saldo Final
                  </span>
                  <span
                    className={`font-bold ${data.saldoGeral >= 0 ? "text-blue-800" : "text-amber-800"}`}
                  >
                    R$ {data.saldoGeral.toFixed(2)}
                  </span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-700 mb-3">Status</h3>
              <div className="p-4 rounded-xl">
                <p
                  className={`p-2 rounded text-white font-semibold ${
                    data.saldoGeral >= 0 ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {data.saldoGeral >= 0
                    ? "😄 Seu saldo está positivo!"
                    : "😢 Seu saldo está negativo."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
