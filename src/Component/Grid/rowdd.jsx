import "./RowData.css";
import React from "react";

const profitLossData = require("../../ProfitLossStatement_55.json");

const filterDataByYear = (dataArray, year) => {
  return dataArray.filter(
    (item) => item.profit_loss_statement.calendar_year === year
  );
};

const processRowData = (data) => {
  const year = data.map((item) => item.profit_loss_statement.calendar_year);
  const rowData = [];
  data.forEach((item) => {
    const { id, name, line_data } = item.profit_loss_statement || {};
    if (line_data) {
      line_data.forEach((lineItem) => {
        const {
          name: lineItemName,
          values,
          q1_total_revenue,
          q2_total_revenue,
          q3_total_revenue,
          q4_total_revenue,
        } = lineItem || {};
        const rowItem = (
          <div key={id} className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {lineItemName}
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              {values &&
                values.map((value, index) => (
                  <li key={index}>
                    <a className="dropdown-item" href="#">
                      {value.name}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        );

        rowData.push(rowItem);
      });
    }
  });
  return rowData;
};

const jsonData = profitLossData.map((item) => item.profit_loss_statement);
const calendar_years = jsonData.map((item) => item.calendar_year);

const rowsByYear = [];
for (let i = 0; i < calendar_years.length; i++) {
  const dataByYear = filterDataByYear(profitLossData, calendar_years[i]);
  const rows = processRowData(dataByYear);
  rowsByYear.push(rows);
  console.log(rowsByYear);
}

export const Rows = rowsByYear;
