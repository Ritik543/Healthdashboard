import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from './Context/Theme';
import NavigationBar from './NavigationBar';
import { motion } from 'framer-motion';

const EditRecord = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();

    const [date, setDate] = useState('');
    const [temperature, setTemperature] = useState('');
    const [bp, setBp] = useState('');
    const [heartRate, setHeartRate] = useState('');

    useEffect(() => {
        const existingRecord = JSON.parse(sessionStorage.getItem(`record_${id}`)) || {};
        setDate(existingRecord.date || '');
        setTemperature(existingRecord.temperature || '');
        setBp(existingRecord.bp || '');
        setHeartRate(existingRecord.heartRate || '');
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedRecord = { id, date, temperature, bp, heartRate };

        sessionStorage.setItem(`record_${id}`, JSON.stringify(updatedRecord));
        console.log('Record updated:', updatedRecord);
        navigate('/');
    };

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
            <NavigationBar />
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="container mx-auto p-6"
            >
                <h2 className="text-3xl font-bold mb-6 text-teal-400">Edit Health Record</h2>
                <form onSubmit={handleSubmit} className={`p-6 rounded shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="mb-4">
                        <label className={`block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Date</label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className={`p-2 border rounded w-full ${isDarkMode ? 'bg-gray-700 text-gray-100 border-gray-500' : 'bg-gray-100 text-gray-900 border-gray-300'}`}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className={`block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Temperature (°F)</label>
                        <input
                            type="number"
                            value={temperature}
                            onChange={(e) => setTemperature(e.target.value)}
                            className={`p-2 border rounded w-full ${isDarkMode ? 'bg-gray-700 text-gray-100 border-gray-500' : 'bg-gray-100 text-gray-900 border-gray-300'}`}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className={`block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Blood Pressure</label>
                        <input
                            type="text"
                            value={bp}
                            onChange={(e) => setBp(e.target.value)}
                            className={`p-2 border rounded w-full ${isDarkMode ? 'bg-gray-700 text-gray-100 border-gray-500' : 'bg-gray-100 text-gray-900 border-gray-300'}`}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className={`block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Heart Rate (bpm)</label>
                        <input
                            type="number"
                            value={heartRate}
                            onChange={(e) => setHeartRate(e.target.value)}
                            className={`p-2 border rounded w-full ${isDarkMode ? 'bg-gray-700 text-gray-100 border-gray-500' : 'bg-gray-100 text-gray-900 border-gray-300'}`}
                            required
                        />
                    </div>
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition duration-300"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default EditRecord;
