import { Link, useLocation, useNavigate } from "react-router-dom";
import { Home, Users, PieChart, Tag } from "lucide-react";

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate(); // <- para navegação programática

  const navItems = [
    { path: "/", label: "Dashboard", icon: <Home className="w-5 h-5" /> },
    { path: "/pessoas", label: "Pessoas", icon: <Users className="w-5 h-5" /> },
    { path: "/transacoes", label: "Transações", icon: <PieChart className="w-5 h-5" /> },
    { path: "/categorias", label: "Categorias", icon: <Tag className="w-5 h-5" /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo como botão */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 px-2 py-1 rounded-xl hover:bg-gray-100 transition"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
              <PieChart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Gastos Residenciais
            </h1>
          </button>

          {/* Navigation */}
          <div className="flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  isActive(item.path)
                    ? "bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-600 border border-blue-100"
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
                {isActive(item.path) && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                )}
              </Link>
            ))}
          </div>

        </div>
      </div>
    </nav>
  );
}
