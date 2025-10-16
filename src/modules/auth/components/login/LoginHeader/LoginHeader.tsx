import { Routes } from "@/shared/constants/routes";
import { NavLink } from "react-router-dom";

const LoginHeader = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-4">
      <NavLink target="_blank" className="inline-block" to={Routes.HOME}>
        <img
          src="/logo.png"
          className="w-60 h-25 object-contain"
          alt="Logo"
        />
      </NavLink>
      <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight font-serif text-blue-600">
        Iniciar Sesión
      </h2>
    </div>
  );
};

export default LoginHeader;
