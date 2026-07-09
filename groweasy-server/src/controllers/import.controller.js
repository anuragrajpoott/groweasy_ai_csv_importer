const Papa = require("papaparse");

const { getColumnMapping } = require("../services/mapping.service");
const cleanJson = require("../utils/cleanJson");
const transformRows = require("../utils/transformRows");

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

    if (!parsed.data.length) {
      return res.status(400).json({
        success: false,
        message: "CSV contains no data",
      });
    }

    const headers = Object.keys(parsed.data[0]);

    const mappingResponse =
      await getColumnMapping(headers);

    const cleaned =
      cleanJson(mappingResponse);

    const mapping =
      JSON.parse(cleaned);

    const result = transformRows(
      parsed.data,
      mapping
    );

    return res.json({
      success: true,
      mapping,
      imported: result.imported,
      skipped: result.skipped,
      totalImported:
        result.imported.length,
      totalSkipped:
        result.skipped.length,
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