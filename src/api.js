// api.js
const api = {
  uploadFile: async (file) => {
    // Simulate an API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate a mock response
    const response = {
      success: true,
      message: "File uploaded successfully",
      data: {
        fileId: "12345",
        transcription:
          "Capturing Every Word!  Your Speech Transcribed with Excellence!!"
        // Add any other relevant data you want to include in the response
      }
    };

    return response;
  }
};

export default api;
