import React from 'react';
import { useTheme } from './Context/Theme';

const Search = ({ setSearchQuery }) => {
    const { isDarkMode } = useTheme();

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className={`mb-4 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
            <input
                type="text"
                placeholder="Search records..."
                onChange={handleSearch}
                className={`p-2 border rounded w-full ${isDarkMode ? 'bg-gray-700 border-gray-500 text-gray-100' : 'bg-gray-100 border-gray-300 text-gray-900'}`}
            />
        </div>
    );
};

export default Search;
