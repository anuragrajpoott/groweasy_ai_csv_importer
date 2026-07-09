const express = require("express");
const multer = require("multer");

const {
  importCSV,
} = require("../controllers/import.controller");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
});

router.post(
  "/",
  upload.single("file"),
  importCSV
);

module.exports = router;