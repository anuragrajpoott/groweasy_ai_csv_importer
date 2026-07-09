const DEFAULT_MAPPING = {
  email: "email",
  "email address": "email",
  "e-mail": "email",

  phone: "mobile_without_country_code",
  "phone number": "mobile_without_country_code",

  mobile: "mobile_without_country_code",
  "mobile number": "mobile_without_country_code",

  name: "name",
  "full name": "name",
  "customer name": "name",
};

const getFallbackMapping = (headers = []) => {
  const mapping = {};

  headers.forEach((header) => {
    const normalized = header
      .toLowerCase()
      .trim();

    if (DEFAULT_MAPPING[normalized]) {
      mapping[header] =
        DEFAULT_MAPPING[normalized];
    }
  });

  return mapping;
};

const isWeakMapping = (mapping = {}) => {
  const mappedFields = Object.values(
    mapping
  ).filter(Boolean);

  return mappedFields.length < 2;
};

module.exports = {
  getFallbackMapping,
  isWeakMapping,
};