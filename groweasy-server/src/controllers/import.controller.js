const Papa = require("papaparse");

const { extractCRMData } = require("../services/ai.service");

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

return res.json({
  success: true,
  aiResponse,
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