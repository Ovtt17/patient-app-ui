import React, { useEffect, useMemo, useState } from "react";

/* ===================== Tipos ===================== */
type Severity = "info" | "warn" | "critical";
type ChronicCode = "hta" | "dm" | "renal" | "asma" | "otro";

interface Patient {
  id: string;
  nombre: string;
  email: string;
  telefonoEmergencia: string;
  contactoEmergencia: string; // relación
}

interface ChronicCondition {
  code: ChronicCode;
  label: string;
  value: string; // p.ej. "Alta", "Tipo 2", "-"
}

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  createdAt: string; // ISO
  severity: Severity;
  read: boolean;
}

interface AppointmentPreview {
  id: string;
  fechaISO: string;
  especialidad: string;
  medico: string;
  estado: "confirmada" | "pendiente" | "cancelada";
}

/* ===================== UI Utils ===================== */
const Card: React.FC<{
  title?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}> = ({ title, right, children, className = "" }) => (
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

const Button: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "neutral" | "danger";
    size?: "sm" | "md";
  }
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
      className={`inline-flex items-center gap-2 rounded-md font-medium shadow-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${v} ${s} ${className}`}
    />
  );
};

const Pill: React.FC<{ children: React.ReactNode; tone?: "blue" | "green" | "gray" | "yellow" }> = ({
  children,
  tone = "gray",
}) => {
  const tones: Record<string, string> = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    gray: "bg-gray-100 text-gray-700",
    yellow: "bg-yellow-50 text-yellow-700",
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${tones[tone]}`}>{children}</span>;
};

const StatusBadge: React.FC<{ estado: AppointmentPreview["estado"] }> = ({ estado }) => {
  const map = {
    confirmada: <Pill tone="green">Confirmada</Pill>,
    pendiente: <Pill tone="yellow">Pendiente</Pill>,
    cancelada: <Pill tone="gray">Cancelada</Pill>,
  };
  return map[estado];
};

const Row: React.FC<{ label: string; value: React.ReactNode; action?: React.ReactNode }> = ({
  label,
  value,
  action,
}) => (
  <div className="mb-4">
    <span className="block font-semibold text-gray-700">{label}</span>
    <div className="border-b border-gray-200 py-1 flex items-center justify-between gap-3">
      <div className="text-gray-900">{value}</div>
      {action}
    </div>
  </div>
);

/* ===================== Datos Mock (quitar al conectar API) ===================== */
const mockPatient: Patient = {
  id: "p1",
  nombre: "Emilio Fuentes",
  email: "emilio123@gmail.com",
  telefonoEmergencia: "7878-2532",
  contactoEmergencia: "Lucía (Hija)",
};

const mockConditions: ChronicCondition[] = [
  { code: "hta", label: "Presión Arterial", value: "Alta" },
  { code: "dm", label: "Diabetes", value: "Tipo 2" },
  { code: "renal", label: "Insuficiencia Renal", value: "-" },
];

const mockNotifs: NotificationItem[] = [
  {
    id: "n1",
    title: "Confirmación de cita",
    message: "Tu cita con Cardiología fue confirmada para el 2025-10-03 09:30.",
    createdAt: new Date().toISOString(),
    severity: "info",
    read: false,
  },
  {
    id: "n2",
    title: "Recordatorio",
    message: "Recuerda llegar 10 minutos antes.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    severity: "warn",
    read: true,
  },
];

const mockAppts: AppointmentPreview[] = [
  {
    id: "a1",
    fechaISO: "2025-10-03T09:30:00",
    especialidad: "Cardiología",
    medico: "Dr. Juan Pérez",
    estado: "confirmada",
  },
  {
    id: "a2",
    fechaISO: "2025-10-15T14:00:00",
    especialidad: "Medicina General",
    medico: "Dra. Ana Ruiz",
    estado: "pendiente",
  },
];

/* ===================== Página ===================== */
const PatientDashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Estado
  const [patient, setPatient] = useState<Patient | null>(null);
  const [conditions, setConditions] = useState<ChronicCondition[]>([]);
  const [notifs, setNotifs] = useState<NotificationItem[]>([]);
  const [appts, setAppts] = useState<AppointmentPreview[]>([]);

  // Simulación de carga (conecta aquí tu API)
  useEffect(() => {
    const t = setTimeout(() => {
      setPatient(mockPatient);
      setConditions(mockConditions);
      setNotifs(mockNotifs);
      setAppts(mockAppts);
      setLoading(false);
    }, 300);
    return () => clearTimeout(t);
  }, []);

  const unread = useMemo(() => notifs.filter((n) => !n.read).length, [notifs]);

  /* ---------- Acciones ---------- */
  const openNewAppointment = () => {
    // TODO: abrir modal / navegar / wizard de cita
    alert("TODO: Nueva Cita");
  };

  const markAllRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const updateEmergency = () => {
    // TODO: abrir modal de actualización de contacto de emergencia
    alert("TODO: Actualizar contacto de emergencia");
  };

  /* ---------- Render ---------- */
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 flex">
      {/* Sidebar */}
      <aside
        className={`fixed z-40 inset-y-0 left-0 w-72 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-out
        lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        aria-label="Barra lateral de navegación del paciente"
      >
        <div className="h-full flex flex-col py-6 px-4">
          <div className="flex items-center gap-3 mb-8">
            <img src="/logo.png" alt="Logo Salud y Vida" className="h-10 w-10 rounded" />
            <h2 className="font-bold text-xl">Salud y Vida</h2>
          </div>
          <nav className="flex flex-col gap-2">
            {[
              { icon: "👤", label: "Perfil" },
              { icon: "🔔", label: "Notificaciones" },
              { icon: "📁", label: "Expediente" },
              { icon: "📅", label: "Citas" },
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
          <div className="mt-auto pt-6 text-xs text-gray-500">v1.0 • Patient</div>
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
            <h1 className="text-2xl font-bold">
              {patient ? `${patient.nombre} — Paciente` : "Paciente"}
            </h1>
            <div className="ml-auto flex items-center gap-3">
              <button className="relative rounded-md p-2 hover:bg-gray-200" aria-label="Notificaciones">
                <span className="text-xl">🔔</span>
                {unread > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center">
                    {unread}
                  </span>
                )}
              </button>
              <div className="rounded-full bg-gray-200 w-9 h-9 grid place-items-center" aria-hidden>
                👤
              </div>
              <Button onClick={openNewAppointment}>➕ Nueva Cita</Button>
            </div>
          </div>
        </header>

        {/* Body */}
        <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-8">
          {/* Perfil */}
          <Card title="Datos principales">
            {loading || !patient ? (
              <p className="text-gray-500">Cargando perfil…</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Row label="Nombre" value={patient.nombre} />
                  <Row label="Email" value={patient.email} />
                  <Row
                    label="Emergencia — llamar a"
                    value={
                      <span>
                        {patient.telefonoEmergencia} — {patient.contactoEmergencia}
                      </span>
                    }
                    action={
                      <Button variant="neutral" size="sm" onClick={updateEmergency}>
                        Actualizar
                      </Button>
                    }
                  />
                </div>
              </div>
            )}
          </Card>

          {/* Próximas citas */}
          <Card
            title="Próximas citas"
            right={<Button variant="neutral" size="sm" onClick={openNewAppointment}>Agendar</Button>}
          >
            {loading ? (
              <p className="text-gray-500">Cargando citas…</p>
            ) : appts.length === 0 ? (
              <p className="text-gray-500">No tienes citas programadas.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700">
                      <th className="px-3 py-2 text-left font-semibold">Fecha y hora</th>
                      <th className="px-3 py-2 text-left font-semibold">Especialidad</th>
                      <th className="px-3 py-2 text-left font-semibold">Médico</th>
                      <th className="px-3 py-2 text-left font-semibold">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {appts.map((a) => (
                      <tr key={a.id} className="hover:bg-gray-50">
                        <td className="px-3 py-2">
                          {new Date(a.fechaISO).toLocaleString()}
                        </td>
                        <td className="px-3 py-2">{a.especialidad}</td>
                        <td className="px-3 py-2">{a.medico}</td>
                        <td className="px-3 py-2"><StatusBadge estado={a.estado} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>

          {/* Notificaciones */}
          <Card
            title="Notificaciones"
            right={
              <Button variant="neutral" size="sm" onClick={markAllRead}>
                Marcar todas como leídas
              </Button>
            }
          >
            {loading ? (
              <p className="text-gray-500">Cargando notificaciones…</p>
            ) : notifs.length === 0 ? (
              <p className="text-gray-500">No tienes notificaciones.</p>
            ) : (
              <ul className="space-y-3">
                {notifs.map((n) => (
                  <li
                    key={n.id}
                    className="rounded-lg border border-gray-200 p-3 flex items-start gap-3"
                    aria-live="polite"
                  >
                    <span aria-hidden className="text-lg">
                      {n.severity === "critical" ? "⛔" : n.severity === "warn" ? "⚠️" : "ℹ️"}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{n.title}</p>
                        {!n.read && <Pill tone="blue">Nuevo</Pill>}
                      </div>
                      <p className="text-sm text-gray-700">{n.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(n.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>

          {/* Expediente / Enfermedades crónicas */}
          <Card title="Enfermedades crónicas">
            {loading ? (
              <p className="text-gray-500">Cargando expediente…</p>
            ) : conditions.length === 0 ? (
              <p className="text-gray-500">No hay condiciones registradas.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {conditions.map((c) => (
                  <div key={c.code} className="rounded-lg border border-gray-200 p-4">
                    <p className="text-sm text-gray-500">{c.label}</p>
                    <p className="mt-1 font-semibold">{c.value}</p>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;
