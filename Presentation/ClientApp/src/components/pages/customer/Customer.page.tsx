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
  const [currencyColumns] = useState(["sumTotalDue"]);

  const [tableColumnExtensions] = useState<any>([
    { columnName: "sumTotalDue", editingEnabled: false },
    { columnName: "accountNumber", editingEnabled: false },
  ]);

  const [errors, setErrors] = useState<string[]>([]);

  const { isLoggedIn, user } = useSelector(
    (state: ApplicationState) => state.auth
  );
  const { customers, filters } = useSelector(
    (state: ApplicationState) => state.data
  );
  const dispatch = useDispatch();

  const dispatchCustomer = async (
    filterProps?: CustomerApiFilterProps,
    paginationProps?: IPagination
  ) => {
    try {
      await dispatch(getCustomersAction(filterProps, paginationProps));
    } catch (error) {
      toast.error(error);
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

  const handlePageSizeChange = async (pageSize: number) => {
    await dispatchCustomer(filters, {
      ...customers.pagination,
      pageSize: pageSize,
    });
  };

  const handleFilterChange = async (gridFilters: Filter[]) => {
    SetGridFilterToReduxFilter(gridFilters, filters, currencyColumns);
    await dispatchCustomer(filters, customers.pagination);
  };
  const gridFilter = SetReduxFilterToGridFilter(filters, currencyColumns);

  const handleOnChange = async ({ changed }: ChangeSet) => {
    if (changed) {
      const changedRows = customers.list.find(
        (customer) => changed[customer.customerId]
      );

      if (changedRows) {
        const changedCustomer: ICustomer = {
          ...changedRows,
          ...changed[changedRows.customerId],
        };

        try {
          await dispatch(updateCustomerAction(changedCustomer));
        } catch (error) {
          setErrors(error);
          toast.error("Updating customer failed", { autoClose: false });
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
        errors={errors}
      />
    </>
  );
};

export default CustomerPage;
