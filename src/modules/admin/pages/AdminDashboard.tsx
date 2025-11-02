import { type FC } from "react";
import { UserGroupIcon, UserIcon, CalendarDaysIcon, ClockIcon, XMarkIcon } from "@heroicons/react/24/outline";
import PageHeader from "@/shared/components/Header/PageHeader";
import { useFetchAdminDashboard } from "../hooks/useFetchAdminDashboard";
import ErrorDisplay from "@/modules/errors/components/ErrorDisplay";
import { StatCard } from "../components/dashboard/StatCard";
import { PieChartCard } from "../components/dashboard/PieChartCard";
import { TopDoctorsList } from "../components/dashboard/TopDoctorsList";
import { RecentAppointmentsList } from "../components/dashboard/RecentAppointmentsList";
import { MonthlyAppointmentsChart } from "../components/dashboard/MonthlyAppointmentsChart";

export const AdminDashboard: FC = () => {
  const { dashboard, loading, errors } = useFetchAdminDashboard();

  if (loading) return <p>Cargando...</p>;
  if (!dashboard) return <p>No hay datos disponibles.</p>;

  const stats: { title: string; value: number; icon: FC<{ className?: string }>; gradient: [string, string] }[] = [
    { title: "Pacientes", value: dashboard.totalPatients, icon: UserGroupIcon, gradient: ["#6EE7B7", "#34D399"] },
    { title: "Doctores", value: dashboard.totalDoctors, icon: UserIcon, gradient: ["#60A5FA", "#3B82F6"] },
    { title: "Citas Totales", value: dashboard.totalAppointments, icon: CalendarDaysIcon, gradient: ["#F472B6", "#EC4899"] },
    { title: "Citas Completadas", value: dashboard.totalCompletedAppointments, icon: ClockIcon, gradient: ["#FACC15", "#EAB308"] },
    { title: "Citas Canceladas", value: dashboard.totalCancelledAppointments, icon: XMarkIcon, gradient: ["#F87171", "#EF4444"] },
  ];

  return (
    <section className="space-y-8 pb-6">
      <PageHeader title="Dashboard Administrativo" />
      {errors && <ErrorDisplay errors={errors} />}

      {/* Estadísticas */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map(stat => (
          <StatCard key={stat.title} title={stat.title} value={stat.value} icon={stat.icon} gradient={stat.gradient} />
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid lg:grid-cols-2 gap-6">
        <MonthlyAppointmentsChart monthlyData={dashboard.monthlyAppointments} />
        <PieChartCard title="Distribución por Especialidad" data={dashboard.specialtiesDistribution} />
      </div>

      {/* Listados */}
      <div className="grid lg:grid-cols-2 gap-6">
        <TopDoctorsList doctors={dashboard.topActiveDoctors} />
        <RecentAppointmentsList appointments={dashboard.recentAppointments} />
      </div>
    </section>
  );
};