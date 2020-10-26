import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { CustomerApiProps } from "../../../api/customer.api";
import { customerColumns } from "../../../interfaces/Customer";
import { logout } from "../../../redux/actions/Auth.actions";
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

  const dispatchCustomer = (queryParams?: CustomerApiProps) => {
    try {
      dispatch(getCustomersAction(queryParams));
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
    dispatchCustomer({
      pageNumber: pageNumber + 1,
      pageSize: customers.pagination.pageSize,
    });
  };

  const handlePageSizeChange = (pageSize: number) => {
    dispatchCustomer({
      pageNumber: customers.pagination.pageNumber,
      pageSize: pageSize,
    });
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
