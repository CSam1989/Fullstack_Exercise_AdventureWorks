import { DataTypeProvider } from "@devexpress/dx-react-grid";
import { Chip, Input, MenuItem, Select } from "@material-ui/core";
import React from "react";

const BooleanFormatter = ({ value }: any) => (
  <Chip color={value ? "primary" : "secondary"} label={value ? "Yes" : "No"} />
);

const BooleanEditor = ({ value, onValueChange }: any) => {
  return (
    <Select
      input={<Input />}
      value={value ? "Yes" : "No"}
      onChange={(event) => onValueChange(event.target.value === "Yes")}
      style={{ width: "100%" }}
    >
      <MenuItem value="Yes">Yes</MenuItem>
      <MenuItem value="No">No</MenuItem>
    </Select>
  );
};

export const BooleanTypeProvider = (props: any) => (
  <DataTypeProvider
    formatterComponent={BooleanFormatter}
    editorComponent={BooleanEditor}
    {...props}
  />
);
