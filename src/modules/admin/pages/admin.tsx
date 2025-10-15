import React, { useMemo, useState } from "react";

/* ---------- Tipos ---------- */
type Status = "activo" | "inactivo";

interface Doctor {
  id: string;
  nombre: string;
  especialidad: string;
  estado: Status;
}

interface Patient {
  id: string;
  nombre: string;
  email: string;
  estado: Status;
}

/* ---------- Componentes UI ---------- */
const Badge: React.FC<{ status: Status }> = ({ status }) => {
  const base =
    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
  return status === "activo" ? (
    <span className={`${base} bg-green-100 text-green-800`}>Activo</span>
  ) : (
    <span className={`${base} bg-gray-200 text-gray-700`}>Inactivo</span>
  );
};

const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "neutral" | "warn" }
> = ({ variant = "primary", className = "", ...props }) => {
  const styles: Record<string, string> = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white focus-visible:outline-blue-600",
    neutral:
      "bg-gray-100 hover:bg-gray-200 text-gray-900 focus-visible:outline-gray-400",
    warn:
      "bg-yellow-500 hover:bg-yellow-600 text-white focus-visible:outline-yellow-500",
  };
  return (
    <button
      {...props}
      className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition ${styles[variant]} ${className}`}
    />
  );
};

const SectionCard: React.FC<{ title: string; children: React.ReactNode; right?: React.ReactNode }> = ({
  title,
  children,
  right,
}) => (
  <section className="bg-white rounded-xl shadow-sm ring-1 ring-gray-200 p-6 mb-8">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      {right}
    </div>
    {children}
  </section>
);

/* ---------- Datos de ejemplo (quítalos cuando conectes API) ---------- */
const seedDoctors: Doctor[] = [
  { id: "d1", nombre: "Dr. Juan Pérez", especialidad: "Cardiología", estado: "activo" },
  { id: "d2", nombre: "Dra. Ana Ruiz", especialidad: "Pediatría", estado: "inactivo" },
];

const seedPatients: Patient[] = [
  { id: "p1", nombre: "Emilio Fuentes", email: "emilio123@gmail.com", estado: "activo" },
  { id: "p2", nombre: "Lucía Gómez", email: "lucia@gmail.com", estado: "activo" },
];

/* ---------- Dashboard ---------- */
const AdminDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [doctores, setDoctores] = useState<Doctor[]>(seedDoctors);
  const [pacientes, setPacientes] = useState<Patient[]>(seedPatients);
  const [search, setSearch] = useState("");

  const filteredDoctors = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return doctores;
    return doctores.filter(
      (d) =>
        d.nombre.toLowerCase().includes(q) ||
        d.especialidad.toLowerCase().includes(q)
    );
  }, [doctores, search]);

  const filteredPatients = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return pacientes;
    return pacientes.filter(
      (p) => p.nombre.toLowerCase().includes(q) || p.email.toLowerCase().includes(q)
    );
  }, [pacientes, search]);

  /* ---------- Acciones (conecta aquí tu API) ---------- */
  const crearDoctor = async () => {
    // TODO: abrir modal / navegar a formulario
    alert("TODO: Crear Doctor");
  };

  const activarDoctor = async (id: string) => {
    setDoctores((prev) =>
      prev.map((d) => (d.id === id ? { ...d, estado: "activo" } : d))
    );
  };

  const desactivarDoctor = async (id: string) => {
    setDoctores((prev) =>
      prev.map((d) => (d.id === id ? { ...d, estado: "inactivo" } : d))
    );
  };

  const desactivarPaciente = async (id: string) => {
    setPacientes((prev) =>
      prev.map((p) => (p.id === id ? { ...p, estado: "inactivo" } : p))
    );
  };

  const obtenerTodosDoctores = async () => {
    // TODO: fetch('/api/doctors')
    alert("TODO: Obtener todos los doctores");
  };

  const obtenerPacientesActivos = async () => {
    // TODO: fetch('/api/patients?estado=activo')
    alert("TODO: Obtener pacientes activos");
  };

  /* ---------- Render ---------- */
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex">
      {/* Sidebar */}
      <aside
        className={`fixed z-40 inset-y-0 left-0 w-72 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-out
        lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        aria-label="Barra lateral de navegación"
      >
        <div className="h-full flex flex-col py-6 px-4">
          <div className="flex items-center gap-3 mb-8">
            <img src="/logo.png" alt="Logo Salud y Vida" className="h-10 w-10 rounded" />
            <h2 className="font-bold text-xl">Salud y Vida</h2>
          </div>
          <nav className="flex flex-col gap-2">
            {[
              { icon: "🛠️", label: "Panel Admin" },
              { icon: "👨‍⚕️", label: "Doctores" },
              { icon: "🧑‍🤝‍🧑", label: "Pacientes" },
              { icon: "📅", label: "Citas" },
              { icon: "🔔", label: "Notificaciones" },
            ].map((item) => (
              <button
                key={item.label}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>
          <div className="mt-auto pt-6">
            <p className="text-xs text-gray-500">v1.0 • Spring Cloud / React</p>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0 lg:ml-0">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-gray-50/80 backdrop-blur border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-3">
            <button
              className="lg:hidden rounded-md p-2 hover:bg-gray-200"
              onClick={() => setSidebarOpen((s) => !s)}
              aria-label="Alternar menú"
            >
              ☰
            </button>
            <h1 className="text-2xl font-bold">Panel de Administrador</h1>
            <div className="ml-auto relative w-full max-w-md">
              <input
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Buscar doctores o pacientes…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </header>

        {/* Contenido */}
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          {/* Doctores */}
          <SectionCard
            title="Gestión de Doctores"
            right={
              <div className="flex gap-2">
                <Button onClick={crearDoctor}>➕ Crear Doctor</Button>
                <Button variant="neutral" onClick={obtenerTodosDoctores}>
                  🔄 Obtener Todos
                </Button>
              </div>
            }
          >
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th scope="col" className="px-3 py-2 text-left font-semibold">Nombre</th>
                    <th scope="col" className="px-3 py-2 text-left font-semibold">Especialidad</th>
                    <th scope="col" className="px-3 py-2 text-left font-semibold">Estado</th>
                    <th scope="col" className="px-3 py-2 text-left font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredDoctors.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-3 py-6 text-center text-gray-500">
                        No hay doctores que coincidan con la búsqueda.
                      </td>
                    </tr>
                  ) : (
                    filteredDoctors.map((d) => (
                      <tr key={d.id} className="hover:bg-gray-50">
                        <td className="px-3 py-2">{d.nombre}</td>
                        <td className="px-3 py-2">{d.especialidad}</td>
                        <td className="px-3 py-2"><Badge status={d.estado} /></td>
                        <td className="px-3 py-2">
                          {d.estado === "activo" ? (
                            <button
                              onClick={() => desactivarDoctor(d.id)}
                              className="text-yellow-700 hover:underline"
                            >
                              Desactivar
                            </button>
                          ) : (
                            <button
                              onClick={() => activarDoctor(d.id)}
                              className="text-blue-700 hover:underline"
                            >
                              Activar
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </SectionCard>

          {/* Pacientes */}
          <SectionCard
            title="Gestión de Pacientes"
            right={
              <div className="flex gap-2">
                <Button variant="neutral" onClick={obtenerPacientesActivos}>
                  ✅ Obtener Activos
                </Button>
              </div>
            }
          >
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th scope="col" className="px-3 py-2 text-left font-semibold">Nombre</th>
                    <th scope="col" className="px-3 py-2 text-left font-semibold">Email</th>
                    <th scope="col" className="px-3 py-2 text-left font-semibold">Estado</th>
                    <th scope="col" className="px-3 py-2 text-left font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredPatients.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-3 py-6 text-center text-gray-500">
                        No hay pacientes que coincidan con la búsqueda.
                      </td>
                    </tr>
                  ) : (
                    filteredPatients.map((p) => (
                      <tr key={p.id} className="hover:bg-gray-50">
                        <td className="px-3 py-2">{p.nombre}</td>
                        <td className="px-3 py-2">{p.email}</td>
                        <td className="px-3 py-2"><Badge status={p.estado} /></td>
                        <td className="px-3 py-2">
                          {p.estado === "activo" ? (
                            <button
                              onClick={() => desactivarPaciente(p.id)}
                              className="text-gray-700 hover:underline"
                            >
                              Desactivar
                            </button>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </SectionCard>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
