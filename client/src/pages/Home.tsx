import React from "react";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center p-2">
      <div className="bg-white text-gray-900 dark:text-white dark:bg-slate-950 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
          Welcome to Dainsta Notes
        </h1>
        <p className="text-center text-gray-900 dark:text-white mb-4">
          Your personal note-taking app. Start creating and managing your notes
          today!
        </p>
      </div>
    </div>
  );
};

export default Home;
