import React, { useMemo, useState } from "react";

/* ============ Tipos ============ */
type DocState = "SENT" | "IN PROGRESS" | "PENDING";
interface Kpi { label: string; value: string; hint?: string; }
interface Appointment {
  id: string;
  hora: string;          // "09:30"
  paciente: string;
  motivo: string;        // "Control", "Primera vez", etc.
  estado: "confirmada" | "pendiente" | "cancelada";
}
interface DocumentRow {
  id: string;
  nombre: string;
  file: "PDF" | "XLSX" | "DOCX" | "PPTX";
  categoria: string;
  autor: string;
  estado: DocState;
}

/* ============ UI Reutilizable ============ */
const SidebarLink: React.FC<{ icon: string; label: string; active?: boolean }> = ({ icon, label, active }) => (
  <button
    className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium
      ${active ? "text-blue-700 bg-blue-50" : "text-gray-800 hover:text-blue-700 hover:bg-gray-100"}
      focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600`}
  >
    <span className="text-lg">{icon}</span>
    <span>{label}</span>
  </button>
);

const Card: React.FC<{ title?: string; right?: React.ReactNode; children: React.ReactNode; className?: string }> = ({
  title,
  right,
  children,
  className = "",
}) => (
  <section className={`bg-white rounded-xl shadow-sm ring-1 ring-gray-200 p-6 ${className}`}>
    {(title || right) && (
      <header className="flex items-center justify-between mb-4">
        {title ? <h2 className="text-lg font-semibold text-gray-900">{title}</h2> : <div />}
        {right}
      </header>
    )}
    {children}
  </section>
);

const Pill: React.FC<{ tone?: "blue" | "green" | "gray" | "yellow"; children: React.ReactNode }> = ({
  tone = "gray",
  children,
}) => {
  const tones = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    gray: "bg-gray-100 text-gray-700",
    yellow: "bg-yellow-50 text-yellow-700",
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${tones[tone]}`}>{children}</span>;
};

const Btn: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "neutral" | "danger"; size?: "sm" | "md" }
> = ({ variant = "primary", size = "md", className = "", ...props }) => {
  const v = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus-visible:outline-blue-600",
    neutral: "bg-gray-100 hover:bg-gray-200 text-gray-900 focus-visible:outline-gray-400",
    danger: "bg-red-600 hover:bg-red-700 text-white focus-visible:outline-red-600",
  }[variant];
  const s = { sm: "px-2.5 py-1.5 text-sm", md: "px-3 py-2 text-sm" }[size];
  return (
    <button
      {...props}
      className={`inline-flex items-center gap-2 rounded-md font-medium shadow-sm transition
      focus-visible:outline-2 focus-visible:outline-offset-2 ${v} ${s} ${className}`}
    />
  );
};

const StateBadge: React.FC<{ estado: Appointment["estado"] }> = ({ estado }) => {
  const map = {
    confirmada: <Pill tone="green">Confirmada</Pill>,
    pendiente: <Pill tone="yellow">Pendiente</Pill>,
    cancelada: <Pill tone="gray">Cancelada</Pill>,
  };
  return map[estado];
};

const DocBadge: React.FC<{ state: DocState }> = ({ state }) => {
  const tone = state === "SENT" ? "green" : state === "IN PROGRESS" ? "blue" : "yellow";
  return <Pill tone={tone as any}>{state}</Pill>;
};

/* ============ Datos Mock (reemplazar por API) ============ */
const KPIS: Kpi[] = [
  { label: "Citas del día", value: "12" },
  { label: "Pacientes activos", value: "86" },
  { label: "No-shows (mes)", value: "3", hint: "Pacientes que no asistieron" },
  { label: "Satisfacción", value: "4.6/5" },
];

