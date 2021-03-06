import { DataTypeProvider } from "@devexpress/dx-react-grid";
import React from "react";

const CurrencyFormatter = ({ value }: any) => (
  <span>
    {value.toLocaleString("nl-NL", { style: "currency", currency: "EUR" })}
  </span>
);

export const CurrencyTypeProvider = (props: any) => (
  <DataTypeProvider formatterComponent={CurrencyFormatter} {...props} />
);
