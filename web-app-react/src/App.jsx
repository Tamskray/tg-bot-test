import { useEffect } from "react";
import "./App.css";
import AddExpense from "./components/AddExpense";
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

      <AddExpense />

      <div className="card">
        <button onClick={onClose}>Close Mini App</button>
      </div>
    </>
  );
}

export default App;