const APPTS: Appointment[] = [
  { id: "a1", hora: "08:30", paciente: "María López", motivo: "Control", estado: "confirmada" },
  { id: "a2", hora: "09:15", paciente: "Carlos Pérez", motivo: "Primera vez", estado: "pendiente" },
  { id: "a3", hora: "10:00", paciente: "Rosa Jiménez", motivo: "Resultados", estado: "confirmada" },
  { id: "a4", hora: "11:30", paciente: "Iván Gutiérrez", motivo: "Control", estado: "cancelada" },
  { id: "a5", hora: "14:00", paciente: "Elena Vargas", motivo: "Control", estado: "pendiente" },
];

const DOCS: DocumentRow[] = [
  { id: "d1", nombre: "Protocolos de Atención", file: "PDF", categoria: "Planning", autor: "Alice Johnson", estado: "SENT" },
  { id: "d2", nombre: "Primeros Auxilios", file: "XLSX", categoria: "Research", autor: "James Lee", estado: "IN PROGRESS" },
  { id: "d3", nombre: "Vacunas 2025", file: "DOCX", categoria: "Design", autor: "Maria Chen", estado: "PENDING" },
  { id: "d4", nombre: "Estrategias 2025", file: "XLSX", categoria: "Finance", autor: "Oliver Smith", estado: "SENT" },
  { id: "d5", nombre: "Notas Médicas", file: "PDF", categoria: "Clinical", autor: "Hannah Arendt", estado: "IN PROGRESS" },
];

