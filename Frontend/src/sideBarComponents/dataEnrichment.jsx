// src/components/Sidebar.jsx
import React, { useState } from "react";
import DataHealth from "../dataEnrichsidebarcomponts/dataHealth";
import CrmDataEnrichment from "../dataEnrichsidebarcomponts/crmDataEnrichment";

function DataEnrichment() {
  const [boolean, setBoolean] = useState("true");
  return (
    <>
      <div className="w-screen h-screen" style={{ backgroundColor: "#F3F4F6" }}>
        <div className="p-4 bg-white ">
          <h2 className="text-xl font-bold mb-4">Data Enrichment</h2>
          <div>
            <div className="flex items-center justify-between space-x-4">
              <div>
                <ul className="flex">
                  <li className="mb-2 hover:bg-blue-200 rounded ">
                    <button
                      className="text-blue-500  "
                      onClick={() => setBoolean(true)}
                    >
                      Data health enrichment
                    </button>
                  </li>
                  <li className="mb-2 ml-4 hover:bg-blue-200 rounded">
                    <button
                      onClick={() => setBoolean(false)}
                      className="text-blue-500 "
                    >
                      CRM
                    </button>
                  </li>
                  <li className="mb-2 ml-4 hover:bg-blue-200 rounded">
                    <button
                      // onClick={() => setBoolean(false)}
                      className="text-blue-500 "
                    >
                      CSV
                    </button>
                  </li>
                  <li className="mb-2 ml-4 hover:bg-blue-200 rounded">
                    <button
                      // onClick={() => setBoolean(false)}
                      className="text-blue-500 "
                    >
                      Job change Alert
                    </button>
                  </li>
                  <li className="mb-2 ml-4 hover:bg-blue-200 rounded">
                    <button
                      // onClick={() => setBoolean(false)}
                      className="text-blue-500 "
                    >
                      API
                    </button>
                  </li>
                </ul>
              </div>
              <div>
                <button className="border border-blue-500 text-blue-500 py-1 px-2 text-lg rounded flex items-center space-x-2 hover:bg-blue-200">
                  <span>Dashboard Setting</span>
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
                <div>
                  <div className="flex justify-around">
                    <DataHealth
                      title="Job changes"
                      text="Connect your CRM to check if data"
                    />
                    <DataHealth
                      title="Missing emails"
                      text="Connect your CRM to check for"
                    />
                  </div>
                  <div className="px-8">
                    <CrmDataEnrichment />
                  </div>
                </div>
                {/* <DataHealth /> */}
              </div>
            </>
          ) : (
            <>
              <div
                className="w-full  border overflow-hidden relative"
                style={{ height: "40rem" }}
              >
                <div className="w-full h-full overflow-y-scroll p-4 box-border">
                 
                  <CrmDataEnrichment />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default DataEnrichment;
