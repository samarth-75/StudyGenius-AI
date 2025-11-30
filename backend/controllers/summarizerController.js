import { githubModelClient, GITHUB_MODEL } from "../utils/githubModelClient.js";

export const summarizeNotes = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ message: "No text provided" });
    }

    const prompt = `
You are an expert academic summarizer. Given the following text, produce EXACTLY this structure:

{
  "summary": "",
  "bulletPoints": [],
  "keyTerms": [],
  "flashcards": [
    { "question": "", "answer": "" }
  ]
}

Text to summarize:
${text}
    `;

    const response = await githubModelClient
      .path("/chat/completions")
      .post({
        body: {
          model: GITHUB_MODEL,
          messages: [
            { role: "system", content: "You return ONLY valid JSON. No markdown. No explanation." },
            { role: "user", content: prompt }
          ],
          temperature: 0.4
        },
      });

    const raw = response.body.choices[0].message.content;

    // Parse JSON safely
    let result;
    try {
      result = JSON.parse(raw);
    } catch (err) {
      console.error("JSON Parse Error:", err);
      console.log("RAW:", raw);
      return res.status(500).json({ message: "AI returned invalid format" });
    }

    res.json({
      success: true,
      summary: result,
    });

  } catch (err) {
    console.error("Summarizer Error:", err);
    res.status(500).json({ message: "Failed to summarize notes", error: err.message });
  }
};