import { type FC } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "@/shared/context/auth/useAuth";
import Sidebar from "../Sidebar/Sidebar";
import adminMenuItems from "@/modules/admin/components/Sidebar/adminMenuItems";
import doctorMenuItems from "@/modules/doctors/components/Sidebar/doctorMenuItems";
import patientMenuItems from "@/modules/patient/components/Sidebar/patientMenuItems";
import type { SidebarMenuItem } from "@/shared/types/sidebar-menu-item";

interface SidebarContainerProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

/**
 * SidebarContainer
 * Determina qué sidebar mostrar según el rol del usuario.
 * Usa Framer Motion para animar entrada/salida.
 */
const SidebarContainer: FC<SidebarContainerProps> = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  const { user } = useAuth();

  if (!user) return null;

  // Buscar el primer rol válido del usuario
  const role = user.roles?.find(
    (r) => r === "ADMIN" || r === "DOCTOR" || r === "PACIENTE"
  );

  let menuItems: SidebarMenuItem[] = [];

  switch (role) {
    case "ADMIN":
      menuItems = adminMenuItems;
      break;
    case "DOCTOR":
      menuItems = doctorMenuItems;
      break;
    case "PACIENTE":
      menuItems = patientMenuItems;
      break;
    default:
      menuItems = [];
      break;
  }

  return (
    <>
      {/* Overlay para móviles */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSidebarOpen(false)}
            // 🧩 FIX: pointer-events controlado, evita bloquear clics fuera
            className={`fixed inset-0 z-40 bg-black/60 md:hidden ${
              sidebarOpen ? "pointer-events-auto" : "pointer-events-none"
            }`}
          />
        )}
      </AnimatePresence>

      {/* Sidebar animado (móvil) */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            key="sidebar"
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed z-50 inset-y-0 left-0 w-64 bg-white dark:bg-gray-900 
                       border-r border-gray-200 dark:border-gray-700 
                       shadow-lg flex flex-col md:static md:translate-x-0"
          >
            <Sidebar
              menuItems={menuItems}
              sidebarOpen={sidebarOpen}
              setSidebarOpen={setSidebarOpen}
            />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Sidebar fijo (escritorio) */}
      <aside
        className="hidden md:flex md:flex-col md:w-64 bg-white dark:bg-gray-900
                   border-r border-gray-200 dark:border-gray-700 shadow-lg"
      >
        <Sidebar
          menuItems={menuItems}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </aside>
    </>
  );
};

export default SidebarContainer;
