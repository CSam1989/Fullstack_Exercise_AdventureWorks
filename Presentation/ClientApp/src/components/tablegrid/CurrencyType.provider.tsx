import { DataTypeProvider } from "@devexpress/dx-react-grid";
import React, { useState } from "react";

export const FilterProvider = (props: any) => {
  return (
    <DataTypeProvider
      for={props.columns}
      availableFilterOperations={props.filterOperations}
    />
  );
};

const CurrencyFormatter = ({ value }: any) => (
  <span>
    {value.toLocaleString("nl-NL", { style: "currency", currency: "EUR" })}
  </span>
);

export const CurrencyTypeProvider = (props: any) => (
  <DataTypeProvider formatterComponent={CurrencyFormatter} {...props} />
);
