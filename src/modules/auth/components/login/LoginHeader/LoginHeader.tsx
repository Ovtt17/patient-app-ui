import { Routes } from "@/shared/constants/routes";
import { NavLink } from "react-router-dom";

// ToDo: Add logo images
const LoginHeader = () => {
  return (
    <div>
      <NavLink target="_blank" className="inline-block" to={Routes.HOME}>
        <img className="w-60 h-25 object-contain hidden dark:block" alt="Logo" />
        <img className="w-60 h-25 object-contain dark:hidden" alt="Logo" />
      </NavLink>
      <h2 className="text-2xl font-bold sm:text-title-xl2">
        Iniciar Sesión
      </h2>
    </div>
  );
}

export default LoginHeader;