// src/components/Sidebar.jsx
import React from "react";

function Conversations() {
  return (
    <>
      <div
        className="flex items-center justify-center   border border-dashed bg-white border-gray-300 rounded-md"
        style={{ height: "48rem", width: "75rem" }}
      >
        <div className="text-center">
          <div className="text-2xl text-gray-500">
            Convert your conversations into winning strategies !
          </div>
          <div className="text-gray-400">
            Save time with insights from AI-generated meeting summaries Help<br></br>
            your team sell more by understanding key conversation metrics Get<br></br>
            visibility into key topics and behaviors of your team..
          </div>
          <button className="mt-4 px-4 py-2 text-white bg-blue-600 rounded-md">
            Connect your calender
          </button>
        </div>
      </div>
    </>
  );
}

export default Conversations;
