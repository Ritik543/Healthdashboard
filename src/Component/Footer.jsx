// src/Component/Footer.jsx
import React from 'react';
import { useTheme } from './Context/Theme';

const Footer = () => {
    const { isDarkMode } = useTheme();

    return (
        <footer className={`w-full py-4 text-center ${isDarkMode ? 'bg-gray-800 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
            <p className="text-sm">
                &copy; {new Date().getFullYear()} Health Tracker App. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
