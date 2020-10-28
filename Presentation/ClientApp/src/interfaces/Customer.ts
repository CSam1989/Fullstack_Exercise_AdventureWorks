export interface ICustomer {
  customerId: number;
  firstName: string;
  lastName: string;
  accountNumber: string;
  sumTotalDue: number;
}

export const customerColumns = [
  { name: "firstName", title: "First name" },
  { name: "lastName", title: "Last name" },
  { name: "accountNumber", title: "Accountnumber" },
  { name: "sumTotalDue", title: "Sum Total Due" },
];
