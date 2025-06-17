import React, { useState, useEffect } from "react";
import axios from "axios";
import img1 from "../assets/img/bloodsugar.png";
import img2 from "../assets/img/bloodsugartest1.jpeg";
import img3 from "../assets/img/bloodsugartest2.png";
import img4 from "../assets/img/bloodsugartest3.png";
import PatientReportList from "../components/PastReportsList";

const LeftSideImageSlider = () => {
  const images = [img2, img3, img4];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="left-image-slider">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Blood sugar ${index}`}
          className={`slider-image ${index === currentIndex ? "visible" : "hidden"}`}
        />
      ))}
      <style jsx>{`
        .left-image-slider {
          position: fixed;
          top: 0;
          left: 0;
          width: 300px;
          height: 100vh;
          overflow: hidden;
          z-index: 0;
        }
        .slider-image {
          position: absolute;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          transition: opacity 1s ease-in-out;
        }
        .slider-image.visible {
          opacity: 1;
          z-index: 1;
        }
        .slider-image.hidden {
          opacity: 0;
          z-index: 0;
        }
      `}</style>
    </div>
  );
};

const BloodSugar = () => {
  const [activeTab, setActiveTab] = useState("manual");
  const [type, setTestType] = useState("");
  const [value, setTestValue] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const userObject = JSON.parse(sessionStorage.getItem("user"));
    setUserId(userObject);
    // eslint-disable-next-line
  }, []);

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    const user = sessionStorage.getItem("user");
    const userObject = JSON.parse(user);
    const userId = userObject.id;
    const docId = localStorage.getItem("selectedDoctorId");

    if (!userId) {
      setMessage("User not logged in!");
      return;
    }

    try {
      await axios.post("http://localhost:5555/api/patient/bloodsugar", {
        userId,
        docId,
        type,
        value,
      });
      setMessage("Manual data saved successfully!");
      window.location.reload();
    } catch (error) {
      setMessage("Error saving manual data.");
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      setMessage("Please select a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    const user = sessionStorage.getItem("user");
    const userObject = JSON.parse(user);
    const userId = userObject.id;
    const docId = localStorage.getItem("selectedDoctorId");
    formData.append("userId", userId);
    formData.append("docId", docId);

    try {
      setMessage("Uploading...");
      const response = await axios.post(
        "http://localhost:5555/api/patient/upload/bloodsugar",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setMessage(`PDF processed successfully: ${JSON.stringify(response.data.message)}`);
      window.location.reload();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <LeftSideImageSlider />
      <div className="relative z-10 flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-100 to-blue-100 flex-col ml-[300px] px-6">
        <div
          className="bg-white p-6 rounded-xl shadow-lg w-96 relative"
          style={{
            backgroundImage: `url(${img1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Optional overlay for readability */}
          <div
            className="absolute inset-0 bg-white/70 rounded-xl pointer-events-none"
            style={{ mixBlendMode: "lighten" }}
          ></div>

          <div className="relative z-10">
            <h2 className="text-xl font-bold text-center text-gray-700 mb-2">Blood Sugar</h2>
            <p className="text-center text-gray-500 text-sm">Date: {new Date().toLocaleDateString()}</p>

            {/* Tabs */}
            <div className="flex justify-between mt-6">
              <button
                className={`px-4 py-2 text-sm rounded-t-md w-full text-center ${
                  activeTab === "manual" ? "bg-teal-500 text-white" : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setActiveTab("manual")}
              >
                Manual Entry
              </button>
              <button
                className={`px-4 py-2 text-sm rounded-t-md w-full text-center ${
                  activeTab === "pdf" ? "bg-teal-500 text-white" : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => setActiveTab("pdf")}
              >
                Upload PDF
              </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content mt-4">
              {/* Manual Entry Form */}
              {activeTab === "manual" && (
                <form onSubmit={handleManualSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Select Your Test Type</label>
                      <select
                        value={type}
                        onChange={(e) => setTestType(e.target.value)}
                        className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                        required
                      >
                        <option value="">Select test type</option>
                        <option value="fasting">Fasting</option>
                        <option value="post-prandial">Post Prandial</option>
                        <option value="random">Random</option>
                        <option value="hba1c">HbA1c</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Enter the Value</label>
                      <input
                        type="number"
                        value={value}
                        onChange={(e) => setTestValue(e.target.value)}
                        className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                        placeholder="Enter value"
                        required
                      />
                    </div>

                    <button type="submit" className="mt-4 bg-teal-500 text-white py-2 rounded-md w-full">
                      Save
                    </button>
                  </div>
                </form>
              )}

              {/* PDF Upload Tab */}
              {activeTab === "pdf" && (
                <div className="space-y-3">
                  <label className="text-gray-600 block mb-1">Upload PDF</label>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                  />
                  <button onClick={handleFileUpload} className="w-full bg-teal-500 text-white py-2 rounded-lg">
                    Upload
                  </button>
                </div>
              )}

              {/* Message Display */}
              {message && <p className="mt-4 text-center text-lg text-red-500">{message}</p>}
            </div>
          </div>
        </div>
        <PatientReportList patientId={userId.id} reportType={"bloodsugar"} />
      </div>
    </>
  );
};

export default BloodSugar;
