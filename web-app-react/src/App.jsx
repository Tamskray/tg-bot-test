import { useEffect } from "react";
import "./App.css";
import AddExpense from "./components/Expenses/AddExpense";
import ExpensesListContainer from "./components/Expenses/ExpensesListContainer.jsx";
const tg = window.Telegram.WebApp;

function App() {
  useEffect(() => {
    tg.ready();
  }, []);

  const onClose = () => {
    tg.close();
  };

  return (
    <>
      <h1>Telegram web app</h1>

      <ExpensesListContainer />

      <div className="card">
        <button onClick={onClose}>Close Mini App</button>
      </div>
    </>
  );
}

export default App;
