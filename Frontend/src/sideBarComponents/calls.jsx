import React from "react";
import { AiOutlineSetting } from "react-icons/ai"; // Import the setting icon

function Calls() {
  return (
    <>
      <div className="w-screen h-screen" style={{ backgroundColor: "#F3F4F6" }}>
        <div className="p-4 bg-white flex justify-between">
          <h2 className="text-xl font-bold mb-4">Calls</h2>
          <AiOutlineSetting className="text-gray-500  " size={24} /> {/* Setting icon */}
        </div>
        {/* Second Div */}

        <div className="px-20 py-7">
          <div
            className="flex items-center justify-center  border border-dashed bg-white border-gray-300 rounded-md"
            style={{ height: "42rem", width: "75rem" }}
          >
            <div className="text-center">
              <div className="text-2xl text-gray-500">
                Voice Dialer and Call Tasks!
              </div>
              <div className="text-gray-400">
                Make, answer, record and transcribe calls with Apollo while
                automatically syncing them with your CRM.
              </div>
              <button className="mt-4 px-4 py-2 text-white bg-blue-600 rounded-md">
                Clear filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Calls;
