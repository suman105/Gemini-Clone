export const runChat = async (prompt) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
  const body = {
    contents: [{ parts: [{ text: prompt }] }],
  };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    console.log(data?.candidates?.[0]?.content?.parts?.[0]?.text); // Remove it once everything is done
    return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "No response";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Something went wrong.";
  }
};

export default runChat