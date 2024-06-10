const Router = require("express");
const ExpenseController = require("../controllers/ExpenseController.js");

const router = new Router();

router.get("/expenses", ExpenseController.getAll);
router.post("/expenses", ExpenseController.updateExpenses);

module.exports = router;
