import { useState, type ReactNode } from "react";
import { useAuth } from "../context/auth/useAuth";
import DefaultToastifyContainer from "../components/DefaultToastifyContainer/DefaultToastifyContainer";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar/Sidebar";

const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  //Usuario NO autenticado -> solo renderizar el contenido sin layout
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        <DefaultToastifyContainer />
        <main className="relative w-full min-h-screen overflow-y-auto">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <DefaultToastifyContainer />

      {/* Sidebar lateral */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/*Contenedor principal */}
      <div
        id="layout-scroll-container"
        className="relative h-screen flex flex-1 flex-col overflow-y-auto overflow-x-hidden"
      >
        {/* Header */}
        <Header
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Contenido */}
        <main className="relative w-full flex-1 md:h-[calc(100vh-10%)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
