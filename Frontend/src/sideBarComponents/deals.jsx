// src/components/Sidebar.jsx
import React from 'react';

function Deals ()  {
  return (
   <>
     <div
        className="flex items-center justify-center   border border-dashed bg-white border-gray-300 rounded-md"
        style={{ height: "48rem", width: "75rem" }}
      >
        <div className="text-center">
          <div className="text-2xl text-gray-500">
          Bring more deals across the finish line !
          </div>
          <div className="text-gray-400">
          Get actionable insights to push deals forward <br></br>
    Use with Apollo solutions, like Conversations, for a consolidated deal view<br></br>
    Configure automations to increase efficiency
          </div>
          <button className="mt-4 px-4 py-2 text-white bg-blue-600 rounded-md">
            Get Started
          </button>
        </div>
      </div>

   </>
  );
}

export default Deals;
