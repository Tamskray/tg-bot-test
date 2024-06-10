const fs = require("fs");

class ExpenseController {
  async getAll(req, res) {
    fs.readFile("expenses.json", "utf-8", (err, data) => {
      if (err) {
        console.error("Error reading file:", err);
        res.status(500).send("Error reading JSON file");
        return;
      }
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    });
    console.log("get");
    try {
    } catch (err) {
      res.status(500).json(err);
    }
  }

  async updateExpenses(req, res) {
    const updatedExpenses = req.body;

    fs.writeFile(
      "expenses.json",
      JSON.stringify(updatedExpenses, null, 2),
      "utf8",
      (err) => {
        if (err) {
          console.error("Error writing file:", err);
          res.status(500).send("Error updating expenses");
          return;
        }
        console.log("File updated successfully");
        res.send("Expenses updated successfully");
      }
    );
  }
}

module.exports = new ExpenseController();
