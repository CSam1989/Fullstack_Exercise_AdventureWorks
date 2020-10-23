import React, { useState } from "react";
import { PagingState, IntegratedPaging } from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
} from "@devexpress/dx-react-grid-material-ui";
import { CurrencyTypeProvider } from "./CurrencyType.provider";

import "./Tablegrid.styles.scss";

export interface TablegridProps {
  columns: any[];
  rows: any[];
  tableColumnExtensions?: any;
  currencyColumns?: any;
}

const Tablegrid = ({
  rows,
  columns,
  tableColumnExtensions,
  currencyColumns,
}: TablegridProps) => {
  return (
    <div className="table-grid">
      <Grid rows={rows} columns={columns}>
        {currencyColumns ? (
          <CurrencyTypeProvider for={currencyColumns} />
        ) : null}
        <PagingState defaultCurrentPage={0} pageSize={50} />
        <IntegratedPaging />
        <Table
          columnExtensions={
            tableColumnExtensions ? tableColumnExtensions : null
          }
        />
        <TableHeaderRow />
        <PagingPanel />
      </Grid>
    </div>
  );
};

export default Tablegrid;
