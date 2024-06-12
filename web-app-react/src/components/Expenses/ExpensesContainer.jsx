import React from "react";
import { useFetch } from "../../hooks/useFetch";
import { API_HOST } from "./constants";

import Expenses from "./Expenses";

const ExpensesListContainer = () => {
  const { data: expenses, error } = useFetch(`${API_HOST}/expenses`);

  return <Expenses data={expenses && expenses} fetchError={error} />;
};

export default ExpensesListContainer;
