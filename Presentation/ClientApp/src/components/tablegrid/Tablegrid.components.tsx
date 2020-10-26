import React, { useState } from "react";
import {
  PagingState,
  CustomPaging,
  FilteringState,
  IntegratedFiltering,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  Table,
  TableHeaderRow,
  TableFilterRow,
  PagingPanel,
} from "@devexpress/dx-react-grid-material-ui";
import { CurrencyTypeProvider, FilterProvider } from "./CurrencyType.provider";

import "./Tablegrid.styles.scss";
import { IPagination } from "../../interfaces/Pagination";

export interface TablegridProps {
  columns: any[];
  rows: any[];
  tableColumnExtensions?: any;
  currencyColumns?: any;
  pagination: IPagination;
  onPagingchange(pageNumber: number): void;
  onPageSizechange(pageSize: number): void;
}

const Tablegrid = ({
  rows,
  columns,
  tableColumnExtensions,
  currencyColumns,
  pagination,
  onPagingchange,
  onPageSizechange,
}: TablegridProps) => {
  const [pageSizes] = useState([50, 100, 250]);
  const [currencyFilterOperations] = useState([
    "greaterThan",
    "lessThanOrEqual",
  ]);
  const [otherFilterOperations] = useState([]);
  const [otherColumns] = useState(["firstName", "lastName", "accountNumber"]);

  return (
    <div className="table-grid">
      <Grid rows={rows} columns={columns}>
        {currencyColumns ? (
          <CurrencyTypeProvider for={currencyColumns} />
        ) : null}
        <FilterProvider
          columns={currencyColumns}
          filterOperations={currencyFilterOperations}
        />
        <FilterProvider
          columns={otherColumns}
          filterOperations={otherFilterOperations}
        />
        <FilteringState defaultFilters={[]} />
        <IntegratedFiltering />
        <PagingState
          currentPage={pagination.pageNumber - 1}
          onCurrentPageChange={onPagingchange}
          pageSize={pagination.pageSize}
          onPageSizeChange={onPageSizechange}
        />
        <CustomPaging totalCount={pagination.totalCount} />
        <Table
          columnExtensions={
            tableColumnExtensions ? tableColumnExtensions : null
          }
        />
        <TableHeaderRow />
        <TableFilterRow showFilterSelector />
        <PagingPanel pageSizes={pageSizes} />
      </Grid>
    </div>
  );
};

export default Tablegrid;
