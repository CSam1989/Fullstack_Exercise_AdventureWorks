import { IPagination } from "./../../interfaces/Pagination";
import { CustomerApiFilterProps } from "./../customer.api";
export const getPaginatedQueryParameters = (
  paginationProps?: IPagination
): string => {
  let queryParameters = "?";

  if (paginationProps) {
    const { pageNumber, pageSize } = paginationProps;
    queryParameters += pageNumber ? `pageNumber=${pageNumber}&` : "";
    queryParameters += pageSize ? `pageSize=${pageSize}&` : "";
  }

  return queryParameters;
};

export const getCustomerFilterAndPaginatedQueryParameters = (
  paginationProps?: IPagination,
  filterProps?: CustomerApiFilterProps
): string => {
  let queryParameters = getPaginatedQueryParameters(paginationProps);

  if (filterProps) {
    const {
      firstName,
      lastName,
      accountNumber,
      sumTotalDue,
      mustSalesBeHigherThanSum,
    } = filterProps;

    queryParameters += `firstName=${firstName}&`;
    queryParameters += `lastName=${lastName}&`;
    queryParameters += `accountNumber=${accountNumber}&`;
    queryParameters += sumTotalDue
      ? `sumTotalDue=${sumTotalDue}&mustSalesBeHigherThanSum=${mustSalesBeHigherThanSum}`
      : "";
  }
  return queryParameters;
};
