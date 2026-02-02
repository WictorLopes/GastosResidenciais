import { BrowserRouter } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Pessoas } from "./pages/Pessoas";
import { Transacoes } from "./pages/Transacoes";
import { Categorias } from "./pages/Categorias";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50 overflow-x-hidden">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/pessoas" element={<Pessoas />} />
            <Route path="/transacoes" element={<Transacoes />} />
            <Route path="/categorias" element={<Categorias />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-6">
          <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 text-sm">
            <p>© {new Date().getFullYear()} Gastos Residenciais - Sistema de Gestão Financeira</p>
            <p className="mt-1 text-gray-500">Desenvolvido para controle eficiente das finanças domésticas</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}