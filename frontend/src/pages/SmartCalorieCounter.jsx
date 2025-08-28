import React, { useState, useEffect } from "react";
import { Camera, X, CheckCircle, AlertCircle } from "lucide-react";

const SmartCalorieCounter = () => {
  const currentDate = new Date().toLocaleDateString("en-GB");
  const [user, setUser] = useState(null);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const mockUser = { name: "User" };
    setUser(mockUser);
  }, []);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
        setError(null);
      } else {
        setError("Please select an image file");
      }
    }
  };

  const analyzePhoto = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await fetch("http://localhost:5000/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setAnalysisResult(result);
    } catch (err) {
      setError(`Failed to analyze image: ${err.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetPhotoUpload = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setAnalysisResult(null);
    setError(null);
    setIsAnalyzing(false);
  };

  const closePhotoModal = () => {
    setShowPhotoUpload(false);
    resetPhotoUpload();
  };

  return (
    <div className="bg-gradient-to-r from-teal-100 to-blue-100 min-h-screen flex flex-col">
      <div className="text-center pt-12 pb-8">
        <h1 className="text-4xl font-bold text-orange-600 mb-4"> Pre Bite Calorie Counter </h1>
        <div className="space-y-2">
          <p className="text-xl text-gray-700">Hey </p>
          <p className="text-gray-500">{currentDate}</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-8">
          <h2 className="text-xl text-gray-700"></h2>
        </div>

        <div className="space-y-6">
          <button
            onClick={() => setShowPhotoUpload(true)}
            className="w-full block bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200 border-2 border-transparent hover:border-orange-200 hover:scale-105"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                  <Camera className="w-10 h-10 text-orange-600" />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-1">UPLOAD YOUR MEAL </h3>
                  <p className="text-gray-600">Take a photo to get instant calorie info</p>
                </div>
              </div>
              <div className="text-orange-400">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>
        </div>

        <div className="text-center mt-12 pb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-gray-600">Keep tracking, you're doing great! 🌟</p>
          </div>
        </div>
      </div>

      {showPhotoUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Scan Food Photo</h2>
                <button onClick={closePhotoModal} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {!selectedFile && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Select a photo of your food</p>
                  <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" id="photo-upload" />
                  <label
                    htmlFor="photo-upload"
                    className="bg-orange-500 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-orange-600 transition-colors inline-block"
                  >
                    Choose Photo
                  </label>
                </div>
              )}

              {selectedFile && previewUrl && (
                <div className="space-y-4">
                  <div className="text-center">
                    <img src={previewUrl} alt="Food preview" className="max-w-full h-48 object-cover rounded-lg mx-auto" />
                  </div>

                  {!analysisResult && !isAnalyzing && (
                    <div className="flex space-x-3">
                      <button
                        onClick={analyzePhoto}
                        className="flex-1 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold"
                      >
                        Analyze Photo
                      </button>
                      <button
                        onClick={resetPhotoUpload}
                        className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Change Photo
                      </button>
                    </div>
                  )}

                  {isAnalyzing && (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                      <p className="text-gray-600">Analyzing your food photo...</p>
                    </div>
                  )}

                  {analysisResult && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                        <h3 className="font-semibold text-green-800">Analysis Complete!</h3>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="font-medium">Food:</span> {analysisResult.prediction}
                        </p>
                        <p>
                          <span className="font-medium">Calories:</span> {analysisResult.calories}
                        </p>
                      </div>
                      <div className="mt-4 flex space-x-3">
                        <button
                          onClick={resetPhotoUpload}
                          className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors"
                        >
                          Scan Another
                        </button>
                        <button
                          onClick={closePhotoModal}
                          className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center">
                        <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                        <p className="text-red-700 text-sm">{error}</p>
                      </div>
                      <button
                        onClick={() => setError(null)}
                        className="mt-2 text-red-600 text-sm hover:text-red-800"
                      >
                        Try Again
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartCalorieCounter;
