import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function DoctorDashboard() {
  const [ptNumber, setPtNumber] = useState('');
  const [patientData, setPatientData] = useState(null);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // Handle patient search
  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5555/patient/${ptNumber}`);
      setPatientData(response.data.patient);
      setError('');
    } catch (err) {
      setPatientData(null);
      setError(err.response?.data?.error || 'Failed to fetch patient details');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="bg-blue-600 text-white p-4 rounded-lg shadow-md mb-6">
        <h1 className="text-2xl font-bold">Welcome, Dr. {user?.name}</h1>
        <p className="text-sm">Manage your patients easily with our dashboard.</p>
      </header>

      <main className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Search Patient by PT Number</h2>
        <div className="space-y-4">
          <input
            type="text"
            value={ptNumber}
            onChange={(e) => setPtNumber(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter PT Number (e.g., PT1234567890)"
          />
          <button
            onClick={handleSearch}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Search Patient
          </button>
        </div>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {patientData && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-bold text-gray-800">Patient Details</h3>
            <p className="mt-2"><strong>ID:</strong> {patientData.id}</p>
            <p><strong>Name:</strong> {patientData.name}</p>
            <p><strong>Email:</strong> {patientData.email}</p>
            <p><strong>Mobile Number:</strong> {patientData.mobilenumber}</p>
          </div>
        )}

        {/* New Buttons */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={() =>
              navigate('/pdrug', { state: { patientId: patientData?.id } })
            }
            className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300"
            disabled={!patientData}
          >
            Prescribed Drugs
          </button>
          <button
            onClick={() => console.log('Reports clicked')}
            className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Reports
          </button>
        </div>
      </main>
    </div>
  );
}

export default DoctorDashboard;
