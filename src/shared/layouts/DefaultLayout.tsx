import { useState, type ReactNode } from "react";
import { useAuth } from "../context/auth/useAuth";
import DefaultToastifyContainer from "../components/DefaultToastifyContainer/DefaultToastifyContainer";
import Header from "../components/Header";


const DefaultLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <DefaultToastifyContainer />
      <div className="flex h-screen overflow-hidden">
        <div
          id="layout-scroll-container"
          className="relative  h-screen flex flex-1 flex-col overflow-y-auto overflow-x-hidden"
        >
          {isAuthenticated && <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
          <main className={`relative w-full h-screen md:h-[calc(100vh-10%)] ${isAuthenticated ? 'p-4 sm:p-4 md:p-6' : ''}`}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}

export default DefaultLayout;