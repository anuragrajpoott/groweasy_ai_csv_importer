const STATUS_MAP = {
  interested: "GOOD_LEAD_FOLLOW_UP",
  busy: "DID_NOT_CONNECT",
  "not interested": "BAD_LEAD",
  "closed won": "SALE_DONE",
};

function sanitizeValue(value) {
  if (value === null || value === undefined) {
    return "";
  }

  const cleaned = String(value).trim();

  if (
    !cleaned ||
    cleaned.toLowerCase() === "null" ||
    cleaned.toLowerCase() === "undefined"
  ) {
    return "";
  }

  return cleaned;
}

function parsePhone(phone) {
  const cleanedPhone = sanitizeValue(phone);

  if (!cleanedPhone) {
    return {};
  }

  const normalized = cleanedPhone.replace(/\s+/g, "");

  if (normalized.startsWith("+")) {
    const match = normalized.match(/^(\+\d{1,4})(\d+)$/);

    if (match) {
      return {
        country_code: match[1],
        mobile_without_country_code: match[2],
      };
    }
  }

  return {
    mobile_without_country_code: normalized,
  };
}

function parseEmails(emailValue) {
  const cleanedEmailValue = sanitizeValue(emailValue);

  if (!cleanedEmailValue) {
    return {};
  }

  const emails = cleanedEmailValue
    .split(/[;,]/)
    .map((email) => email.trim())
    .filter(Boolean);

  return {
    email: emails[0] || "",
    extraEmails: emails.slice(1),
  };
}

function normalizeStatus(status) {
  const cleanedStatus = sanitizeValue(status);

  if (!cleanedStatus) {
    return "";
  }

  const normalized =
    STATUS_MAP[cleanedStatus.toLowerCase()];

  return normalized || cleanedStatus;
}

const transformRows = (rows, mapping) => {
  const imported = [];
  const skipped = [];

  rows.forEach((row) => {
    const crmRecord = {};

    Object.entries(mapping).forEach(
      ([csvColumn, crmField]) => {
        if (!crmField) return;

        const value = sanitizeValue(
          row[csvColumn]
        );

        if (!value) return;

        if (
          crmField ===
          "mobile_without_country_code"
        ) {
          Object.assign(
            crmRecord,
            parsePhone(value)
          );
          return;
        }

        if (crmField === "email") {
          const {
            email,
            extraEmails = [],
          } = parseEmails(value);

          crmRecord.email = email;

          if (extraEmails.length) {
            const additionalEmails =
              `Additional emails: ${extraEmails.join(
                ", "
              )}`;

            crmRecord.crm_note = crmRecord.crm_note
              ? `${crmRecord.crm_note}\n${additionalEmails}`
              : additionalEmails;
          }

          return;
        }

        if (crmField === "crm_status") {
          crmRecord.crm_status =
            normalizeStatus(value);
          return;
        }

        crmRecord[crmField] = value;
      }
    );

    const hasEmail =
      Boolean(crmRecord.email);

    const hasMobile =
      Boolean(
        crmRecord.mobile_without_country_code
      );

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