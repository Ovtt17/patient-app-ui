import Loader from "@/shared/components/Loader/Loader";
import { Routes } from "@/shared/constants/routes";
import { lazy, Suspense } from "react";
import type { RouteObject } from "react-router-dom";

const MedicalRecord = lazy(() => import("../pages/MedicalRecord"));

const medicalRecordRoutes: RouteObject[] = [
  {
    path: Routes.MEDICAL_RECORDS,
    element: (
      <Suspense fallback={<Loader />}>
        <MedicalRecord />
      </Suspense>
    )
  }
];

export default medicalRecordRoutes;