/* ============ Componente Principal ============ */
const DoctorsDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredAppts = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return APPTS;
    return APPTS.filter((a) => a.paciente.toLowerCase().includes(q) || a.motivo.toLowerCase().includes(q));
  }, [query]);

  /* TODO: Conectar eventos reales */
  const onOpenHelp = () => alert("TODO: Abrir ayuda");
  const onSearch = () => alert(`TODO: Buscar "${query}"`);
  const onExportAgenda = () => alert("TODO: Exportar agenda");
  const onNotifClick = () => alert("TODO: Abrir notificaciones");

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex">
      {/* Sidebar */}
      <aside
        className={`fixed z-40 inset-y-0 left-0 w-72 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-out
        lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        aria-label="Menú del médico"
      >
        <div className="h-full flex flex-col justify-between py-6 px-4">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <img src="/logo.png" alt="Logo Salud y Vida" className="h-12 w-12 rounded" />
              <h2 className="font-bold text-gray-900 text-xl">Salud y Vida</h2>
            </div>
            <nav className="flex flex-col gap-2">
              <SidebarLink icon="👤" label="Perfil" />
              <SidebarLink icon="📁" label="Expedientes" />
              <SidebarLink icon="📅" label="Agenda" active />
              <SidebarLink icon="📊" label="Reporte" />
              <SidebarLink icon="🧑‍🤝‍🧑" label="Pacientes" />
            </nav>
          </div>
          <div className="flex flex-col gap-2">
            <SidebarLink icon="⚙️" label="Ajustes" />
            <SidebarLink icon="🔍" label="Buscar" />
            <SidebarLink icon="❓" label="Ayuda" />
            <SidebarLink icon="🚪" label="Salir" />
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 min-w-0">
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
            <h1 className="text-2xl font-bold">Fernando Montalván — Médico Internista</h1>
            <div className="ml-auto flex items-center gap-3">
              <div className="relative">
                <button
                  onClick={onNotifClick}
                  className="rounded-md p-2 hover:bg-gray-200"
                  aria-label="Notificaciones"
                >
                  🔔
                </button>
                <span className="absolute -top-1 -right-1 text-[10px] px-1 rounded-full bg-blue-600 text-white">
                  3
                </span>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <input
                  className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="Buscar paciente o motivo…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && onSearch()}
                />
                <Btn variant="neutral" onClick={onSearch}>Buscar</Btn>
              </div>
              <Btn onClick={onExportAgenda}>Exportar agenda</Btn>
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* KPIs + “mini-charts” */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {KPIS.map((k) => (
              <Card key={k.label} className="p-5">
                <p className="text-sm text-gray-500">{k.label}</p>
                <p className="mt-1 text-2xl font-bold">{k.value}</p>
                {k.hint && <p className="text-xs text-gray-500 mt-1">{k.hint}</p>}
                {/* Barra simple de tendencia (decorativa) */}
                <div className="mt-4 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-2 bg-blue-500 rounded-full" style={{ width: "60%" }} />
                </div>
              </Card>
            ))}
          </div>

          {/* Panel de enfermedades (pastel decorativo) + Meta semanal */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title="Enfermedades virales (semana)">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-full bg-gray-200 relative overflow-hidden" aria-hidden>
                  <div className="absolute inset-0">
                    {/* “Semi-pastel” con CSS simple */}
                    <div className="absolute left-0 top-0 w-1/2 h-full bg-blue-500" />
                    <div className="absolute right-0 top-0 w-1/2 h-1/2 bg-gray-400" />
                  </div>
                </div>
                <div className="space-y-1 text-sm">
                  <p><span className="inline-block w-3 h-3 bg-blue-500 rounded-sm mr-2" />Covid — 60%</p>
                  <p><span className="inline-block w-3 h-3 bg-gray-400 rounded-sm mr-2" />Dengue — 40%</p>
                </div>
              </div>
            </Card>

            <Card title="Meta semanal de atenciones">
              <div className="w-full h-7 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-7 bg-blue-500 rounded-full" style={{ width: "40%" }} />
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span>40</span>
                <span>100</span>
              </div>
            </Card>
          </div>

          {/* Agenda del día */}
          <Card title="Agenda de hoy" right={<Pill tone="blue">{filteredAppts.length} citas</Pill>}>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="px-3 py-2 text-left font-semibold">Hora</th>
                    <th className="px-3 py-2 text-left font-semibold">Paciente</th>
                    <th className="px-3 py-2 text-left font-semibold">Motivo</th>
                    <th className="px-3 py-2 text-left font-semibold">Estado</th>
                    <th className="px-3 py-2 text-left font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredAppts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-3 py-6 text-center text-gray-500">
                        No hay citas que coincidan con la búsqueda.
                      </td>
                    </tr>
                  ) : (
                    filteredAppts.map((a) => (
                      <tr key={a.id} className="hover:bg-gray-50">
                        <td className="px-3 py-2">{a.hora}</td>
                        <td className="px-3 py-2">{a.paciente}</td>
                        <td className="px-3 py-2">{a.motivo}</td>
                        <td className="px-3 py-2"><StateBadge estado={a.estado} /></td>
                        <td className="px-3 py-2">
                          <button className="text-blue-700 hover:underline mr-3" onClick={() => alert("TODO: Abrir expediente")}>
                            Ver expediente
                          </button>
                          <button className="text-gray-700 hover:underline" onClick={() => alert("TODO: Reprogramar cita")}>
                            Reprogramar
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Documentos */}
          <Card title="Documentos" right={<Btn variant="neutral" size="sm" onClick={() => alert("TODO: Subir documento")}>Subir</Btn>}>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-100 text-gray-700">
                    <th className="px-3 py-2 text-left font-semibold">Nombre</th>
                    <th className="px-3 py-2 text-left font-semibold">Archivo</th>
                    <th className="px-3 py-2 text-left font-semibold">Categoría</th>
                    <th className="px-3 py-2 text-left font-semibold">Autor</th>
                    <th className="px-3 py-2 text-left font-semibold">Estado</th>
                    <th className="px-3 py-2 text-left font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {DOCS.map((d) => (
                    <tr key={d.id} className="hover:bg-gray-50">
                      <td className="px-3 py-2">{d.nombre}</td>
                      <td className="px-3 py-2">{d.file}</td>
                      <td className="px-3 py-2">{d.categoria}</td>
                      <td className="px-3 py-2">{d.autor}</td>
                      <td className="px-3 py-2"><DocBadge state={d.estado} /></td>
                      <td className="px-3 py-2">
                        <button className="text-blue-700 hover:underline mr-3" onClick={() => alert("TODO: Ver documento")}>
                          Ver
                        </button>
                        <button className="text-gray-700 hover:underline" onClick={() => alert("TODO: Compartir")}>
                          Compartir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DoctorsDashboard;
