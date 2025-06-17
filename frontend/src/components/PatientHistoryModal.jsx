import React from "react";

const PatientHistoryModal = ({ isOpen, onClose, historyData, patientId, columns, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-3xl">
        <h2 className="text-xl font-semibold mb-4">
          {title} - <span className="text-blue-600">{patientId}</span>
        </h2>

        <table className="w-full text-sm text-left border">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="border px-2 py-1">{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {historyData.map((record, index) => (
              <tr key={index}>
                {columns.map((col) => (
                  <td key={col.key} className="border px-2 py-1">
                    {col.format ? col.format(record[col.key]) : record[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-right mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientHistoryModal;
