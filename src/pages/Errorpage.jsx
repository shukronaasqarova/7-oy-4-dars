import React from 'react';

function ErrorPage() {
  const handleRedirect = () => {
    window.location.href = '/';
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-6">page not found</p>
        <button
          onClick={handleRedirect}
          className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-200"
        >
          GO BACK HOME
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
