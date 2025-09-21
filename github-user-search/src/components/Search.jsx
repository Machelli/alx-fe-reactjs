import React, { useState, useCallback } from 'react';
import axios from 'axios';


const Search = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');


  const fetchUserData = useCallback(async (username) => {
    
    setError('');
    setUserData(null);
    setIsLoading(true);

    try {
      
      const response = await axios.get(`https://api.github.com/users/${username}`);
      setUserData(response.data); 
      setIsLoading(false); 
    } catch (err) {
      setIsLoading(false); 
      
      if (err.response && err.response.status === 404) {
        setError("Looks like we can't find the user.");
      } else {
        
        setError("An error occurred while fetching data.");
      }
    }
  }, []);

  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      fetchUserData(searchTerm.trim());
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-gray-50">
          GitHub User Search
        </h1>

        
        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter GitHub username"
            className="flex-1 px-4 py-2 text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition duration-200"
          >
            Search
          </button>
        </form>

    
        <div className="mt-8 text-center min-h-[150px] flex items-center justify-center">
          {isLoading ? (
            
            <p className="text-gray-500 dark:text-gray-400 text-lg animate-pulse">
              Loading...
            </p>
          ) : error ? (
            
            <p className="text-red-500 dark:text-red-400 text-lg">{error}</p>
          ) : userData ? (
            
            <div className="flex flex-col items-center space-y-4 w-full">
              <img
                src={userData.avatar_url}
                alt={`${userData.login}'s avatar`}
                className="w-24 h-24 rounded-full border-4 border-gray-300 dark:border-gray-600 shadow-md"
              />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
                {userData.name || userData.login}
              </h2>
              <a
                href={userData.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-full hover:bg-green-700 transition duration-200"
              >
                View Profile
              </a>
            
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                Public Repos: {userData.public_repos}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Followers: {userData.followers}
              </p>
            </div>
          ) : (
            
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Start by searching for a GitHub user.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
