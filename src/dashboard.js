import React, { useState } from "react";
import api from "./api.js";
import "./dashboard.css";

const Dashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [transcriptionStarted, setTranscriptionStarted] = useState(false);
  const [transcriptionText, setTranscriptionText] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleLanguageSelection = (event) => {
    const language = event.target.value;
    setSelectedLanguage(language);
  };

  const handleTranscriptionStart = async () => {
    setTranscriptionStarted(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("language", selectedLanguage);

      const response = await api.uploadFile(formData);

      console.log(response);

      if (response.success) {
        const transcription = response.data.transcription;
        setTranscriptionText(transcription);
      } else {
        console.error("Error transcribing file:", response.message);
      }
    } catch (error) {
      console.error("Error transcribing file:", error);
    } finally {
      setTranscriptionStarted(false);
    }
  };

  const handleTranscriptionStop = () => {
    setTranscriptionStarted(false);
  };

  const handleDownloadTranscription = () => {
    const element = document.createElement("a");
    const file = new Blob([transcriptionText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "transcription.txt";
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="dashboard-container">
      {/* Input file component */}
      <div className="file-upload">
        <label htmlFor="file-input">Upload File:</label>
        {/* <h2>Start New Transcription </h2> */}
        <input
          id="file-input"
          type="file"
          accept=".mp4,.avi,.wav"
          onChange={handleFileUpload}
        />
      </div>

      {/* Langugae selection component */}
      <div className="language-selection">
        <label htmlFor="language-select">Select Language:</label>
        <select
          id="language-select"
          value={selectedLanguage}
          onChange={handleLanguageSelection}
        >
          <option value="">-- Select Language --</option>
          <option value="en">English</option>
        </select>
      </div>

      {/* Controls Buttons */}
      <div className="transcription-controls">
        <div className="start-stop-container">
          <button
            onClick={handleTranscriptionStart}
            disabled={
              !selectedFile || !selectedLanguage || transcriptionStarted
            }
          >
            Start
          </button>
          <div className="progress-indicator">
            {transcriptionStarted && <div className="loading-spinner"></div>}
          </div>
          <button
            onClick={handleTranscriptionStop}
            disabled={!transcriptionStarted}
          >
            Stop
          </button>
        </div>

        <div>
          <div className="transcription-output">{transcriptionText}</div>
          <div className="transcription-actions">
            <button
              onClick={handleDownloadTranscription}
              disabled={!transcriptionText}
            >
              Download Transcription
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
