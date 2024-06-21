// src/components/MainContent.jsx
import React from "react";
import HomeSidebar from "../homeSideBarVendor/homeSidebar";

function MainContent() {
  const stats = [
    { title: "emails opened", count: 0, change: 0 },
    { title: "emails replied", count: 0, change: 0 },
    { title: "emails intrest", count: 0, change: 0 },
  ];
  return (
    <div
      className="w-4/5 p-4 overflow-auto bg-grey-500"
      style={{ backgroundColor: "#F3F4F6" }}
    >
      <div className="h-14 bg-white flex items-center">
        <h1 className="text-2xl font-bold px-2 ">Home</h1>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="flex flex-col px-8 py-6 space-y-4 bg-white rounded">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-full">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89-4.37a2 2 0 012.22 0L21 8m-9 4v8m-6-6v6a2 2 0 002 2h8a2 2 0 002-2v-6m-6 6V9a2 2 0 012-2h3l4 4v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2h3a2 2 0 012 2z"
                  ></path>
                </svg>
              </div>
              <h2 className="text-xl font-bold ml-2">0 emails delivered</h2>
            </div>
            <p className="text-sm text-gray-500">Week-to-date</p>
          </div>
          <div className="flex justify-between">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <p className="text-lg text-gray-500">{stat.title}</p>
                <div className="flex items-center space-x-4 py-3">
                  <h2 className="text-2xl font-bold">{stat.count}</h2>
                  <div className="flex flex-col items-center px-4">
                    <div className="bg-green-300 rounded flex justify-center items-center px-3 py-1">
                      <p className="text-sm text-white">{stat.change}</p>
                    </div>
                    <p className="text-[8.5px] text-gray-500">from last week</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col px-8 py-6 space-y-4 bg-white rounded">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-full">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89-4.37a2 2 0 012.22 0L21 8m-9 4v8m-6-6v6a2 2 0 002 2h8a2 2 0 002-2v-6m-6 6V9a2 2 0 012-2h3l4 4v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2h3a2 2 0 012 2z"
                  ></path>
                </svg>
              </div>
              <h2 className="text-xl font-bold ml-2">0 emails delivered</h2>
            </div>
            <p className="text-sm text-gray-500">Week-to-date</p>
          </div>
          <div className="flex justify-between">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <p className="text-lg text-gray-500">{stat.title}</p>
                <div className="flex items-center space-x-4 py-3">
                  <h2 className="text-2xl font-bold">{stat.count}</h2>
                  <div className="flex flex-col items-center">
                    <div className="bg-green-300 rounded flex justify-center items-center px-2 py-1">
                      <p className="text-sm text-white">{stat.change}</p>
                    </div>
                    <p className="text-[8.5px] text-gray-500">from last week</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="bg-white shadow-md rounded p-4 ">
          <h2 className="text-xl font-bold py-3">Workstreams</h2>
          <HomeSidebar />
        </div>
      </div>
    </div>
  );
}

export default MainContent;
