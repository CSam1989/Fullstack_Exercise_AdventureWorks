import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { customerColumns } from "../../../interfaces/Customer";
import { getCustomersAction } from "../../../redux/actions/Customer.actions";
import { ApplicationState } from "../../../redux/types/State";
import Tablegrid from "../../tablegrid/Tablegrid.components";

const CustomerPage = () => {
  const [tableColumnExtensions] = useState<any>([
    { columnName: "sumTotalDue" },
  ]);
  const [currencyColumns] = useState(["sumTotalDue"]);

  const { isLoggedIn } = useSelector((state: ApplicationState) => state.auth);
  const { customers } = useSelector((state: ApplicationState) => state.data);
  const dispatch = useDispatch();

  const dispatchCustomer = (pageNumber?: number, pageSize?: number) => {
    try {
      dispatch(getCustomersAction(pageNumber, pageSize));
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (customers.list.length === 0) dispatchCustomer();
  }, [customers]);

  if (!isLoggedIn) return <Redirect to="/login" />;

  const handlePageChange = (pageNumber: number) => {
    dispatchCustomer(pageNumber + 1, customers.pagination.pageSize);
  };

  const handlePageSizeChange = (pageSize: number) => {
    dispatchCustomer(customers.pagination.pageNumber, pageSize);
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
      />
    </>
  );
};

export default CustomerPage;
