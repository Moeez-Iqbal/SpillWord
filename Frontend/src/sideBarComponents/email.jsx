// import EmailMainContent from "./eMailComponents/emailMainComponents";

import React, { useState } from "react";
import EmailMainContent from "./eMailComponents/emailMainComponents";
import EmailTemplate from "./template";
import FilterTemplate from "./eMailComponents/filter";
import { TiChartBarOutline } from "react-icons/ti";

function Email() {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [option, setOption] = useState("");
  const [boolean, setBoolean] = useState(true);

  return (
    <>
      <div className="w-screen h-screen" style={{ backgroundColor: "#F3F4F6" }}>
        <div className="p-4 bg-white ">
          <h2 className="text-xl font-bold mb-4">Emails</h2>
          <div>
            <div className="flex items-center justify-between space-x-4">
              <div>
                <ul className="flex">
                  <li className="mb-2 hover:bg-blue-200 rounded ">
                    <button
                      className="text-blue-500  "
                      onClick={() => setBoolean(true)}
                    >
                      All emails
                    </button>
                  </li>
                  <li className="mb-2 ml-4 hover:bg-blue-200 rounded">
                    <button
                      onClick={() => setBoolean(false)}
                      className="text-blue-500 "
                    >
                      Templates
                    </button>
                  </li>
                </ul>
              </div>
              <div>
                <button className="border border-blue-500 text-blue-500 py-1 px-2 text-lg rounded flex items-center space-x-2 hover:bg-blue-200">
                <TiChartBarOutline />
                  <span>Deliverable Stats</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* //Second Div  */}

        <div className="flex ">
          {boolean ? (
            <>
              <div className="flex" style={{ width: "80rem" }}>
                <FilterTemplate />
                <EmailMainContent />
              </div>
            </>
          ) : (
            <>
              <div
                className="w-full  border overflow-hidden relative"
                style={{ height: "40rem" }}
              >
                <div className="w-full h-full overflow-y-scroll p-4 box-border">
                  <EmailTemplate />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Email;
