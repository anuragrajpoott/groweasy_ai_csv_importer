const Papa = require("papaparse");

const { getColumnMapping } = require("../services/mapping.service");
const cleanJson = require("../utils/cleanJson");
const transformRows = require("../utils/transformRows");

const {
  getFallbackMapping,
  isWeakMapping,
} = require("../utils/fallbackMapping");

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

let mapping;

try {
  mapping = JSON.parse(cleaned);
} catch (error) {
  return res.status(500).json({
    success: false,
    message: "AI returned invalid mapping",
  });
}

if (
  !mapping ||
  typeof mapping !== "object" ||
  Array.isArray(mapping)
) {
  return res.status(500).json({
    success: false,
    message: "Invalid mapping format received",
  });
}

if (isWeakMapping(mapping)) {
  console.log(
    "AI mapping weak, using fallback mapping"
  );

  mapping = getFallbackMapping(headers);
}

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