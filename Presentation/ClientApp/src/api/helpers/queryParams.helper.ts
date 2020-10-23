export const getPaginatedQueryParameters = (
  pageNumber?: number,
  pageSize?: number
): string => {
  let queryParameters = "?";
  queryParameters += pageNumber ? `pageNumber=${pageNumber}&` : null;
  queryParameters += pageSize ? `pageSize=${pageSize}` : null;
  return queryParameters;
};
