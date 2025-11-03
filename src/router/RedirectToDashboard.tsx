import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/shared/context/auth/useAuth";
import { Routes as ROUTES } from "@/shared/constants/routes";
import { RoutesAdmin } from "@/modules/admin/routes/RoutesAdmin";
import { RoutesDoctor } from "@/modules/doctors/routes/RoutesDoctor";
import Loader from "@/shared/components/Loader/Loader";

const RedirectToDashboard = () => {
  const navigate = useNavigate();
  const { loading, user, isUserAdmin, isUserDoctor } = useAuth();

  useEffect(() => {
    if (loading) return; // Espera a que cargue el user

    if (!user) {
      navigate(ROUTES.LOGIN, { replace: true });
      return;
    }

    // Redirige según rol
    if (isUserAdmin) {
      navigate(RoutesAdmin.ADMIN_DASHBOARD, { replace: true });
    } else if (isUserDoctor) {
      navigate(RoutesDoctor.DOCTOR_DASHBOARD, { replace: true });
    } else {
      navigate(ROUTES.APPOINTMENTS, { replace: true });
    }
  }, [loading, user, isUserAdmin, isUserDoctor, navigate]);

  if (loading) return <Loader />;

  return null;
};

export default RedirectToDashboard;