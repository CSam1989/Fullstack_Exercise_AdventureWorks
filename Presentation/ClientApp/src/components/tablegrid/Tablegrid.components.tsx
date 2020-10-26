import "./Tablegrid.styles.scss";

import {
  CustomPaging,
  EditingState,
  Filter,
  FilteringState,
  PagingState,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  PagingPanel,
  Table,
  TableFilterRow,
  TableHeaderRow,
  TableEditRow,
  TableEditColumn,
} from "@devexpress/dx-react-grid-material-ui";
import React, { useState } from "react";

import { IPagination } from "../../interfaces/Pagination";
import { CurrencyTypeProvider } from "./CurrencyType.provider";
import { FilterProvider } from "./Filter.provider";

export interface TablegridProps {
  columns: any[];
  rows: any[];
  tableColumnExtensions?: any;
  currencyColumns?: any;
  pagination: IPagination;
  onPagingchange(pageNumber: number): void;
  onPageSizechange(pageSize: number): void;
  filters: Filter[];
  onFiltersChange(event: any): void;
  isEditable: boolean;
  commitChanges(event: any): void;
  getRowId(row: any): number;
}

const Tablegrid = ({
  rows,
  columns,
  tableColumnExtensions,
  currencyColumns,
  pagination,
  onPagingchange,
  onPageSizechange,
  filters,
  onFiltersChange,
  isEditable,
  commitChanges,
  getRowId,
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
      <Grid rows={rows} columns={columns} getRowId={getRowId}>
        {isEditable ? (
          <EditingState
            onCommitChanges={commitChanges}
            columnExtensions={tableColumnExtensions}
          />
        ) : null}
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
        <FilteringState onFiltersChange={onFiltersChange} />
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
        {isEditable ? <TableEditRow /> : null}
        {isEditable ? <TableEditColumn showEditCommand /> : null}

        <TableFilterRow showFilterSelector />
        <PagingPanel pageSizes={pageSizes} />
      </Grid>
    </div>
  );
};

export default Tablegrid;
