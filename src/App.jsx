import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { translateText } from "./services/translationService";
import Header from './components/Header';  
import Footer from './components/Footer'; 
import Rating from './components/Rating'; 

const Home = () => {
  const languages = [
    { label: "Hindi", value: "hi" },
    { label: "Spanish", value: "es" },
    { label: "Japanese", value: "ja" },
    { label: "French", value: "fr" },
    { label: "German", value: "de" },
    { label: "Chinese (Simplified)", value: "zh-Hans" },
    { label: "Korean", value: "ko" },
    { label: "Russian", value: "ru" },
    { label: "Arabic", value: "ar" },
    { label: "Italian", value: "it" },
    { label: "Portuguese", value: "pt" },
    { label: "Turkish", value: "tr" },
    { label: "Dutch", value: "nl" },
    { label: "Swedish", value: "sv" },
    { label: "Greek", value: "el" },
    { label: "Polish", value: "pl" },
    { label: "Hebrew", value: "he" },
    { label: "Thai", value: "th" },
    { label: "Vietnamese", value: "vi" },
    { label: "Ukrainian", value: "uk" },
    { label: "Indonesian", value: "id" }
  ];  

  const [formData, setFormData] = useState({ language: languages[0].value, message: "" });
  const [error, setError] = useState("");
  const [translation, setTranslation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const translate = async () => {
    const { language, message } = formData;
    setIsLoading(true);
    try {
      const translatedText = await translateText(message, language);
      setTranslation(translatedText);
      // Automatically trigger text-to-speech after translation
      speakTranslation(translatedText);
    } catch (error) {
      setError("Translation failed, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!formData.message) {
      setError("Please enter a message.");
      return;
    }
    translate();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translation).then(() => {
      console.log("Copied to clipboard");
    }).catch(err => console.error("Failed to copy:", err));
  };

  const speakTranslation = (text) => {
    if (text) {
      const speech = new SpeechSynthesisUtterance(text);
      speech.lang = formData.language; // Set language code
      window.speechSynthesis.speak(speech);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="language-select" className="language-label">Select Language:</label>
        <select
          id="language-select"
          name="language"
          value={formData.language}
          onChange={handleInputChange}
        >
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>

        <textarea
          name="message"
          placeholder="Type your message here..."
          value={formData.message}
          onChange={handleInputChange}
        ></textarea>

        {error && <div className="error">{error}</div>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Translating..." : "Translate"}
        </button>
      </form>

      <div className="translation">
        {translation && (
          <>
            <div className="copy-btn" onClick={handleCopy}>
              {/* Copy button SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
                <path d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"/>
              </svg>
            </div>
            <p>{translation}</p>
            <button onClick={speakTranslation} className="speak-btn">🔊 Speak</button>
          </>
        )}
      </div>

      {/* Add the Rating Component here */}
      <Rating />
    </div>
  );
};

// About Page Component
const About = () => (
  <div>
    <h2>About the Translator App</h2>
    <p>This app allows users to translate text into multiple languages. It's a fast and efficient tool for teachers, students, and anyone who needs translations quickly.</p>
  </div>
);

// Contact Page Component
const Contact = () => (
  <div>
    <h2>Contact Me</h2>
    <p>If you need any help or have questions, contact us at:</p>
    <p>Phone: 302-287-7219</p>
    <p>Email: Jaden.Walker@cdpipelinedevshop.com</p>
  </div>
);

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
