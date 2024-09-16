import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from './Context/Theme';

const NavigationBar = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 w-full p-4 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'} shadow-md z-50`}
        >
            <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between">

                <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-4 lg:space-y-0 lg:space-x-4">
                    <Link to="/" className="hover:underline text-lg font-semibold">Dashboard</Link>
                    <Link to="/add" className="hover:underline text-lg font-semibold">Add Record</Link>
                </div>

                <div className="mt-4 lg:mt-0 lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2">
                    <h1 className="text-2xl lg:text-xl font-bold text-center">Health Dashboard</h1>
                </div>

                <button
                    onClick={toggleTheme}
                    className="mt-4 lg:mt-0 bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700 transition duration-300"
                >
                    {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
            </div>
        </motion.div>
    );
};

export default NavigationBar;
