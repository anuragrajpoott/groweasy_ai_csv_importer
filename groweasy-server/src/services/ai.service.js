const OpenAI = require("openai");



const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const extractCRMData = async (records) => {
  const prompt = `
Convert these records to CRM format.

Skip records without email or phone.

Return valid JSON only.

Records:
${JSON.stringify(records)}
`;

  const response = await client.chat.completions.create({
    model: "google/gemini-2.5-flash",
    messages: [
      {
        role: "system",
        content: "You are a CRM extraction engine.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0,
    max_tokens: 2000,
  });

  return response.choices[0].message.content;
};

module.exports = {
  extractCRMData,
};