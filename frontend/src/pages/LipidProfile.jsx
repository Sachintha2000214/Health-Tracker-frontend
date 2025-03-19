import React, { useState } from "react";
import axios from "axios";

const LipidProfile = () => {
    const [activeTab, setActiveTab] = useState("manual");
    const [cholesterol, setCholesterol] = useState("");
    const [hdl, setHdl] = useState("");
    const [ldl, setLdl] = useState("");
    const [triglycerides, setTriglycerides] = useState("");
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState(""); 

    const handleManualSubmit = async (e) => {
      e.preventDefault();
      const user = sessionStorage.getItem("user");
    const userObject = JSON.parse(user);
    const userId = userObject.id;
  
      try {
        await axios.post("http://localhost:5555/api/patient/lipidprofile", {
          userId:userId,
          cholesterol,
          ldl,
          hdl,
          triglycerides
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
      formData.append("userId", userId);
      for (let pair of formData.entries()) {
        console.log("FormData Key:", pair[0], "=>", pair[1]);
      }
  
      try {
        setMessage("Uploading...");
        const response = await axios.post("http://localhost:5555/api/patient/upload/lipidprofile", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        setMessage(`PDF processed successfully: ${JSON.stringify(response.data.message)}`);
      } catch (error) {
        setMessage(`Error: ${error.message}`);
      }
    };

    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-100 to-blue-100 min-h-screen flex flex-col">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-xl font-bold text-center text-gray-700 mb-2">Lipid Profile</h2>
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
  
        {/* Tab Content */}
        <div className="tab-content mt-4">
          {/* Manual Entry Form */}
          {activeTab === "manual" && (
            <form onSubmit={handleManualSubmit}>
              <div className="space-y-4">
                {/* Test Type Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Enter the Cholesterol</label>
                  <input
                    type="number"
                    value={cholesterol}
                    onChange={(e) => setCholesterol(e.target.value)}
                    className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                    placeholder="Enter value"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Enter the Hdl</label>
                  <input
                    type="number"
                    value={hdl}
                    onChange={(e) => setHdl(e.target.value)}
                    className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                    placeholder="Enter value"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Enter the Ldl</label>
                  <input
                    type="number"
                    value={ldl}
                    onChange={(e) => setLdl(e.target.value)}
                    className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                    placeholder="Enter value"
                    required
                  />
                </div>
  
                {/* Test Value Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Enter the Triglycerides</label>
                  <input
                    type="number"
                    value={triglycerides}
                    onChange={(e) => setTriglycerides(e.target.value)}
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
      </div>
    );
  };

export default LipidProfile;
