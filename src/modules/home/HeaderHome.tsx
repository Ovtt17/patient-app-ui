import { useState, type FC, type PropsWithChildren } from "react";
import { Link } from "react-router-dom";

const HeaderHome: FC<PropsWithChildren> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src="/imagen.png" alt="Hospital Logo" className="h-16" />
            <div>
              <h1 className="text-lg lg:text-2xl font-['Times_New_Roman'] text-blue-400">
                Hospital
              </h1>
              <h1 className="text-lg lg:text-2xl font-bold font-['Times_New_Roman'] text-blue-800">
                Salud y Vida
              </h1>
            </div>
          </div>

          {/* Menú desktop */}
          <nav className="hidden lg:flex flex-1 justify-center gap-x-18 font-serif text-xl text-blue-900 font-medium">
            <Link to="/" className="hover:text-blue-600 text-xl">Inicio</Link>
            <Link to="/especialidades" className="hover:text-blue-600 text-xl">Especialidades</Link>
            <Link to="/centros-diagnosticos" className="hover:text-blue-600 text-xl">Centros Diagnósticos</Link>
            <Link to="/servicios" className="hover:text-blue-600 text-xl">Servicios Hospitalarios</Link>
            <Link to="/login" className="hover:text-blue-600 text-xl">Inicia Sesion</Link>
          </nav>

          {/* Botón menú móvil */}
          <button
            className="lg:hidden text-blue-900 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Menú móvil */}
        {menuOpen && (
          <nav className="lg:hidden flex flex-col space-y-3 bg-blue-50 px-6 py-4 text-blue-900 font-medium text-lg">
            <Link to="/" className="hover:text-blue-600">Inicio</Link>
            <Link to="/especialidades" className="hover:text-blue-600">Especialidades</Link>
            <Link to="/centros-diagnosticos" className="hover:text-blue-600">Centros Diagnósticos</Link>
            <Link to="/servicios" className="hover:text-blue-600">Servicios Hospitalarios</Link>
            <Link to="/registrate" className="hover:text-blue-600">Registrate</Link>
            <Link to="/login" className="hover:text-blue-600">Inicia Sesion</Link>
          </nav>
        )}
      </header>

      {/* Contenido */}
      <main className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
};

export default HeaderHome;