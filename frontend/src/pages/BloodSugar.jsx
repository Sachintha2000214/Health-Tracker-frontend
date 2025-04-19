import React, { useEffect, useState } from "react";
import axios from "axios";
import img1 from "../assets/img/bloodsugar.png";
import PatientReportList from "../components/PastReportsList";


const BloodSugar = () => {
  const [activeTab, setActiveTab] = useState("manual"); // Active tab
  const [type, setTestType] = useState(""); // Test Type field
  const [value, setTestValue] = useState(""); // Value field
  const [message, setMessage] = useState(""); // For success/error messages
  const [file, setFile] = useState(null);
   const [userId, setUserId] = useState("");

  useEffect(() => {
    const userObject = JSON.parse(sessionStorage.getItem("user"));
    setUserId(userObject);
    console.log(userId.id)
  }, []);


  // Handle manual submit
  const handleManualSubmit = async (e) => {
    e.preventDefault();
    const user = sessionStorage.getItem("user");
    const userObject = JSON.parse(user);
    const userId = userObject.id;
    const docId = localStorage.getItem('selectedDoctorId');


    if (!userId) {
      setMessage("User not logged in!");
      return;
    }

    try {
      await axios.post("http://localhost:5555/api/patient/bloodsugar", {
        userId:userId,
        docId: docId,
        type: type,
        value: value,
      });
      setMessage("Manual data saved successfully!");
    } catch (error) {
      setMessage("Error saving manual data.");
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
    const docId = localStorage.getItem('selectedDoctorId');
    formData.append("userId", userId);
    formData.append("docId", docId);
    for (let pair of formData.entries()) {
      console.log("FormData Key:", pair[0], "=>", pair[1]);
    }

    try {
      setMessage("Uploading...");
      const response = await axios.post("http://localhost:5555/api/patient/upload/bloodsugar", formData, {
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
      <h2 className="text-xl font-bold text-center text-gray-700 mb-2">Blood Sugar</h2>
      <p className="text-center text-gray-500 text-sm">Date: {new Date().toLocaleDateString()}</p>

      {/* Tabs */}
      <div className="flex justify-between mt-6">
        <button
          className={`px-4 py-2 text-sm rounded-t-md w-full text-center ${activeTab === "manual" ? "bg-teal-500 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setActiveTab("manual")}
        >
          Manual Entry
        </button>
        <button
          className={`px-4 py-2 text-sm rounded-t-md w-full text-center ${activeTab === "pdf" ? "bg-teal-500 text-white" : "bg-gray-200 text-gray-700"}`}
          onClick={() => setActiveTab("pdf")}
        >
          Upload PDF
        </button>
      </div>
     <div>
                  <br/>
                  <img 
                    src={img1} 
                    alt="blood sugar" 
                    className="mx-auto w-1/4" 
                  />
     </div>
      {/* Tab Content */}
      <div className="tab-content mt-4">
        {/* Manual Entry Form */}
        {activeTab === "manual" && (
          <form onSubmit={handleManualSubmit}>
            <div className="space-y-4">
              {/* Test Type Selection */}
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

              {/* Test Value Input */}
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
           <button
             onClick={handleFileUpload}
             className="w-full bg-teal-500 text-white py-2 rounded-lg"
           >
             Upload
           </button>
         </div>
        )}

        {/* Message Display */}
        {message && <p className="mt-4 text-center text-lg text-red-500">{message}</p>}
      </div>
    </div>
    <PatientReportList patientId={userId.id} reportType={"bloodsugar"} />
    </div>
  );
};

export default BloodSugar;
