import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Box,
} from "@material-ui/core";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const CustomTable = ({ data }) => {
  const [expandedRows, setExpandedRows] = useState([]);

  const handleRowClick = (index) => {
    const currentIndex = expandedRows.indexOf(index);
    const newExpandedRows = [...expandedRows];
    if (currentIndex === -1) {
      newExpandedRows.push(index);
    } else {
      newExpandedRows.splice(currentIndex, 1);
    }
    setExpandedRows(newExpandedRows);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell>Q1 Total Revenue</TableCell>
            <TableCell>Q2 Total Revenue</TableCell>
            <TableCell>Q3 Total Revenue</TableCell>
            <TableCell>Q4 Total Revenue</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data[0].profit_loss_statement.line_data.map((row, index) => (
            <React.Fragment key={index}>
              <TableRow onClick={() => handleRowClick(index)}>
                <TableCell>
                  <IconButton aria-label="expand row" size="small">
                    {expandedRows.includes(index) ? (
                      <KeyboardArrowUpIcon />
                    ) : (
                      <KeyboardArrowDownIcon />
                    )}
                  </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.q1_total_revenue}</TableCell>
                <TableCell>{row.q2_total_revenue}</TableCell>
                <TableCell>{row.q3_total_revenue}</TableCell>
                <TableCell>{row.q4_total_revenue}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  style={{ paddingBottom: 0, paddingTop: 0 }}
                  colSpan={6}
                >
                  <Collapse
                    in={expandedRows.includes(index)}
                    timeout="auto"
                    unmountOnExit
                  >
                    <Box margin={1}>
                      {/* Add your children content here */}
                      {row.tags.map((tag, i) => (
                        <div key={i}>
                          <p>{tag.particular}</p>
                          {tag.selections.map((selection, j) => (
                            <div key={j}>
                              <p>{selection.calendar_quarter}</p>
                              <p>{selection.line_item_revenue}</p>
                            </div>
                          ))}
                        </div>
                      ))}
                    </Box>
                  </Collapse>
                </TableCell>
              </TableRow>
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
