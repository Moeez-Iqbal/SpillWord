// src/components/Sidebar.jsx
import React from "react";

function Calls() {
  return (
    <>
      <div
        className="flex items-center justify-center   border border-dashed bg-white border-gray-300 rounded-md"
        style={{ height: "48rem", width: "75rem" }}
       >
        <div className="text-center">
          <div className="text-2xl text-gray-500">
            Voice Dialer and Call Tasks !
          </div>
          <div className="text-gray-400">
          Make, answer, record and transcribe calls with Apollo while automatically syncing them with your CRM.
          </div>
          <button className="mt-4 px-4 py-2 text-white bg-blue-600 rounded-md">
            Clear filters
          </button>
        </div>
      </div>
    </>
  );
}

export default Calls;
