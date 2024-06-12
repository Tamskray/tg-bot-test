import React from "react";

const AddExpenseForm = ({
  costName,
  costAmount,
  expenses,
  setExpenses,
  error,
  setError,
  calculateSummary,
  updateExpensesHandler,
}) => {
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

  return (
    <form className="add-cost-container" onSubmit={addNewExpenseHandler}>
      <label htmlFor="cost-name">Cost name</label>
      <input
        id="cost-name"
        type="text"
        ref={costName}
        placeholder="Type name..."
      />

      <label htmlFor="cost-amount">Cost amount</label>
      <input
        id="cost-amount"
        type="number"
        ref={costAmount}
        placeholder="type cost..."
      />

      <button className="add-cost-btn" type="submit">
        Add
      </button>

      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default AddExpenseForm;
