const express = require("express");
const { summary } = require("../controllers/dashboardController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/summary", auth, role("admin", "analyst"), summary);

module.exports = router;