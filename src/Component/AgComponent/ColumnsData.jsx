import Customkey from "./CustomKey";

const data = require("../../ProfitLossStatement_55.json");
const jsonData = data.map((item) => item.profit_loss_statement);
const companyId = jsonData.map((item) => item.company_type);
const calendarYears = jsonData.map((item) => item.calendar_year);
const generateColumns = () => {
  const dynamicColumns = calendarYears.map((year) => ({
    headerName: year.toString(),
    columnGroupShow: "open",
    marryChildren: true,
    children: [
      { columnGroupShow: "closed" },
      {
        headerName: "Q1 Revenue",
        field: `Q1Revenue${year}`,
        type: "number",
        columnGroupShow: "open",
      },
      {
        headerName: "Q2 Revenue",
        field: `Q2Revenue${year}`,
        type: "number",
        columnGroupShow: "open",
      },
      {
        headerName: "Q3 Revenue",
        field: `Q3Revenue${year}`,
        type: "number",
        columnGroupShow: "open",
      },
      {
        headerName: "Q4 Revenue",
        field: `Q4Revenue${year}`,
        type: "number",
        columnGroupShow: "open",
      },
    ],
  }));

  const headerData = dynamicColumns.map((column, index) => ({
    headerName: calendarYears[index],
    children: column.children,
  }));

  return [
    {
      headerName: companyId[0],
      field: `Revenue_type`,
      cellRenderer: Customkey,
    },
    ...headerData,
  ];
};

const generateColumn = generateColumns();
export default generateColumn;
