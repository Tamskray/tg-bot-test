import React, { useState, useRef, useEffect } from "react";
import { API_HOST } from "./constants";

import ExpensesList from "./ExpensesList";
import AddExpenseForm from "./AddExpenseForm";
import Modal from "../Modal/Modal";

import { useModal } from "../../hooks/useModal";

const Expenses = ({ data, fetchError }) => {
  const [expenses, setExpenses] = useState(data?.expenses || []);

  const costName = useRef();
  const costAmount = useRef();

  const [error, setError] = useState("");

  const modalProps = useModal();

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

  return (
    <div className="card">
      <Modal {...modalProps}>
        <AddExpenseForm
          costName={costName}
          costAmount={costAmount}
          expenses={expenses}
          setExpenses={setExpenses}
          error={error}
          setError={setError}
          calculateSummary={calculateSummary}
          updateExpensesHandler={updateExpensesHandler}
        />
      </Modal>

      <button className="add-cost-btn" onClick={modalProps.onOpen}>
        Add new expense
      </button>

      {expenses && (
        <ExpensesList
          expenses={expenses}
          setExpenses={setExpenses}
          updateExpensesHandler={updateExpensesHandler}
          calculateSummary={calculateSummary}
          fetchError={fetchError}
        />
      )}

      <h2>Summary: {expenses && calculateSummary(expenses)}</h2>
    </div>
  );
};

export default Expenses;
