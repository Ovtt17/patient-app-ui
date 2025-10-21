import type { FC } from "react";
import { UserGroupIcon, UserIcon, CalendarDaysIcon, ClockIcon } from "@heroicons/react/24/outline";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from "recharts";
import PageHeader from "@/shared/components/Header/PageHeader";

export const AdminDashboard: FC = () => {
  // Estadísticas
  const stats = [
    { title: "Pacientes", value: 124, icon: UserGroupIcon, color: "blue" },
    { title: "Doctores", value: 32, icon: UserIcon, color: "green" },
    { title: "Citas Totales", value: 78, icon: CalendarDaysIcon, color: "purple" },
    { title: "Citas Pendientes", value: 12, icon: ClockIcon, color: "yellow" },
  ];

  // Datos de gráficas
  const appointmentsData = [
    { day: "Lun", total: 5 },
    { day: "Mar", total: 8 },
    { day: "Mié", total: 6 },
    { day: "Jue", total: 10 },
    { day: "Vie", total: 4 },
  ];

  const specialtiesData = [
    { name: "Cardiología", value: 5 },
    { name: "Pediatría", value: 8 },
    { name: "Dermatología", value: 4 },
    { name: "Neurología", value: 3 },
  ];

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50"];

  return (
    <section className="p-6 max-w-7xl mx-auto space-y-8">
      <PageHeader title="Dashboard Administrativo" />
      {/* Estadísticas */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className={`bg-${stat.color}-50 hover:bg-${stat.color}-100 transition rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer`}
          >
            <stat.icon className={`w-10 h-10 text-${stat.color}-600 mb-4`} />
            <span className={`text-2xl font-bold text-${stat.color}-700`}>{stat.value}</span>
            <span className="text-gray-700 mt-1">{stat.title}</span>
          </div>
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Citas por día (BarChart) */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Citas por Día</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={appointmentsData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#6366f1" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Especialidades (PieChart) */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Distribución por Especialidad</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={specialtiesData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {specialtiesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
};
