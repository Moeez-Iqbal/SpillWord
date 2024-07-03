import React, { useState } from "react";
import TotalEmail from "./totalEmail";
import ScheduleEmail from "./ScheduleEmail";
import { MdFilterListOff } from "react-icons/md";
import UnlockEmail from "./unlockEmail";
import BouncesEmail from "./bounceEmail";
import DeliveredEmail from "./deliveredEmail";

function EmailMainContent() {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [boolean, setBoolean] = useState(null); // Initial state for component rendering
  const [newBoolean, setNewBoolean] = useState(false); // Initial state for additional component rendering

  const emailOptions = [
    { value: "email1@example.com", label: "email1@example.com" },
    { value: "email2@example.com", label: "email2@example.com" },
    { value: "email3@example.com", label: "email3@example.com" },
  ];

  const handleClick = (component) => {
    if (component === "Unlock" || component === "Bounces") {
      setNewBoolean(true); // Set newBoolean to true for Unlock and Bounces
    } else {
      setNewBoolean(false); // Reset newBoolean to false for other components
    }
    setBoolean(component); // Sets boolean to the component name (string)
  };

  return (
    <>
      <div className="flex-1 p-4">
        <div className="bg-white">
          <div className="flex items-center mb-4">
            <div className="py-2 px-2">
              <button className="px-4 py-2 text-white bg-gray-600 rounded-md flex">
                <MdFilterListOff />
                <span className="px-2"> Hide Filters</span>
              </button>
            </div>
            <div className="flex space-x-4 px-6">
              <button
                className="px-4 py-2 rounded-md hover:bg-blue-200"
                onClick={() => handleClick("Total")}
              >
                Total
              </button>
              <button
                className="px-4 py-2 rounded-md hover:bg-blue-200"
                onClick={() => handleClick("Scheduled")}
              >
                Scheduled
              </button>
              <button
                className="px-4 py-2 rounded-md hover:bg-blue-200"
                onClick={() => handleClick("Delivered")}
              >
                Delivered
              </button>
              
              <button
                className="px-4 py-2 rounded-md hover:bg-blue-200"
                onClick={() => handleClick("Unlock")}
              >
                Unlock
              </button>
              <button
                className="px-4 py-2 rounded-md hover:bg-blue-200"
                onClick={() => handleClick("Bounces")}
              >
                Bounces
              </button>
            </div>
          </div>

          <hr />

          {/* Render components based on boolean and newBoolean state */}
          <div>
            {boolean === "Total" ? (
              <TotalEmail />
            ) : boolean === "Scheduled" ? (
              <ScheduleEmail />
            ) : boolean === "Delivered" ? (
              <DeliveredEmail />
            ) : boolean === "Unlock" && newBoolean ? (
              <UnlockEmail />
            ) : boolean === "Bounces" && newBoolean ? (
              <BouncesEmail />
            ) : (
              <p>No content selected.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default EmailMainContent;
