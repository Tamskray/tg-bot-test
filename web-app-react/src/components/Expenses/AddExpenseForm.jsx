import React from "react";

const AddExpenseForm = ({
  costName,
  costAmount,
  addNewExpenseHandler,
  error,
}) => {
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
