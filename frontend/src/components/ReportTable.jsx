import React from "react";

const ReportTable = ({ columns, data, onViewHistory, onAddComment }) => {
    console.log("ssssss",columns)
    console.log(onAddComment);
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse rounded-lg overflow-hidden shadow-md">
        <thead className="bg-teal-100 text-teal-800">
          <tr>
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-2 text-left font-semibold">
                {col.label}
              </th>
            ))}
            <th className="px-4 py-2 text-left font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => {
            const isCommented = row.commented;
            return (
              <tr key={idx} className={`border-b ${isCommented ? "bg-green-50" : "bg-white"}`}>
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-2">
                    {col.format ? col.format(row[col.key]) : row[col.key]}
                  </td>
                ))}

                {/* Actions */}
                <td className="px-4 py-2 flex flex-col sm:flex-row gap-2">
                  {isCommented ? (
                    <span className="bg-green-200 text-green-700 px-3 py-1 rounded-full text-sm">
                      Commented
                    </span>
                  ) : (
                    <button
                      onClick={() => onAddComment(row)}
                      className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded-md"
                    >
                      Add Comment
                    </button>
                  )}
                  <button
                    onClick={() => onViewHistory(row)}
                    className="bg-purple-500 hover:bg-purple-600 text-white text-sm px-3 py-1 rounded-md"
                  >
                    View History
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReportTable;
