import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import NavigationBar from './NavigationBar';
import { useTheme } from './Context/Theme';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Datepicker.css';

const AddRecord = () => {
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();
    const [date, setDate] = useState(new Date());
    const [temperature, setTemperature] = useState('');
    const [bp, setBp] = useState('');
    const [heartRate, setHeartRate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const records = JSON.parse(sessionStorage.getItem('records')) || [];
        const newRecord = {
            id: new Date().getTime(),
            date,
            temperature,
            bp,
            heartRate
        };
        records.push(newRecord);
        sessionStorage.setItem('records', JSON.stringify(records));
        navigate('/');
    };

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
            <NavigationBar />
            <div className="container mx-auto p-4 lg:p-6 mt-16">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className={`bg-gray-800 p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
                >
                    <h2 className="text-2xl lg:text-3xl font-semibold text-teal-400 mb-6">Add Health Record</h2>
                    <form onSubmit={handleSubmit} className={`p-4 lg:p-6 rounded shadow-md ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        <div className="mb-4">
                            <label className={`block text-sm lg:text-base font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Date</label>
                            <DatePicker
                                selected={date}
                                onChange={(date) => setDate(date)}
                                className={`p-2 border rounded w-full ${isDarkMode ? 'bg-gray-800 text-gray-100 border-gray-500' : 'bg-gray-100 text-gray-900 border-gray-300'}`}
                                dateFormat="MMMM d, yyyy"
                                placeholderText="Select date"
                            />
                        </div>
                        <div className="mb-4">
                            <label className={`block text-sm lg:text-base font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Temperature (°F)</label>
                            <input
                                type="number"
                                value={temperature}
                                onChange={(e) => setTemperature(e.target.value)}
                                className={`p-2 border rounded w-full ${isDarkMode ? 'bg-gray-800 text-gray-100 border-gray-500' : 'bg-gray-100 text-gray-900 border-gray-300'}`}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className={`block text-sm lg:text-base font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Blood Pressure (systolic/diastolic)</label>
                            <input
                                type="text"
                                value={bp}
                                onChange={(e) => setBp(e.target.value)}
                                className={`p-2 border rounded w-full ${isDarkMode ? 'bg-gray-800 text-gray-100 border-gray-500' : 'bg-gray-100 text-gray-900 border-gray-300'}`}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className={`block text-sm lg:text-base font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Heart Rate (bpm)</label>
                            <input
                                type="number"
                                value={heartRate}
                                onChange={(e) => setHeartRate(e.target.value)}
                                className={`p-2 border rounded w-full ${isDarkMode ? 'bg-gray-800 text-gray-100 border-gray-500' : 'bg-gray-100 text-gray-900 border-gray-300'}`}
                                required
                            />
                        </div>
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition duration-300 w-full lg:w-auto"
                            >
                                Add Record
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default AddRecord;
