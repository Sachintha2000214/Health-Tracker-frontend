import React, { useState } from 'react';
import { ArrowLeft, Search, FilePlus2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Other() {
  const [searchQuery, setSearchQuery] = useState('');
  const currentDate = new Date().toLocaleDateString('en-GB');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search
    console.log(searchQuery);
  };

  return (
    <div className="min-h-screen bg-[#B2EBF2] p-6">
      <div className="max-w-md mx-auto">
        <div className="bg-[#4DB6AC] p-6 rounded-lg mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <ArrowLeft className="w-6 h-6" onClick={() => navigate('/healthtracker')} />
              <h1 className="text-2xl font-bold text-gray-800">Other reports</h1>
            </div>
            <p className="text-sm text-gray-800">Date: {currentDate}</p>
          </div>
        </div>

        <div className="space-y-6">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search for reports"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-4 pr-12 rounded-lg bg-white"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
            <button
              type="submit"
              className="w-full p-4 bg-[#E0F7FA] rounded-lg text-gray-800 font-bold hover:bg-[#B2EBF2] transition-colors flex items-center justify-center space-x-2"
            >
              <FilePlus2 className="w-5 h-5" />
              <span>ADD REPORT</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Other;
