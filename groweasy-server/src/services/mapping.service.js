const OpenAI = require("openai");

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const getColumnMapping = async (headers) => {
  const prompt = `
You are a CRM field mapping engine.

Map the given CSV headers to one of these CRM fields:

created_at
name
email
country_code
mobile_without_country_code
company
city
state
country
lead_owner
crm_status
crm_note
data_source
possession_time
description

Rules:
- Return ONLY valid JSON.
- Use null if no suitable mapping exists.

Example:

{
  "Full Name": "name",
  "Phone Number": "mobile_without_country_code",
  "Remarks": "crm_note"
}

Headers:
${JSON.stringify(headers)}
`;

  const response = await client.chat.completions.create({
    model: "google/gemini-2.5-flash",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0,
    max_tokens: 500,
  });

  return response.choices[0].message.content;
};

module.exports = {
  getColumnMapping,
};