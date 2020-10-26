import { DataTypeProvider, Filter } from "@devexpress/dx-react-grid";
import React from "react";

import { CustomerApiFilterProps } from "../../api/customer.api";

export const FilterProvider = (props: any) => {
  return (
    <DataTypeProvider
      for={props.columns}
      availableFilterOperations={props.filterOperations}
    />
  );
};

export const SetGridFilterToReduxFilter = (
  gridFilters: Filter[],
  filters: CustomerApiFilterProps,
  currencyColumns: string[]
): CustomerApiFilterProps => {
  gridFilters.map((filter) => {
    filters[filter.columnName] = filter.value;

    if (currencyColumns.includes(filter.columnName)) {
      filters.mustSalesBeHigherThanSum = false;
      if (filter.operation === "greaterThan")
        filters.mustSalesBeHigherThanSum = true;
    }
  });
  return filters;
};

export const SetReduxFilterToGridFilter = (
  filters: CustomerApiFilterProps,
  currencyColumns: string[]
): Filter[] => {
  const gridFilters: Filter[] = [];
  const operation = filters.mustSalesBeHigherThanSum
    ? "greaterThan"
    : "lessThanOrEqual";
  (Object.keys(filters) as Array<keyof CustomerApiFilterProps>).map((key) => {
    gridFilters.push({
      columnName: key.toString(),
      value: filters[key],
      operation: currencyColumns.includes(key.toString())
        ? operation
        : undefined,
    });
  });

  return gridFilters;
};
