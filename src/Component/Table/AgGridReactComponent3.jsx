import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

const AgGrid = () => {
  const [parentData, setParentData] = useState({
    Q1Revenue2024: "63977427",
    Q2Revenue2024: "34374616",
    Q3Revenue2024: "70073877.14",
    Q4Revenue2024: "107040935",
    Revenue_type: "Total Revenue",
    children: [
      {
        Q1Revenue2024: "61395845",
        Q2Revenue2024: "32765736",
        Q3Revenue2024: "66948488",
        Q4Revenue2024: "102025097",
        Revenue_type: "Revenue from Operations",
      },
    ],
    isChildrenVisible: false,
  });

  const handleRowClick = () => {
    setParentData({
      ...parentData,
      isChildrenVisible: !parentData.isChildrenVisible,
    });
  };

  const keys = Object.keys(parentData);
  const values = Object.values(parentData);

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
          <TableRow onClick={handleRowClick}>
            {values.map((value, index) => (
              <TableCell key={index}>{value}</TableCell>
            ))}
          </TableRow>
          {parentData.children &&
            parentData.children.map((child, idx) => {
              const childValues = Object.values(child);
              return (
                <TableRow
                  key={idx}
                  style={{
                    display: parentData.isChildrenVisible
                      ? "table-row"
                      : "none",
                  }}
                >
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

export default AgGrid;
