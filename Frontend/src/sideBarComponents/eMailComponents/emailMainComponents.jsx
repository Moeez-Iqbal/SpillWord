import React, { useState } from "react";
import Select from "react-select";
import TotalEmail from "./totalEmail";
import ScheduleEmail from "./ScheduleEmail";
import { MdFilterListOff } from "react-icons/md";

function EmailMainContent() {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [boolean, setBoolean] = useState(true);


  const emailOptions = [
    { value: "email1@example.com", label: "email1@example.com" },
    { value: "email2@example.com", label: "email2@example.com" },
    { value: "email3@example.com", label: "email3@example.com" },
  ];

  const sections = [
    {
      title: "From Email",
      content: (
        <Select
          options={emailOptions}
          value={selectedEmail}
          onChange={setSelectedEmail}
          placeholder="Specify email..."
        />
      ),
    },
    { title: "Sequences", content: <p>Sequence content here...</p> },
    { title: "Contact Lists", content: <p>Contact list content here...</p> },
    { title: "Date Range", content: <p>Date range content here...</p> },
    {
      title: "Not Sent Reason",
      content: <p>Not sent reason content here...</p>,
    },
    { title: "Email Opened", content: <p>Email opened content here...</p> },
  ];

  return (
    <>
      <div className="flex-1 p-4 ">
        <div className="bg-white">
          <div className="flex items-center  mb-4 ">
           <div className="py-2 px-2">
           <button className="px-4 py-2 text-white bg-gray-600 rounded-md flex">
            <MdFilterListOff/>
             <span className="px-2"> Hide Filters</span>
            </button>
           </div>
            <div className="flex space-x-4 px-6">
              <button className="px-4 py-2 rounded-md hover:bg-blue-200" onClick={() => setBoolean(true)}>
                Total
              </button>
              <button className="px-4 py-2 rounded-md hover:bg-blue-200" onClick={() => setBoolean(false)}>
                Scheduled
              </button>
              <button className="px-4 py-2 rounded-md hover:bg-blue-200" onClick={() => setBoolean(false)}>
                Delivered
              </button>
              <button className="px-4 py-2 rounded-md hover:bg-blue-200" onClick={() => setBoolean(false)}>
                Opened
              </button>
              <button className="px-4 py-2 rounded-md hover:bg-blue-200" onClick={() => setBoolean(false)}>
                Clicked
              </button>
            </div>
          </div>

          <hr />

          

          <div>
            {boolean ? (
              <>
                <TotalEmail />

              </>
            ) : (
              <>
                <ScheduleEmail/>
              </>
            
          ) 
          // : (
          //     <>
          //       <DeliveredEmail/>
          //     </>
          //   )
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default EmailMainContent;
