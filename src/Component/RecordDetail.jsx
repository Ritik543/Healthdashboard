import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from './Context/Theme';
import NavigationBar from './NavigationBar';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Datepicker.css';

const RecordDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();
    const [record, setRecord] = useState(null);
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const records = JSON.parse(sessionStorage.getItem('records')) || [];
        const foundRecord = records.find((r) => r.id === parseInt(id, 10));
        if (foundRecord) {
            setRecord(foundRecord);
            setDate(new Date(foundRecord.date));
        }
    }, [id]);

    const handleEdit = (e) => {
        e.preventDefault();
        const records = JSON.parse(sessionStorage.getItem('records')) || [];
        const updatedRecords = records.map((r) =>
            r.id === record.id ? { ...record, date: date.toISOString().split('T')[0] } : r
        );
        sessionStorage.setItem('records', JSON.stringify(updatedRecords));
        navigate('/');
    };

    const handleChange = (e) => {
        setRecord({ ...record, [e.target.name]: e.target.value });
    };

    const handleDelete = () => {
        const records = JSON.parse(sessionStorage.getItem('records')) || [];
        const updatedRecords = records.filter((r) => r.id !== record.id);
        sessionStorage.setItem('records', JSON.stringify(updatedRecords));
        navigate('/');
    };

    if (!record) {
        return <p className={`${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>Loading...</p>;
    }

    return (
        <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
            <NavigationBar />
            <div className="container mx-auto p-6 mt-16">
                <h2 className="text-3xl font-bold mb-6 text-teal-400">Edit Health Record</h2>
                <form onSubmit={handleEdit} className={`p-6 rounded shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
                    <div className="mb-4">
                        <label className={`block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Date</label>
                        <DatePicker
                            selected={date}
                            onChange={(date) => setDate(date)}
                            className={`p-2 border rounded w-full ${isDarkMode ? 'bg-gray-700 text-gray-100 border-gray-500' : 'bg-gray-100 text-gray-900 border-gray-300'}`}
                            dateFormat="MMMM d, yyyy"
                            placeholderText="Select date"
                        />
                    </div>
                    <div className="mb-4">
                        <label className={`block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Temperature (°F)</label>
                        <input
                            type="number"
                            name="temperature"
                            value={record.temperature}
                            onChange={handleChange}
                            className={`p-2 border rounded w-full ${isDarkMode ? 'bg-gray-700 text-gray-100 border-gray-500' : 'bg-gray-100 text-gray-900 border-gray-300'}`}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className={`block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Blood Pressure (systolic/diastolic)</label>
                        <input
                            type="text"
                            name="bp"
                            value={record.bp}
                            onChange={handleChange}
                            className={`p-2 border rounded w-full ${isDarkMode ? 'bg-gray-700 text-gray-100 border-gray-500' : 'bg-gray-100 text-gray-900 border-gray-300'}`}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className={`block ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Heart Rate (bpm)</label>
                        <input
                            type="number"
                            name="heartRate"
                            value={record.heartRate}
                            onChange={handleChange}
                            className={`p-2 border rounded w-full ${isDarkMode ? 'bg-gray-700 text-gray-100 border-gray-500' : 'bg-gray-100 text-gray-900 border-gray-300'}`}
                            required
                        />
                    </div>
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mr-2"
                        >
                            Save Changes
                        </button>
                        <button
                            type="button"
                            onClick={handleDelete}
                            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700"
                        >
                            Delete Record
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RecordDetail;
