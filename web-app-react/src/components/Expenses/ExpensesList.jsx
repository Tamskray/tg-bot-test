import React from "react";

const ExpensesList = ({
  expenses,
  setExpenses,
  updateExpensesHandler,
  calculateSummary,
  fetchError,
}) => {
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
    <>
      {fetchError && <p className="error-message">{fetchError}</p>}

      <h3>Expenses:</h3>
      <ul>
        {expenses.map((expense, idx) => (
          <li className="expense-item" key={idx}>
            {idx + 1}. {expense.name}: {expense.amount}
            <button
              className="delete-btn"
              onClick={() => deleteExpenseHandler(idx)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ExpensesList;
