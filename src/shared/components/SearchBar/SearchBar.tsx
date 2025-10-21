import useDebounce from "@/shared/hooks/useDebounce";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { type FC, useState, useEffect } from "react";

interface SearchBarProps {
  filtering?: string;
  setFiltering: (value: string) => void;
  placeholder?: string;
}

const SearchBar: FC<SearchBarProps> = ({ filtering, setFiltering, placeholder = 'Buscar...' }) => {
  const [localFiltering, setLocalFiltering] = useState(filtering || "");
  const debouncedSetFiltering = useDebounce(setFiltering, 500);

  useEffect(() => {
    debouncedSetFiltering(localFiltering);
  }, [localFiltering, debouncedSetFiltering]);

  return (
    <section className="flex items-center justify-center mb-4">
      <div className="relative w-full max-w-lg">
        <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-gray-400" />
        <input
          type="text"
          placeholder={placeholder}
          value={localFiltering}
          onChange={(e) => setLocalFiltering(e.target.value)}
          className="w-full rounded-xl border border-gray-300 bg-white py-2 pl-10 pr-12 text-sm text-gray-900 shadow-md outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
        />
        {localFiltering && (
          <button
            onClick={() => {
              setLocalFiltering("");
              setFiltering("");
              (document.querySelector('input[type="text"]') as HTMLInputElement)?.focus();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    </section>
  );
};

export default SearchBar;