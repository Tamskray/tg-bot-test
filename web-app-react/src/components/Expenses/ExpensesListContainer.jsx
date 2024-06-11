import React from "react";
import { useFetch } from "../../hooks/useFetch";
import { API_HOST } from "./constants";

import AddExpense from "./AddExpense";

const ExpensesListContainer = () => {
  const { data: expenses, error } = useFetch(`${API_HOST}/expenses`);

  return <AddExpense data={expenses && expenses} fetchError={error} />;
};

export default ExpensesListContainer;
