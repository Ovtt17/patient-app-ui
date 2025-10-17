import { useSearchParams } from "react-router-dom";

export const usePagination = (prefix = "") => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getKey = (key: string) => (prefix ? `${key}_${prefix}` : key);

  const page = Number(searchParams.get(getKey("page"))) || 1;
  const size = Number(searchParams.get(getKey("size"))) || 10;

  const setPagination = (newPage: number, newSize: number) => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set(getKey("page"), newPage.toString());
    updatedParams.set(getKey("size"), newSize.toString());
    setSearchParams(updatedParams);
  };

  return { page, size, setPagination };
};
