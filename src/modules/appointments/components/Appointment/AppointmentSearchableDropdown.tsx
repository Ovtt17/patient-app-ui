import { type FC, useState, useMemo, useRef, useEffect } from "react";
import { X, ChevronsUpDown } from "lucide-react";

interface Option {
  id: string;
  name: string;
}

interface Props {
  label: string;
  options: Option[];
  selected: string | null;
  onSelect: (id: string | null) => void;
  placeholder?: string;
}

const AppointmentSearchableDropdown: FC<Props> = ({
  label,
  options,
  selected,
  onSelect,
  placeholder = "Seleccione...",
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredOptions = useMemo(() => {
    return options.filter((opt) =>
      opt.name.toLowerCase().includes(query.toLowerCase())
    );
  }, [options, query]);

  const selectedOption = useMemo(
    () => options.find((o) => o.id === selected) || null,
    [selected, options]
  );

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="
          w-full flex justify-between items-center px-4 py-3
          bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
          border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm
          hover:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400
          transition-colors
        "
      >
        <span className="truncate">{selectedOption ? selectedOption.name : placeholder}</span>

        <div className="flex items-center gap-2">
          {selectedOption && (
            <button
              onClick={(e) => {
                e.stopPropagation(); // evita abrir/cerrar dropdown
                onSelect(null);
              }}
              className="
                p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200
                transition-colors rounded
              "
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <ChevronsUpDown className="w-5 h-5 text-gray-400" />
        </div>
      </button>

      {open && (
        <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Buscar ${label.toLowerCase()}...`}
            className="
              w-full px-4 py-2 text-gray-900 dark:text-gray-100
              bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700
              focus:outline-none focus:ring-2 focus:ring-indigo-400
            "
          />
          <ul className="max-h-60 overflow-auto">
            {filteredOptions.length === 0 ? (
              <li className="px-4 py-2 text-gray-500 dark:text-gray-400 text-sm">
                No se encontraron opciones
              </li>
            ) : (
              filteredOptions.map((opt) => (
                <li
                  key={opt.id}
                  onClick={() => {
                    onSelect(opt.id);
                    setOpen(false);
                    setQuery("");
                  }}
                  className={`
                    px-4 py-2 cursor-pointer text-gray-900 dark:text-gray-100 text-sm
                    hover:bg-indigo-100 dark:hover:bg-indigo-700 rounded
                    ${selected === opt.id ? "font-semibold bg-indigo-50 dark:bg-indigo-800" : ""}
                  `}
                >
                  {opt.name}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AppointmentSearchableDropdown;