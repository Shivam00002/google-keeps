import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center p-2">
      <div className="bg-white border text-gray-900 dark:text-white dark:bg-slate-950 p-8 rounded-lg shadow-md w-full max-w-md">


     <h1 className="md:text-[18px] text-center sm:text-2xl md:mt-0 -mt-1  md:ml-0 ml-1 font-semibold dark:text-white">
      Welcome to  
            
                <span> </span>
                  <span className="text-blue-500">G</span>
                  <span className="text-red-500">o</span>
                  <span className="text-yellow-500">o</span>
                  <span className="text-blue-500">g</span>
                  <span className="text-green-500">l</span>
                  <span className="text-red-500">e</span>
                  <span> </span>
                  <span className="md:text-[18px]">
                    <span>K</span>
                    <span>e</span>
                    <span>e</span>
                    <span>p</span>
                    <span>s</span> ✏️
                  </span>
                
              </h1>

        <p className="text-center  text-sm text-gray-900 dark:text-white mt-3">
          Your personal note-taking app. Start creating and managing your notes
          today!
        </p>
     
        <p className="text-center md:text-[12px] mt-2 text-sm text-gray-900 dark:text-white ">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Log In
          </Link>
          {" "}   <br />  Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>

      
      </div>
    </div>
  );
};

export default Home;
