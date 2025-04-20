const credentials = {
    apiKey: "Your apiKey",
};
  
  async function geminiApi({ content, promptType }) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${credentials.apiKey}`;
    const prompt = `
      Design prompt on basis of the content. You have to optimize the prompt, not give the content answer.
      Content is: ${content}
      Changes to Type: ${promptType}
    `;
    const requestBody = {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    };
  
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      return { status: "success", data };
    } catch (error) {
      console.error("Error in geminiApi:", error);
      return { status: "error", message: error.message };
    }
  }
  
  export default geminiApi;
  