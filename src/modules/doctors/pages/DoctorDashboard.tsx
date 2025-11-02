import type { FC } from 'react';
import ErrorDisplay from '@/modules/errors/components/ErrorDisplay';
import { StatCard } from '@/shared/components/Dashboard/StatCard';
import PageHeader from '@/shared/components/Header/PageHeader';
import { UserGroupIcon, CalendarDaysIcon, ClockIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { MonthlyAppointmentsChart } from '@/shared/components/Dashboard/MonthlyAppointmentsChart';
import { RecentAppointmentsList } from '@/shared/components/Dashboard/RecentAppointmentsList';
import { useFetchDoctorDashboard } from '../hooks/useFetchDoctorDashboard';

const DoctorDashboard: FC = () => {
  const { dashboard, loading, errors } = useFetchDoctorDashboard();

  if (loading) return <p>Cargando...</p>;
  if (!dashboard) return <p>No hay datos disponibles.</p>;

  const stats: { title: string; value: number; icon: FC<{ className?: string }>; gradient: [string, string] }[] = [
    { title: "Pacientes", value: dashboard.totalPatients, icon: UserGroupIcon, gradient: ["#6EE7B7", "#34D399"] },
    { title: "Citas Totales", value: dashboard.totalAppointments, icon: CalendarDaysIcon, gradient: ["#F472B6", "#EC4899"] },
    { title: "Completadas", value: dashboard.totalCompletedAppointments, icon: ClockIcon, gradient: ["#FACC15", "#EAB308"] },
    { title: "Canceladas", value: dashboard.totalCancelledAppointments, icon: XMarkIcon, gradient: ["#F87171", "#EF4444"] },
  ];

  return (
    <section className="space-y-8 pb-6">
      <PageHeader title="Dashboard del Doctor" />
      {errors && <ErrorDisplay errors={errors} />}

      {/* Estadísticas */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(stat => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            gradient={stat.gradient}
          />
        ))}
      </div>

      {/* Gráfico de citas mensuales */}
      <div className="grid lg:grid-cols-1 gap-6">
        <MonthlyAppointmentsChart monthlyData={dashboard.monthlyAppointments} />
      </div>

      {/* Citas recientes */}
      <div className="grid lg:grid-cols-1 gap-6">
        <RecentAppointmentsList appointments={dashboard.recentAppointments} />
      </div>
    </section>
  );
}

export default DoctorDashboard;