const Papa = require("papaparse");

const { extractCRMData } = require("../services/ai.service");

const cleanJson = require("../utils/cleanJson");

const importCSV = async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "CSV file is required",
      });
    }

    const csvText = file.buffer.toString();

    const parsed = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    const aiResponse = await extractCRMData(
  parsed.data.slice(0, 5)
);

const cleaned = cleanJson(aiResponse);

const parsedAI = JSON.parse(cleaned);

return res.json({
  success: true,
  totalRows: parsed.data.length,
  records: parsedAI,
});
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  importCSV,
};