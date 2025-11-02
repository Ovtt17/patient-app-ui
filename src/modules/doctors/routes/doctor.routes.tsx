import { Navigate, type RouteObject } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "@/shared/components/Loader/Loader";
import { RoutesDoctor } from './RoutesDoctor';
import DoctorDashboard from "../pages/DoctorDashboard";

const Specialty = lazy(() => import("@/modules/doctors/pages/Specialty"));
const ScheduleCreate = lazy(() => import("../pages/ScheduleCreate"));
const Patient = lazy(() => import("@/modules/patient/pages/Patient"));
const PatientCreate = lazy(() => import("@/modules/patient/pages/PatientCreate"));
const Schedule = lazy(() => import("@/modules/doctors/pages/Schedule"));

const doctorRoutes: RouteObject[] = [
	{
		path: "/",
		element: <Navigate to={RoutesDoctor.DOCTOR_DASHBOARD} replace />,
	},
	{
		path: '/doctor',
		element: <Navigate to={RoutesDoctor.DOCTOR_DASHBOARD} replace />,
	},
	{
		path: RoutesDoctor.DOCTOR_DASHBOARD,
		element: <DoctorDashboard />,
	},
	{
		path: RoutesDoctor.DOCTOR_SPECIALTIES,
		element: (
			<Suspense fallback={<Loader />}>
				<Specialty />
			</Suspense>
		),
	},
	{
		path: RoutesDoctor.DOCTOR_PATIENTS,
		element: (
			<Suspense fallback={<Loader />}>
				<Patient />
			</Suspense>
		),
	},
	{
		path: RoutesDoctor.DOCTOR_PATIENTS_CREATE,
		element: (
			<Suspense fallback={<Loader />}>
				<PatientCreate />
			</Suspense>
		),
	},
	{
		path: RoutesDoctor.DOCTOR_SCHEDULES,
		element: (
			<Suspense fallback={<Loader />}>
				<Schedule />
			</Suspense>
		),
	},
	{
		path: RoutesDoctor.DOCTOR_SCHEDULES_CREATE,
		element: (
			<Suspense fallback={<Loader />}>
				<ScheduleCreate />
			</Suspense>
		),
	},
];

export default doctorRoutes;
