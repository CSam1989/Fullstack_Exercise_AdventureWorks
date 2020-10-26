import { CustomerApiProps } from "./../customer.api";
export const getPaginatedQueryParameters = (
  pageNumber?: number,
  pageSize?: number
): string => {
  let queryParameters = "?";
  queryParameters += pageNumber ? `pageNumber=${pageNumber}&` : null;
  queryParameters += pageSize ? `pageSize=${pageSize}&` : null;
  return queryParameters;
};

export const getCustomerFilterAndPaginatedQueryParameters = (
  queryProps?: CustomerApiProps
): string => {
  if (!queryProps) return "";

  let queryParameters = getPaginatedQueryParameters(
    queryProps.pageNumber,
    queryProps.pageSize
  );

  const {
    firstName,
    lastName,
    accountNumber,
    sales,
    mustSalesBeHigherThanSum,
  } = queryProps;

  queryParameters += firstName ? `firstName=${firstName}&` : null;
  queryParameters += lastName ? `lastName=${lastName}&` : null;
  queryParameters += accountNumber ? `accountNumber=${accountNumber}&` : null;
  queryParameters += sales
    ? `sales=${sales}&mustSalesBeHigherThanSum=${mustSalesBeHigherThanSum}`
    : null;

  return queryParameters;
};
