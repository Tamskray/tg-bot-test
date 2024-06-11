import React from "react";

const ExpensesList = ({ expenses, deleteExpenseHandler, fetchError }) => {
  return (
    <>
      {fetchError && <p className="error-message">{fetchError}</p>}

      <h3>Expenses:</h3>
      <ul>
        {expenses.map((expense, idx) => (
          <li key={idx}>
            {idx} - {expense.name}: {expense.amount}
            <button
              className="delete-btn"
              onClick={() => deleteExpenseHandler(idx)}
            >
              DELETE
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ExpensesList;
