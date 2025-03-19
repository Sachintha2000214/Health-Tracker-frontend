import React, { useState } from "react";
import axios from "axios";

const BloodPressure = () => {
  const [activeTab, setActiveTab] = useState("manual");
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [pulse, setPulse] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    const user = sessionStorage.getItem("user");
    const userObject = JSON.parse(user);
    const userId = userObject.id;
    try {
      await axios.post("http://localhost:5555/api/patient/bloodpressure", {
        systolic,
        diastolic,
        pulse,
        userId
      });
      setMessage("data saved successfully!");
    } catch (error) {
      setMessage("Error saving data.");
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files);
    console.log(file)
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
    formData.append("userId", userId);
    for (let pair of formData.entries()) {
      console.log("FormData Key:", pair[0], "=>", pair[1]);
    }

    try {
      setMessage("Uploading...");
      const response = await axios.post("http://localhost:5555/api/patient/upload/bloodpressure", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(`PDF processed successfully: ${JSON.stringify(response.data.message)}`);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-100 to-blue-100 flex-col">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-bold text-center text-gray-700 mb-2">Blood Pressure</h2>
        <p className="text-center text-gray-500 text-sm">Date: {new Date().toLocaleDateString()}</p>

        {/* Tabs */}
        <div className="flex justify-center my-4">
          <button
            className={`w-1/2 py-2 rounded-t-lg ${
              activeTab === "manual" ? "bg-teal-500 text-white" : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => (setActiveTab("manual") , setMessage(""), setSystolic(""), setDiastolic(""), setPulse(""), setFile(""))}
          >
            Manual Entry
          </button>
          <button
            className={`w-1/2 py-2 rounded-t-lg ${
              activeTab === "pdf" ? "bg-teal-500 text-white" : "bg-gray-200 text-gray-600"
            }`}
            onClick={() => (setActiveTab("pdf"), setMessage(""), setSystolic(""), setDiastolic(""), setPulse(""), setFile(""))}
          >
            Upload PDF
          </button>
        </div>

        {/* Manual Entry Form */}
        {activeTab === "manual" && (
          <form onSubmit={handleManualSubmit} className="space-y-3">
            <div>
              <label className="text-gray-600 block mb-1">Systolic</label>
              <input
                type="number"
                value={systolic}
                onChange={(e) => setSystolic(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="Enter value"
              />
            </div>
            <div>
              <label className="text-gray-600 block mb-1">Diastolic</label>
              <input
                type="number"
                value={diastolic}
                onChange={(e) => setDiastolic(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="Enter value"
              />
            </div>
            <div>
              <label className="text-gray-600 block mb-1">Pulse</label>
              <input
                type="number"
                value={pulse}
                onChange={(e) => setPulse(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                placeholder="Enter value"
              />
            </div>
            <button className="w-full bg-teal-500 text-white py-2 rounded-lg">
              Save
            </button>
          </form>
        )}

        {/* PDF Upload Form */}
        {activeTab === "pdf" && (
          <div className="space-y-3">
            <label className="text-gray-600 block mb-1">Upload PDF</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleFileUpload}
              className="w-full bg-teal-500 text-white py-2 rounded-lg"
            >
              Upload
            </button>
          </div>
        )}

        {message && <p className="text-center text-sm text-green-600 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default BloodPressure;
