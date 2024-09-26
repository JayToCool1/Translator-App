export const translateText = async (text, language) => {
  const url = `${import.meta.env.VITE_TRANSLATOR_API_URL}&to=${language}&from=en`;

  const options = {
    method: 'POST',
    headers: {
      'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
      'x-rapidapi-host': import.meta.env.VITE_TRANSLATOR_API_HOST,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([{ Text: text }]),
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    // Handle response data
    const translatedText = result[0]?.translations[0]?.text;
    if (!translatedText) {
      throw new Error("Translation failed");
    }
    return translatedText;
  } catch (error) {
    console.error("Translation Error:", error);
    throw error;
  }
};
