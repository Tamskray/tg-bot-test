import React, { useState, useRef, useEffect } from "react";
import { API_HOST } from "./constants";

import ExpensesList from "./ExpensesList";
import AddExpenseForm from "./AddExpenseForm";

const AddExpense = ({ data, fetchError }) => {
  const [expenses, setExpenses] = useState(data?.expenses || []);

  const costName = useRef();
  const costAmount = useRef();

  const [error, setError] = useState("");

  useEffect(() => {
    data && setExpenses(data?.expenses);
  }, [data]);

  const calculateSummary = (updatedExpenses) => {
    return updatedExpenses.reduce(
      (sum, expense) => sum + parseFloat(expense.amount),
      0
    );
  };

  const updateExpensesHandler = async (updatedData) => {
    try {
      const response = await fetch(`${API_HOST}/expenses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Data updated successfully");
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const addNewExpenseHandler = (event) => {
    event.preventDefault();
    error && setError("");

    if (!costName.current.value.trim()) {
      setError("You must enter a cost name");
      return;
    }

    const amount = parseFloat(costAmount.current.value);

    if (isNaN(amount) || amount <= 0) {
      setError("You must enter a cost amount");
      return;
    }

    const newExpense = {
      name: costName.current.value,
      amount: costAmount.current.value,
    };

    const updatedExpenses = [...expenses, newExpense];

    const summary = calculateSummary(updatedExpenses);

    const updatedData = {
      expenses: updatedExpenses,
      summary: summary,
    };

    updateExpensesHandler(updatedData);
    setExpenses(updatedExpenses);

    costName.current.value = "";
    costAmount.current.value = "";
  };

  const deleteExpenseHandler = async (index) => {
    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);

    const summary = calculateSummary(updatedExpenses);

    const updatedData = {
      expenses: updatedExpenses,
      summary: summary,
    };

    updateExpensesHandler(updatedData);
    setExpenses(updatedExpenses);
  };

  return (
    <div className="card">
      <AddExpenseForm
        costName={costName}
        costAmount={costAmount}
        addNewExpenseHandler={addNewExpenseHandler}
        error={error}
      />

      {expenses && (
        <ExpensesList
          expenses={expenses}
          deleteExpenseHandler={deleteExpenseHandler}
          fetchError={fetchError}
        />
      )}

      <h2>Summary: {expenses && calculateSummary(expenses)}</h2>
    </div>
  );
};

export default AddExpense;
