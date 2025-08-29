// PatientReportHistory.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const apiMap = {
  "bloodpressure": "/getbloodpressurebypatient/",
  "bloodsugar": "/getbloodsugarbypatient/",
  "fbc": "/getfbcbypatient/",
  "lipid": "/getlipidbypatient/",
};

const columnMap = {
  bloodpressure: ["date", "systolic", "diastolic", "pulse", "doctorComment"],
  bloodsugar: ["date","type", "value", "doctorComment"],
  fbc: ["date", "haemoglobin", "rbc", "wbc", "platelet", "doctorComment"],
  lipid: ["date", "hdl", "ldl", "triglycerides", "cholesterol", "doctorComment"],
};

const PatientReportList = ({ patientId, reportType }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log(patientId, reportType)
    if (!patientId || !reportType) return;
    const endpoint = apiMap[reportType.toLowerCase()];
    if (!endpoint) return;

    axios
      .get(`https://health-tracker-backend-s5ei-umr8y997a.vercel.app//api/patient${endpoint}${patientId}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.error("Error fetching history:", err));
  }, [patientId, reportType]);

  const renderRow = (item, index) => {
    return (
      <tr key={index} className="border-b text-sm">
        {columnMap[reportType.toLowerCase()].map((field) => (
          <td key={field} className="px-4 py-2 text-center">
            {field=="date"
            ? new Date(item[field]).toLocaleDateString()
            : item[field] || "-"}
          </td>
        ))}
      </tr>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4 text-teal-600">
        {reportType.replace(/^(\w)/, (c) => c.toUpperCase())} Report History
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-teal-100">
              {columnMap[reportType.toLowerCase()].map((col) => (
                <th
                  key={col}
                  className="px-4 py-2 text-left text-sm font-medium text-teal-800"
                >
                  {col.charAt(0).toUpperCase() + col.slice(1)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{data.map(renderRow)}</tbody>
        </table>
      </div>
    </div>
  );
};

export default PatientReportList;
