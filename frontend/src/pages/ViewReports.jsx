import React, { useEffect, useState } from "react";
import axios from "axios";
import PatientHistoryModal from "../components/PatientHistoryModal";
import AddCommentModal from "../components/AddCommentModal";
import { useLocation } from "react-router-dom";
import ReportTable from "../components/ReportTable";

const ViewReports = () => {
  const [reports, setReports] = useState([]);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [patientHistory, setPatientHistory] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState(null);
  const [selectedReportType, setSelectedReportType] = useState(null);
  const [columns, setColumns] = useState([]);

  const location = useLocation();
  const reportType = location.state?.reportType;
  let column = [];
    console.log(reportType);
  const bpColumns = [
    { key: "date", label: "Date", format: (val) => new Date(val).toLocaleDateString() },
    { key: "systolic", label: "Systolic" },
    { key: "diastolic", label: "Diastolic" },
    { key: "pulse", label: "Pulse" },
    { key: "patientId", label: "Patient Id" },
    { key: "doctorComment", label: "Comment" },
  ];
  const sugarColumns = [
    { key: "date", label: "Date", format: (val) => new Date(val).toLocaleDateString() },
    { key: "type", label: "Type" },
    { key: "value", label: "Value" },
    { key: "userId", label: "Patient Id" },
    { key: "doctorComment", label: "Comment" },

  ];
  const fbcColumns = [
    { key: "date", label: "Date", format: (val) => new Date(val).toLocaleDateString() },
    { key: "haemoglobin", label: "Haemoglobin" },
    { key: "wbc", label: "WBC" },
    { key: "platelet", label: "Platelet" },
    { key: "patientId", label: "Patient Id" },
    { key: "doctorComment", label: "Comment" },
  ];
  const lipidColumns = [
    { key: "date", label: "Date", format: (val) => new Date(val).toLocaleDateString() },
    { key: "ldl", label: "LDL" },
    { key: "hdl", label: "HDL" },
    { key: "triglycerides", label: "Triglycerides" },
    { key: "cholesterol", label: "Cholesterol" },
    { key: "patientId", label: "Patient Id" },
    { key: "doctorComment", label: "Comment" },
  ];
  
  const getColumnsByType = (type) => {
    console.log("type", type);
    switch (type) {
      case "Blood Pressure":
        return bpColumns;
      case "sugar":
      case "Blood Sugar":
        return sugarColumns;
      case "FBC":
        return fbcColumns;
      case "Lipid Profile":
        return lipidColumns;
      default:
        return [];
    }
    
  };

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
  
      let url = "";
      setColumns(getColumnsByType(reportType));
        console.log(column)
      // 🔁 Set endpoint according to report type
      switch (reportType) {
        case "Blood Pressure":
          url = `http://localhost:5555/api/patient/getbloodpressurebydoc/${storedUser.doctornumber}`;
          break;
        case "Blood Sugar":
          url = `http://localhost:5555/api/patient/getbloodsugarbydoc/${storedUser.doctornumber}`;
          break;
        case "Lipid Profile":
          url = `http://localhost:5555/api/patient/getlipidbydoc/${storedUser.doctornumber}`;
          break;
        case "FBC":
          url = `http://localhost:5555/api/patient/getfbcbydoc/${storedUser.doctornumber}`;
          break;
        default:
          console.warn("Unknown report type");
          return;
      }
  
      // 📡 Fetch the data using the dynamic URL
      axios
        .get(url)
        .then((res) => {
          setReports(res.data);
          
        })
        .catch((err) => {
          console.error("Error fetching reports:", err);
        });
    }
    
  }, [reportType]);
  

  const handleViewHistory = (patientId, type) => {
    console.log(patientId, type)
    let url = "";
    let columns = [];
    let title = "";
  
    switch (type) {
      case "Blood Pressure":
        url = `http://localhost:5555/api/patient/getbloodpressurebypatient/${patientId}`;
        columns = bpColumns;
        title = "Blood Pressure History";
        break;
      case "Blood Sugar":
        url = `http://localhost:5555/api/patient/getbloodsugarbypatient/${patientId}`;
        columns = sugarColumns;
        title = "Blood Sugar History";
        break;
      case "FBC":
        url = `http://localhost:5555/api/patient/getfbcbypatient/${patientId}`;
        columns = fbcColumns;
        title = "FBC History";
        break;
      case "Lipid Profile":
        url = `http://localhost:5555/api/patient/getlipidbypatient/${patientId}`;
        columns = lipidColumns;
        title = "Lipid Profile History";
        break;
      default:
        return;
    }
  
    axios
      .get(url)
      .then((res) => {
        setPatientHistory(res.data);
        setSelectedPatientId(patientId);
        setSelectedColumns(columns);
        setModalTitle(title);
        setIsModalOpen(true);
      })
      .catch((err) => {
        console.error("Error fetching history:", err);
      });
  };

  const handleCommentSubmit = (docId, comment, type) => {
    let url = "";
  
    // Match backend routes per type
    switch (type) {
      case "Blood Pressure":
        url = `http://localhost:5555/api/patient/updatecomment/${docId}`;
        break;
      case "Blood Sugar":
        url = `http://localhost:5555/api/patient/updatebloodsugarcomment/${docId}`;
        break;
      case "FBC":
        url = `http://localhost:5555/api/patient/updatefbccomment/${docId}`;
        break;
      case "Lipid Profile":
        url = `http://localhost:5555/api/patient/updatelipidcomment/${docId}`;
        break;
      default:
        return;
    }
  
    axios
      .put(url, { comment })
      .then(() => {
        alert("Comment added successfully!");
      })
      .catch((err) => {
        console.error("Failed to add comment:", err);
      });
  };
  
  
  
  return (
    <div className="bg-gradient-to-r from-teal-100 to-blue-100 min-h-screen flex flex-col">
     <div className="p-6 bg-white rounded-xl shadow-md max-w-4xl mx-auto mt-8">
  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Patient {reportType} Reports</h2>
  <ReportTable
  columns={columns}
  data={reports}
  onViewHistory={(row) => {
    setSelectedPatientId(row.patientId);
    setModalTitle(`History - ${reportType}`);
    setSelectedColumns(getColumnsByType(reportType)); // if you have this function
    handleViewHistory(row.patientId, reportType); // 👈 This must be called!
    setIsModalOpen(true);
  }}
  onAddComment={(row) => {
    setSelectedDocId(row.id); // ✅ capture the Firebase docId for update
    setSelectedReportType(reportType); // ✅ capture which type (e.g., bloodpressure)
    setIsCommentModalOpen(true); // ✅ then open the modal
  }}
/>

</div>
<PatientHistoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        historyData={patientHistory}
        patientId={selectedPatientId}
        columns={selectedColumns}
        title={modalTitle}
      />
    <AddCommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        onSubmit={handleCommentSubmit}
        docId={selectedDocId}
        reportType={selectedReportType}
        />
</div>
  );
};

export default ViewReports;
