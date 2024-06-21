// src/components/SideBarHome.jsx
import React from 'react';
import { FaReply, FaUserFriends, FaEnvelopeOpenText, FaTasks, FaBell } from 'react-icons/fa';

function SideBarHome({ changeOption }) {
  return (
    <>
      <div className="bg-white-100 p-4 flex">
        <ul className="flex gap-2">
          <li className="cursor-pointer hover:bg-blue-200 p-2 rounded flex items-center" onClick={() => { changeOption("recentReplies") }}>
            <FaReply className="mr-2" />
            Recent Replies
          </li>
          <li className="cursor-pointer hover:bg-blue-200 p-2 rounded flex items-center" onClick={() => { changeOption("recommendprospect") }}>
            <FaUserFriends className="mr-2" />
            Recommended Prospects
          </li>
          <li className="cursor-pointer hover:bg-blue-200 p-2 rounded flex items-center" onClick={() => { changeOption("messageOptimization") }}>
            <FaEnvelopeOpenText className="mr-2" />
            Message Optimization
          </li>
          <li className="cursor-pointer hover:bg-blue-200 p-2 rounded flex items-center" onClick={() => { changeOption("task") }}>
            <FaTasks className="mr-2" />
            Tasks
          </li>
          <li className="cursor-pointer hover:bg-blue-200 p-2 rounded flex items-center" onClick={() => { changeOption("alerts") }}>
            <FaBell className="mr-2" />
            Alerts
          </li>
        </ul>
      </div>
    </>
  );
}

export default SideBarHome;
