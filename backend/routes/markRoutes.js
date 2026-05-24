const express = require("express");

const router = express.Router();

const { addMarks,getMarks,updateMarks,deleteMarks } = require("../controllers/markController");

router.post("/", addMarks);
router.get("/", getMarks);
router.put("/:id", updateMarks);
router.delete("/:id", deleteMarks);

module.exports = router;