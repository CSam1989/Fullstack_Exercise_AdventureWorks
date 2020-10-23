import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
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

  useEffect(() => {
    if (customers.length === 0) dispatch(getCustomersAction());
  }, [customers]);

  if (!isLoggedIn) return <Redirect to="/login" />;

  return (
    <>
      <h2>Customers</h2>
      <Tablegrid
        columns={customerColumns}
        rows={customers}
        tableColumnExtensions={tableColumnExtensions}
        currencyColumns={currencyColumns}
      />
    </>
  );
};

export default CustomerPage;
