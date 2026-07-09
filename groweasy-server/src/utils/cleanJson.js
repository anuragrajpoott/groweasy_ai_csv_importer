const cleanJson = (text = "") => {
  return String(text)
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();
};

module.exports = cleanJson;