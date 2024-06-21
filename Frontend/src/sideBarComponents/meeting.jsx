// src/components/Sidebar.jsx
import React from 'react';

function Meetings ()  {
  return (
   <>
    <div
        className="flex items-center justify-center   border border-dashed bg-white border-gray-300 rounded-md"
        style={{ height: "48rem", width: "75rem" }}
       >
        <div className="text-center">
          <div className="text-2xl text-gray-500">
          Simplify scheduling meetings !
          </div>
          <div className="text-gray-400">
          Set your availability in Apollo and make it simple for people<br></br>
           to schedule a meeting with you, no back-and-forth required..
          </div>
          <button className="mt-4 px-4 py-2 text-white bg-blue-600 rounded-md">
            Connect your calender
          </button>
        </div>
      </div>
   </>
  );
}

export default Meetings;
