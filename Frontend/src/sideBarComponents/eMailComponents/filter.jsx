import React, { useState } from "react";
import Select from "react-select";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { MdOutlineEmail } from "react-icons/md";
import {
  AiOutlineUser,
  AiOutlineCalendar,
  AiOutlineTeam,
  AiOutlineFile,
  AiOutlineSearch,
} from "react-icons/ai"; // Add more icons as needed

function FilterTemplate() {
  const [selectedEmail, setSelectedEmail] = useState(null);

  const emailOptions = [
    { value: "email1@example.com", label: "email1@example.com" },
    { value: "email2@example.com", label: "email2@example.com" },
    { value: "email3@example.com", label: "email3@example.com" },
  ];

  const sections = [
    {
      title: "From Email",
      icon: <MdOutlineEmail className="w-5 h-5 text-blue-500" />,
      content: (
        <Select
          options={emailOptions}
          value={selectedEmail}
          onChange={setSelectedEmail}
          placeholder="Specify email..."
        />
      ),
    },
    {
      title: "Sequences",
      icon: <AiOutlineFile className="w-5 h-5 text-blue-500" />,
      content: <p>Sequence content here...</p>,
    },
    {
      title: "Contact Lists",
      icon: <AiOutlineTeam className="w-5 h-5 text-blue-500" />,
      content: <p>Contact list content here...</p>,
    },
    {
      title: "Date Range",
      icon: <AiOutlineCalendar className="w-5 h-5 text-blue-500" />,
      content: <p>Date range content here...</p>,
    },
    {
      title: "Not Sent Reason",
      icon: <AiOutlineUser className="w-5 h-5 text-blue-500" />,
      content: <p>Not sent reason content here...</p>,
    },
    {
      title: "Email Opened",
      icon: <AiOutlineSearch className="w-5 h-5 text-blue-500" />,
      content: <p>Email opened content here...</p>,
    },
  ];

  return (
    <div className="flex py-3 px-3" style={{ height: "36rem" }}>
      <div className="bg-white shadow-md rounded p-4">
        <div className="flex justify-between py-1">
          <h3 className="font-bold">Filters</h3>
          <div className="flex space-x-0.5">
            <button className="text-blue-500">Load</button>
            <p>|</p>
            <button className="text-blue-500">Save</button>
          </div>
        </div>

        <hr />

        <div className="text-gray-500">
          <div className="w-64 p-4 border-r border-gray-200">
            <div className="mb-4 border border-gray-300 rounded-md">
              <input
                type="text"
                placeholder="Search Emails..."
                className="w-full px-3 py-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            {sections.map((section, index) => (
              <Disclosure
                key={index}
                as="div"
                className="mb-4 border border-gray-300 rounded-md"
              >
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between items-center w-full px-4 py-2 text-sm font-medium text-left text-blue-900 rounded-t-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                      <div className="flex items-center space-x-2">
                        {section.icon}
                        <span>{section.title}</span>
                      </div>
                      {open ? (
                        <ChevronUpIcon className="w-5 h-5 text-blue-500" />
                      ) : (
                        <ChevronDownIcon className="w-5 h-5 text-blue-500" />
                      )}
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                      {section.content}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterTemplate;
