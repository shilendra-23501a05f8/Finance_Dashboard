const express = require("express");
const {
    createRecord,
    getRecords,
    updateRecord,
    deleteRecord,
} = require("../controllers/recordController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

const router = express.Router();

router.use(auth);

router.post("/", role("admin"), createRecord);
router.get("/", role("admin", "analyst", "viewer"), getRecords);
router.put("/:id", role("admin"), updateRecord);
router.delete("/:id", role("admin"), deleteRecord);

module.exports = router;