import React, { useEffect, useState } from "react";
import axios from "axios";
import PatientHistoryModal from "../components/PatientHistoryModal";
import AddCommentModal from "../components/AddCommentModal";
import { useLocation, Link } from "react-router-dom"; // Link for floating chat button
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
    { key: "patientId", label: "Patient Id" },
    { key: "doctorComment", label: "Comment" },
  ];
  const fbcColumns = [
    { key: "date", label: "Date", format: (val) => new Date(val).toLocaleDateString() },
    { key: "haemoglobin", label: "haemoglobin" },
    { key: "wbc", label: "WBC" },
    { key: "platelet", label: "platelet" },
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
        window.location.reload();
      })
      .catch((err) => {
        console.error("Failed to add comment:", err);
      });
  };

  return (
    <div className="bg-gradient-to-r from-teal-100 to-blue-100 min-h-screen flex flex-col">
      <div className="p-6 bg-white rounded-xl shadow-md max-w-4xl mx-auto mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Patient {reportType} Reports
        </h2>

        <ReportTable
          columns={columns}
          data={reports}
          onViewHistory={(row) => {
            setSelectedPatientId(row.patientId);
            setModalTitle(`History - ${reportType}`);
            setSelectedColumns(getColumnsByType(reportType));
            handleViewHistory(row.patientId, reportType); // 👈 opens chat preselected
            setIsModalOpen(true);
          }}
          onAddComment={(row) => {
            setSelectedDocId(row.id);
            setSelectedReportType(reportType);
            setIsCommentModalOpen(true);
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

      {/* 🔘 Floating Chat Button (always available) */}
      <Link
        to="/doctor-chat"
        className="fixed z-50 bottom-6 right-6 h-14 w-14 rounded-full bg-teal-600 text-white shadow-lg hover:shadow-xl active:scale-95 transition flex items-center justify-center"
        title="Open Doctor Chat"
      >
        {/* chat bubble icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8 10h8M8 14h6M21 12c0 4.418-4.477 8-10 8-1.59 0-3.09-.29-4.43-.81L3 20l.84-3.36A7.94 7.94 0 0 1 1 12C1 7.582 5.477 4 11 4s10 3.582 10 8Z"
          />
        </svg>
      </Link>
    </div>
  );
};

export default ViewReports;
