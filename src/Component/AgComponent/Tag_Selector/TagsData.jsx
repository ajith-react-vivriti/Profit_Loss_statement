import profit_loss_statement from "../../../ProfitLossStatement_55.json";

const data = profit_loss_statement;
const jsonData = data.map((item) => item.profit_loss_statement);

export const Tags = jsonData.flatMap((company) => {
  const { line_data } = company;
  if (!line_data) return [];
  const values = line_data.map((value) => value.values);
  return values.map((value) => value.values);
});
