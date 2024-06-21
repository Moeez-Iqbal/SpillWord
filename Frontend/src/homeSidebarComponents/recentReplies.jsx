import React, { useState } from "react";

function RecentReplies() {
  const [statusCounts, setStatusCounts] = useState({
    willingToMeet: 0,

    followUpQuestion: 0,

    referredToOtherPerson: 0,

    outOfOffice: 0,

    notTheRightPerson: 0,

    notInterested: 0,

    unsubscribed: 0,

    uncategorized: 0,
  });

  return (
    <>
      <div className="flex ">
        <div className="w-3/10 bg-white">
          <div className="bg-white p-4 rounded-md shadow-md">
            <div className="mb-4 border border-gray-300 rounded-md">
              <input
                type="text"
                placeholder="Search Emails..."
                className="w-full px-3 py-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Message Status</h2>
              <div className="text-sm font-medium">Total: 0</div>
            </div>

            <ul className="list-none p-0">
              <li className="flex justify-between items-center mb-2 hover:bg-blue-200 rounded py-3">
                <span className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>

                  <span>Willing to meet</span>
                </span>

                <span className="text-gray-600">
                  {statusCounts.willingToMeet}
                </span>
              </li>

              <li className="flex justify-between items-center mb-2 hover:bg-blue-200 rounded py-3">
                <span className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>

                  <span>Follow-up question</span>
                </span>

                <span className="text-gray-600">
                  {statusCounts.followUpQuestion}
                </span>
              </li>

              <li className="flex justify-between items-center mb-2 hover:bg-blue-200 rounded py-3">
                <span className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>

                  <span>Referred to other person</span>
                </span>

                <span className="text-gray-600">
                  {statusCounts.referredToOtherPerson}
                </span>
              </li>

              <li className="flex justify-between items-center mb-2 hover:bg-blue-200 rounded py-3">
                <span className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>

                  <span>Out of office</span>
                </span>

                <span className="text-gray-600">
                  {statusCounts.outOfOffice}
                </span>
              </li>

              <li className="flex justify-between items-center mb-2 hover:bg-blue-200 rounded py-3">
                <span className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>

                  <span>Not the right person</span>
                </span>

                <span className="text-gray-600">
                  {statusCounts.notTheRightPerson}
                </span>
              </li>

              <li className="flex justify-between items-center mb-2 hover:bg-blue-200 rounded py-3">
                <span className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-gray-600 mr-2"></div>

                  <span>Not interested</span>
                </span>

                <span className="text-gray-600">
                  {statusCounts.notInterested}
                </span>
              </li>

              <li className="flex justify-between items-center mb-2 hover:bg-blue-200 rounded py-3">
                <span className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>

                  <span>Unsubscribed</span>
                </span>

                <span className="text-gray-600">
                  {statusCounts.unsubscribed}
                </span>
              </li>

              <li className="flex justify-between items-center mb-2 hover:bg-blue-200 rounded py-3">
                <span className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-gray-300 mr-2"></div>

                  <span>Uncategorized</span>
                </span>

                <span className="text-gray-600">
                  {statusCounts.uncategorized}
                </span>
              </li>
            </ul>

            <div className="mt-4 ">
              <h3 className="text-lg font-medium">Mailbox</h3>

              <p className="text-gray-600 hover:bg-blue-200 rounded">
                im.uxama85@gmail.com
              </p>
            </div>
          </div>
        </div>

        <div className=" bg-white px-3" style={{ width: "54rem" }}>
          <div
            className="flex items-center justify-center  border border-dashed bg-white border-gray-300 rounded-md"
            style={{ height: "40rem" }}
          >
            <div className="text-center">
              <div className="text-2xl text-gray-500">No emails here!</div>
              <div className="text-gray-400">
                Check again later or clear any applied filters.
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

export default RecentReplies;
