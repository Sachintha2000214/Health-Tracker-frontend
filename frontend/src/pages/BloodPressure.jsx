import React, { useEffect, useState } from "react";
import axios from "axios";
import img1 from "../assets/img/bloodpressure.png";
import PatientReportList from "../components/PastReportsList";

const BloodPressure = () => {
  const [activeTab, setActiveTab] = useState("manual");
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [pulse, setPulse] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
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
    const docId = localStorage.getItem('selectedDoctorId');
    try {
      await axios.post("http://localhost:5555/api/patient/bloodpressure", {
        systolic,
        diastolic,
        pulse,
        userId,
        docId
      });
      setMessage("data saved successfully!");
    } catch (error) {
      setMessage("Error saving data.");
      window.location.reload();
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
    const docId = localStorage.getItem('selectedDoctorId');
    formData.append("userId", userId);
    formData.append("docId", docId);

    try {
      setMessage("Uploading...");
      const response = await axios.post("http://localhost:5555/api/patient/upload/bloodpressure", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(`PDF processed successfully: ${JSON.stringify(response.data.message)}`);
      window.location.reload();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div
      className="min-h-screen w-full relative"
      style={{
        backgroundImage: `url(${img1})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Lighter, more transparent gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(13, 148, 136, 0.12) 0%, rgba(59, 130, 246, 0.10) 50%, rgba(99, 102, 241, 0.13) 100%)",
          backdropFilter: "blur(3px)",
          zIndex: 1,
        }}
      ></div>

      <div className="relative z-10 w-full max-w-2xl mx-auto py-8 px-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          {/* Top image removed */}
         <h1 className="text-4xl font-bold text-teal-500 mb-2 drop-shadow-lg">Blood Pressure Monitor</h1>

          <p className="text-lg text-gray-700 bg-white/70 px-4 py-2 rounded-full inline-block shadow-sm">
            📅 {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl border border-white/20">
          {/* Tabs */}
          <div className="flex mb-8 bg-gray-100 rounded-2xl p-1">
            <button
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "manual"
                  ? "bg-teal-500 text-white shadow-lg transform scale-105"
                  : "text-gray-600 hover:text-teal-600 hover:bg-white/50"
              }`}
              onClick={() => {
                setActiveTab("manual");
                setMessage("");
                setSystolic("");
                setDiastolic("");
                setPulse("");
                setFile(null);
              }}
            >
              📝 Manual Entry
            </button>
            <button
              className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "pdf"
                  ? "bg-teal-500 text-white shadow-lg transform scale-105"
                  : "text-gray-600 hover:text-teal-600 hover:bg-white/50"
              }`}
              onClick={() => {
                setActiveTab("pdf");
                setMessage("");
                setSystolic("");
                setDiastolic("");
                setPulse("");
                setFile(null);
              }}
            >
              📄 Upload PDF
            </button>
          </div>

          {/* Manual Entry Form */}
          {activeTab === "manual" && (
            <form onSubmit={handleManualSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-gray-700 font-semibold block">
                    Systolic (mmHg)
                  </label>
                  <input
                    type="number"
                    value={systolic}
                    onChange={(e) => setSystolic(e.target.value)}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-300 bg-white/80 text-lg font-medium"
                    placeholder="120"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-gray-700 font-semibold block">
                    Diastolic (mmHg)
                  </label>
                  <input
                    type="number"
                    value={diastolic}
                    onChange={(e) => setDiastolic(e.target.value)}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-300 bg-white/80 text-lg font-medium"
                    placeholder="80"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-gray-700 font-semibold block">
                    Pulse (BPM)
                  </label>
                  <input
                    type="number"
                    value={pulse}
                    onChange={(e) => setPulse(e.target.value)}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-300 bg-white/80 text-lg font-medium"
                    placeholder="72"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:from-teal-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                💾 Save Blood Pressure Data
              </button>
            </form>
          )}

          {/* PDF Upload Form */}
          {activeTab === "pdf" && (
            <div className="space-y-6 text-center">
              <div className="border-2 border-dashed border-teal-300 rounded-2xl p-8 bg-teal-50/50 hover:bg-teal-50/80 transition-all duration-300">
                <div className="mb-4">
                  <div className="w-16 h-16 mx-auto bg-teal-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">Upload Blood Pressure Report</h3>
                  <p className="text-gray-600">Select a PDF file containing your blood pressure readings</p>
                </div>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-300 bg-white/80 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                />
              </div>
              <button
                onClick={handleFileUpload}
                className="w-full bg-gradient-to-r from-blue-500 to-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-600 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                📤 Upload PDF Report
              </button>
            </div>
          )}

          {/* Message Display */}
          {message && (
            <div className={`mt-6 p-4 rounded-xl text-center font-medium ${
              message.includes("Error") || message.includes("Please select")
                ? "bg-red-50 text-red-700 border border-red-200"
                : message.includes("Uploading")
                ? "bg-yellow-50 text-yellow-700 border border-yellow-200"
                : "bg-green-50 text-green-700 border border-green-200"
            }`}>
              {message.includes("Error") ? "❌ " : message.includes("Uploading") ? "⏳ " : "✅ "}
              {message}
            </div>
          )}
        </div>

        {/* Reports Section */}
        <div className="mt-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="bg-gradient-to-r from-teal-500 to-blue-600 text-white p-6">
              <h2 className="text-2xl font-bold text-center">📊 Your Blood Pressure History</h2>
            </div>
            <div className="p-6">
              <PatientReportList patientId={userId.id} reportType={"bloodpressure"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodPressure;
