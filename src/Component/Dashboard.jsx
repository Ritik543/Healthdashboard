import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useTheme } from './Context/Theme';
import NavigationBar from './NavigationBar';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const { isDarkMode } = useTheme();
  const [records, setRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortFactor, setSortFactor] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();

  useEffect(() => {
    const storedRecords = JSON.parse(sessionStorage.getItem('records')) || [];
    setRecords(storedRecords);
  }, []);

  const filteredRecords = records.filter((record) =>
    record.date.includes(searchQuery) ||
    record.temperature.toString().includes(searchQuery) ||
    record.bp.includes(searchQuery) ||
    record.heartRate.toString().includes(searchQuery)
  );

  const sortedRecords = [...filteredRecords].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortFactor] > b[sortFactor] ? 1 : -1;
    } else {
      return a[sortFactor] < b[sortFactor] ? 1 : -1;
    }
  });

  const chartData = {
    labels: records.map(record => record.date),
    datasets: [
      {
        label: 'Heart Rate (bpm)',
        data: records.map(record => record.heartRate),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Temperature (°F)',
        data: records.map(record => record.temperature),
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Health Data Over Time',
      },
    },
  };

  const handleView = (id) => {
    navigate(`/record/${id}`);
  };

  const handleUpdate = (id) => {
    navigate(`/record/${id}`);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      <NavigationBar />
      <div className="pt-20 container mx-auto p-4 lg:p-6">
        <h2 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6 text-teal-400">Health Records Dashboard</h2>

        <div className="mb-4 lg:mb-6">
          <input
            type="text"
            placeholder="Search records..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`p-2 border rounded w-full ${isDarkMode ? 'bg-gray-800 text-gray-100 border-gray-500' : 'bg-gray-100 text-gray-900 border-gray-300'}`}
          />
        </div>

        <div className="flex flex-col lg:flex-row lg:space-x-4 mb-4 lg:mb-6">
          <div className="mb-4 lg:mb-0 w-full lg:w-1/2">
            <label className="block mb-2 text-sm font-medium">Sort by:</label>
            <select
              value={sortFactor}
              onChange={(e) => setSortFactor(e.target.value)}
              className={`p-2 border rounded w-full ${isDarkMode ? 'bg-gray-800 text-gray-100 border-gray-500' : 'bg-gray-100 text-gray-900 border-gray-300'}`}
            >
              <option value="date">Date</option>
              <option value="temperature">Temperature</option>
              <option value="bp">Blood Pressure</option>
              <option value="heartRate">Heart Rate</option>
            </select>
          </div>

          <div className="mb-4 lg:mb-0 w-full lg:w-1/2">
            <label className="block mb-2 text-sm font-medium">Order:</label>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className={`p-2 border rounded w-full ${isDarkMode ? 'bg-gray-800 text-gray-100 border-gray-500' : 'bg-gray-100 text-gray-900 border-gray-300'}`}
            >
              <option value="asc">Sort By Low to High</option>
              <option value="desc">Sort By High to Low</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:space-x-4">
          <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
            <h3 className="text-xl lg:text-2xl font-semibold mb-4">Records</h3>
            {sortedRecords.length > 0 ? (
              <ul className="space-y-4">
                {sortedRecords.map((record) => (
                  <li key={record.id} className={`p-4 border rounded shadow-md ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'}`}>
                    <p><strong>Date:</strong> {record.date}</p>
                    <p><strong>Temperature:</strong> {record.temperature} °F</p>
                    <p><strong>Blood Pressure:</strong> {record.bp}</p>
                    <p><strong>Heart Rate:</strong> {record.heartRate} bpm</p>

                    <div className="mt-4 flex space-x-2">
                      <button
                        onClick={() => handleUpdate(record.id)}
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300"
                      >
                        Edit Record
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No records found.</p>
            )}
          </div>

          <div className="w-full lg:w-1/2">
            <h3 className="text-xl lg:text-2xl font-semibold mb-4">Health Data Chart</h3>
            {records.length > 0 ? (
              <Line data={chartData} options={chartOptions} />
            ) : (
              <p>No data available for chart.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
