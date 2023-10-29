import "./RowData.css";
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
    let currentPId = 1;
    let currentCId = 1;
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
        const rowItem = {
          P_id: currentPId,
          Revenue_type: lineItemName,
          ["Q1Revenue" + year]: q1_total_revenue,
          ["Q2Revenue" + year]: q2_total_revenue,
          ["Q3Revenue" + year]: q3_total_revenue,
          ["Q4Revenue" + year]: q4_total_revenue,
          children: [],
        };
        currentPId++;

        if (values) {
          values.forEach((value) => {
            const {
              name,
              q1_total_revenue,
              q2_total_revenue,
              q3_total_revenue,
              q4_total_revenue,
            } = value || {};

            const valueItem = {
              C_id: currentCId,
              Revenue_type: name,
              ["Q1Revenue" + year]: q1_total_revenue,
              ["Q2Revenue" + year]: q2_total_revenue,
              ["Q3Revenue" + year]: q3_total_revenue,
              ["Q4Revenue" + year]: q4_total_revenue,
            };
            currentCId++;
            rowItem.children.push(valueItem);
          });
        }
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
}

export const Rows = rowsByYear;
