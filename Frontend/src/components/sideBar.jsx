import React from 'react';
import { FaHome, FaSearch, FaListAlt, FaEnvelope, FaPhone, FaCalendarAlt, FaUsers, FaHandshake, FaTasks, FaCog } from 'react-icons/fa';

function Sidebar({ changeOption }) {
  return (
    <div className="w-1/5 bg-white-100 p-4 flex flex-col">
      <div className="mb-4">
        <h1 className="text-xl font-bold">Logo</h1>
      </div>
      <ul className="flex flex-col gap-2">
        <li className="cursor-pointer hover:bg-gray-200 p-2 rounded flex items-center" onClick={() => changeOption("mainContent")}>
          <FaHome className="mr-2" /><span>Home</span>
        </li>
        <p className='text-gray-500'>Prospect & enrich</p>
        <li className="cursor-pointer hover:bg-gray-200 p-2 rounded flex items-center" onClick={() => changeOption("search")}>
          <FaSearch className="mr-2" /><span>Search</span>
        </li>
        <li className="cursor-pointer hover:bg-gray-200 p-2 rounded flex items-center" onClick={() => changeOption("dataEnrichment")}>
          <FaListAlt className="mr-2" /><span>Data Enrichment</span>
        </li>
        <p className='text-gray-500'>engage</p>

        <li className="cursor-pointer hover:bg-gray-200 p-2 rounded flex items-center" onClick={() => changeOption("sequence")}>
          <FaEnvelope className="mr-2" /><span>Sequences</span>
        </li>
        <li className="cursor-pointer hover:bg-gray-200 p-2 rounded flex items-center" onClick={() => changeOption("email")}>
          <FaEnvelope className="mr-2" /><span>Emails</span>
        </li>
        <li className="cursor-pointer hover:bg-gray-200 p-2 rounded flex items-center" onClick={() => changeOption("calls")}>
          <FaPhone className="mr-2" /><span>Calls</span>
        </li>
        <p className='text-gray-500'>Win & close </p>

        <li className="cursor-pointer hover:bg-gray-200 p-2 rounded flex items-center" onClick={() => changeOption("meetings")}>
          <FaCalendarAlt className="mr-2" /><span>Meetings</span>
        </li>
        <li className="cursor-pointer hover:bg-gray-200 p-2 rounded flex items-center" onClick={() => changeOption("conversations")}>
          <FaUsers className="mr-2" /><span>Conversations</span>
        </li>
        <li className="cursor-pointer hover:bg-gray-200 p-2 rounded flex items-center" onClick={() => changeOption("deals")}>
          <FaHandshake className="mr-2" /><span>Deals</span>
        </li>
        <p className='text-gray-500'>Tools & workflows</p>

        <li className="cursor-pointer hover:bg-gray-200 p-2 rounded flex items-center" onClick={() => changeOption("")}>
          <FaTasks className="mr-2" /><span>Tasks</span>
        </li>
        <li className="cursor-pointer hover:bg-gray-200 p-2 rounded flex items-center" onClick={() => changeOption("")}>
          <FaCog className="mr-2" /><span>Settings</span>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
