// components/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <h1 className="text-6xl font-bold">404</h1>
      <p className="mt-4 text-2xl">Page Not Found</p>
      <Link to="/" className="mt-8 px-4 py-2 bg-blue-500 rounded-md">
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
