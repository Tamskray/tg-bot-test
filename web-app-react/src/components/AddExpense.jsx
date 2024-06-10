import React, { useState, useRef, useEffect } from "react";

const AddExpense = () => {
  const [expenses, setExpenses] = useState();

  const costName = useRef();
  const costAmount = useRef();

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/expenses");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setExpenses(data.expenses);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const updateExpensesHandler = async (updatedData) => {
    try {
      const response = await fetch("http://localhost:3000/api/expenses", {
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

    const summary = updatedExpenses.reduce(
      (sum, expense) => sum + parseFloat(expense.amount),
      0
    );

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
    console.log(index);

    const updatedExpenses = [...expenses];
    updatedExpenses.splice(index, 1);

    const summary = updatedExpenses.reduce(
      (sum, expense) => sum + parseFloat(expense.amount),
      0
    );

    const updatedData = {
      expenses: updatedExpenses,
      summary: summary,
    };

    try {
      const response = await fetch("http://localhost:3000/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update expenses");
      }

      console.log("Expense deleted successfully");

      setExpenses(updatedExpenses);
    } catch (error) {
      console.error("Error deleting expense:", error);
      setError("Error deleting expense. Please try again.");
    }
  };

  return (
    <div className="card">
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
      </form>

      {error && <p className="error-message">{error}</p>}

      <h3>Expenses:</h3>
      <ul>
        {expenses?.map((expense, idx) => (
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

      <h2>
        Summary:{" "}
        {expenses?.reduce(
          (sum, expense) => sum + parseFloat(expense.amount),
          0
        )}
      </h2>
    </div>
  );
};

export default AddExpense;
