import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import type { AppointmentFilter } from "../types/AppointmentFilter";
import { defaultAppointmentFilters } from "../constants/defaultAppointmentFilters";

interface AppointmentFiltersContextType {
  filters: AppointmentFilter;
  setFilters: Dispatch<SetStateAction<AppointmentFilter>>;
  resetFilters: () => void;
  updateFilters: (newFilters: Partial<AppointmentFilter>) => void;
}

const AppointmentFiltersContext = createContext<AppointmentFiltersContextType | undefined>(undefined);

export const AppointmentFiltersProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<AppointmentFilter>(defaultAppointmentFilters);
  const resetFilters = () => setFilters(defaultAppointmentFilters);

  const updateFilters = (newFilters: Partial<AppointmentFilter>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  }

  return (
    <AppointmentFiltersContext.Provider value={{ filters, setFilters, resetFilters, updateFilters }}>
      {children}
    </AppointmentFiltersContext.Provider>
  );
}

export const useAppointmentFilters = (): AppointmentFiltersContextType => {
  const context = useContext(AppointmentFiltersContext);
  if (!context) {
    throw new Error("useAppointmentFilters must be used within an AppointmentFiltersProvider");
  }
  return context;
}