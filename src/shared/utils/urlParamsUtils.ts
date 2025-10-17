export const initializePaginationParams = (
  params: URLSearchParams,
  prefix: string = "",
  size: number = 10
) => {
  const getKey = (key: string) => (prefix ? `${key}_${prefix}` : key);

  if (!params.get(getKey("page"))) {
    params.set(getKey("page"), "1");
  }
  if (!params.get(getKey("size"))) {
    params.set(getKey("size"), size.toString());
  }
  if (!params.get(getKey("sortBy"))) {
    params.set(getKey("sortBy"), "createdDate");
  }
  if (!params.get(getKey("sortOrder"))) {
    params.set(getKey("sortOrder"), "desc");
  }

  return params;
};