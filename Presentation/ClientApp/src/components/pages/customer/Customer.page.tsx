import { ChangeSet, Filter } from "@devexpress/dx-react-grid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

import { CustomerApiFilterProps } from "../../../api/customer.api";
import { customerColumns, ICustomer } from "../../../interfaces/Customer";
import { IPagination } from "../../../interfaces/Pagination";
import { logout } from "../../../redux/actions/Auth.actions";
import {
  getCustomersAction,
  updateCustomerAction,
} from "../../../redux/actions/Customer.actions";
import { ApplicationState } from "../../../redux/types/State";
import {
  SetGridFilterToReduxFilter,
  SetReduxFilterToGridFilter,
} from "../../tablegrid/Filter.provider";
import Tablegrid from "../../tablegrid/Tablegrid.components";

const CustomerPage = () => {
  const [tableColumnExtensions] = useState<any>([
    { columnName: "sumTotalDue", editingEnabled: false },
  ]);
  const [currencyColumns] = useState(["sumTotalDue"]);

  const { isLoggedIn, user } = useSelector(
    (state: ApplicationState) => state.auth
  );
  const { customers, filters } = useSelector(
    (state: ApplicationState) => state.data
  );
  const dispatch = useDispatch();

  const dispatchCustomer = (
    filterProps?: CustomerApiFilterProps,
    paginationProps?: IPagination
  ) => {
    try {
      dispatch(getCustomersAction(filterProps, paginationProps));
    } catch (error) {
      toast.error(error.message);
      dispatch(logout());
      return <Redirect to="/" />;
    }
  };

  useEffect(() => {
    if (customers.list.length === 0) dispatchCustomer();
  }, [customers]);

  if (!isLoggedIn) return <Redirect to="/login" />;

  const handlePageChange = (pageNumber: number) => {
    dispatchCustomer(filters, {
      ...customers.pagination,
      pageNumber: pageNumber + 1,
    });
  };

  const handlePageSizeChange = (pageSize: number) => {
    dispatchCustomer(filters, {
      ...customers.pagination,
      pageSize: pageSize,
    });
  };

  const handleFilterChange = (gridFilters: Filter[]) => {
    const newFilters = SetGridFilterToReduxFilter(
      gridFilters,
      filters,
      currencyColumns
    );
    dispatchCustomer(filters, customers.pagination);
  };
  const gridFilter = SetReduxFilterToGridFilter(filters, currencyColumns);

  const handleOnChange = (props: ChangeSet) => {
    console.log(props);
    if (props.changed) {
      let customer: ICustomer | undefined;
      let values: any;
      Object.keys(props.changed).map((key) => {
        customer = customers.list.find((x) => x.customerId.toString() == key);
      });
      Object.values(props.changed).map((value) => (values = value));

      if (customer && values) {
        const changedCustomer: ICustomer = { ...customer, ...values };
        try {
          dispatch(updateCustomerAction(changedCustomer));
        } catch (error) {
          toast.error(error.message);
        }
      }
    }
  };
  return (
    <>
      <h2>Customers</h2>
      <Tablegrid
        columns={customerColumns}
        rows={customers.list}
        tableColumnExtensions={tableColumnExtensions}
        currencyColumns={currencyColumns}
        pagination={customers.pagination}
        onPagingchange={handlePageChange}
        onPageSizechange={handlePageSizeChange}
        filters={gridFilter}
        onFiltersChange={handleFilterChange}
        isEditable={(user && user.role === "Admin") || false}
        getRowId={(row: ICustomer) => row.customerId}
        commitChanges={handleOnChange}
      />
    </>
  );
};

export default CustomerPage;
