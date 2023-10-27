import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

const DataGrid = ({ data }) => {
  const keys = Object.keys(data);
  const values = Object.values(data);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {keys.map((key, index) => (
              <TableCell key={index}>{key}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {values.map((value, index) => (
              <TableCell key={index}>{value}</TableCell>
            ))}
          </TableRow>
          {data.children &&
            data.children.map((child, idx) => {
              const childValues = Object.values(child);
              return (
                <TableRow key={idx}>
                  {childValues.map((childValue, index) => (
                    <TableCell key={index}>{childValue}</TableCell>
                  ))}
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DataGrid;
