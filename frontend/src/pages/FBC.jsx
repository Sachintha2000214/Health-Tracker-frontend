import React, { useEffect, useState } from "react";
import axios from "axios";
import img1 from "../assets/img/fbc.png"
import PatientReportList from "../components/PastReportsList";

const FBC = () => {
  const [activeTab, setActiveTab] = useState("manual"); // Active tab
  const [rbc, setRbc] = useState("");
  const [wbc, setWbc] = useState("");
  const [hemoglobin, setHemoglobin] = useState("");
  const [platelet, setPlatelet] = useState("");
  const [message, setMessage] = useState("");
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


    try {
      await axios.post("http://localhost:5555/api/patient/fbc", {
        userId,
        docId,
        rbc,
        wbc,
        hemoglobin,
        platelet,
      });
      setMessage("FBC data saved successfully!");
    } catch (error) {
      setMessage("Error saving FBC data.");
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
      const response = await axios.post("http://localhost:5555/api/patient/upload/fbc", formData, {
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
      <h2 className="text-xl font-bold text-center text-gray-700 mb-2">FBC</h2>
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
      className="mx-auto w-1/4" 
        />
     </div>
        

      {/* Tab Content */}
      <div className="tab-content mt-4">
        {/* Manual Entry Form */}
        {activeTab === "manual" && (
          <form onSubmit={handleManualSubmit}>
            <div className="space-y-4">
              {/* RBC */}
              <div>
                <label className="block text-sm font-medium text-gray-700">RBC</label>
                <input
                  type="number"
                  value={rbc}
                  onChange={(e) => setRbc(e.target.value)}
                  className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                  placeholder="Enter value"
                  required
                />
              </div>
              {/* WBC */}
              <div>
                <label className="block text-sm font-medium text-gray-700">WBC</label>
                <input
                  type="number"
                  value={wbc}
                  onChange={(e) => setWbc(e.target.value)}
                  className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                  placeholder="Enter value"
                  required
                />
              </div>
              {/* Hemoglobin */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Hemoglobin</label>
                <input
                  type="number"
                  value={hemoglobin}
                  onChange={(e) => setHemoglobin(e.target.value)}
                  className="mt-2 p-2 w-full border border-gray-300 rounded-md"
                  placeholder="Enter value"
                  required
                />
              </div>
              {/* Platelet */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Platelet</label>
                <input
                  type="number"
                  value={platelet}
                  onChange={(e) => setPlatelet(e.target.value)}
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

      {/* Additional Functions */}
      {/* <div className="mt-6 space-x-4 flex justify-center">
        <button
          onClick={() => console.log("Viewing history...")}
          className="bg-blue-500 text-white px-6 py-2 rounded-md transition-all hover:bg-blue-600"
        >
          History
        </button>
        <button
          onClick={() => console.log("Adding new report...")}
          className="bg-blue-500 text-white px-6 py-2 rounded-md transition-all hover:bg-blue-600"
        >
          Add Report
        </button>
      </div> */}
    </div>
    <PatientReportList patientId={userId.id} reportType={"fbc"} />
    </div>
  );
};

export default FBC;
