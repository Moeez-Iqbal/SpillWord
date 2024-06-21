import React from "react";

function DataHealth({ title, text }) {
  return (
    <div className="flex flex-col">
      <div>
        <div className="bg-white shadow-md rounded p-6 m-4 w-64">
          <h2 className="text-xl font-bold mb-4">{title}</h2>
          <div className="flex items-center justify-between">
            <div className="text-gray-600">N/A</div>
            <div className="text-right">
              <div className="text-sm text-gray-600">{text}</div>
              <div className="text-xs text-gray-500">
                Contact your CRM to check if data is outdated and update it with
                accurate data from Apollo.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataHealth;
