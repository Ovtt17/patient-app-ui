import { Routes } from "@/shared/constants/routes";
import { NavLink } from "react-router-dom";

const LoginHeader = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-4">
      <NavLink target="_blank" className="inline-block" to={Routes.HOME}>
        <img
          src="/LogoD.png"
          className="w-60 h-25 object-contain hidden dark:block"
          alt="Logo"
        />
        <img
          src="/logo.png"
          className="w-60 h-25 object-contain dark:hidden"
          alt="Logo"
        />
      </NavLink>
      <h2 className="text-2xl font-bold sm:text-title-xl2">
        Iniciar Sesión
      </h2>
    </div>
  );
};

export default LoginHeader;
