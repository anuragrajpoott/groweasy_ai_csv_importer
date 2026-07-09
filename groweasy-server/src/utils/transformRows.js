const transformRows = (rows, mapping) => {
  const imported = [];
  const skipped = [];

  rows.forEach((row) => {
    const crmRecord = {};

    Object.entries(mapping).forEach(
      ([csvColumn, crmField]) => {
        if (!crmField) return;

        crmRecord[crmField] = row[csvColumn];
      }
    );

    const hasEmail = crmRecord.email;
    const hasMobile =
      crmRecord.mobile_without_country_code;

    if (!hasEmail && !hasMobile) {
      skipped.push(row);
      return;
    }

    imported.push(crmRecord);
  });

  return {
    imported,
    skipped,
  };
};

module.exports = transformRows;