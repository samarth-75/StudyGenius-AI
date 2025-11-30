import { githubModelClient, GITHUB_MODEL } from "../utils/githubModelClient.js";

export const generateStudyPlan = async (req, res) => {
  try {
    const { subject, topic, difficulty, hoursPerDay, totalDays, studyStyle } = req.body;

    if (!subject || !topic || !difficulty || !hoursPerDay || !totalDays || !studyStyle) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = `
You are an expert academic study planning assistant.

Generate a structured study plan:

Subject: ${subject}
Topic: ${topic}
Difficulty: ${difficulty}
Hours per Day: ${hoursPerDay}
Total Days: ${totalDays}
Study Style: ${studyStyle}

Provide:
- Weekly breakdown
- Daily study schedule
- Tips based on study style
- Important resources
- Actionable step-by-step plan

Use clean formatting.
`;

    const response = await githubModelClient
      .path("/chat/completions")
      .post({
        body: {
          model: GITHUB_MODEL,
          messages: [
            { role: "system", content: "You create structured, high-quality study plans." },
            { role: "user", content: prompt },
          ],
        },
      });

    // Extract the actual AI text
    const aiPlan = response.body.choices[0].message.content;

    return res.json({
      success: true,
      plan: aiPlan,
    });

  } catch (err) {
    console.error("AI Error:", err);
    res.status(500).json({
      message: "AI failed to generate study plan",
      error: err.message,
    });
  }
};