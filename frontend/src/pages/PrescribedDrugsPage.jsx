import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function PrescribedDrugsPage() {
  const location = useLocation();
  const { patientId } = location.state || {};
  const [drugs, setDrugs] = useState([]);
  const [newDrug, setNewDrug] = useState('');
  const currentDate = new Date().toLocaleDateString();

  const addDrug = () => {
    if (newDrug.trim() !== '') {
      setDrugs([...drugs, newDrug]);
      setNewDrug('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="bg-blue-600 text-white p-4 rounded-lg shadow-md mb-6">
        <h1 className="text-2xl font-bold">Prescribed Drugs</h1>
      </header>

      <main className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="mb-4">
          <p><strong>Patient ID:</strong> {patientId}</p>
          <p><strong>Date:</strong> {currentDate}</p>
        </div>

        <div className="space-y-4">
          <input
            type="text"
            value={newDrug}
            onChange={(e) => setNewDrug(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter drug name"
          />
          <button
            onClick={addDrug}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300"
          >
            Add Drug
          </button>
        </div>

        {drugs.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-800">Prescribed Drugs</h3>
            <ul className="mt-2 list-disc pl-5">
              {drugs.map((drug, index) => (
                <li key={index} className="text-gray-700">
                  {drug}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}

export default PrescribedDrugsPage;
