// src/components/PeopleSearch.jsx
import React, { useState } from "react";
import Select from "react-select";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { MdEmail, MdPerson, MdList, MdDateRange, MdError, MdBusiness } from "react-icons/md";

function PeopleSearch() {
    const [selectedEmail, setSelectedEmail] = useState(null);

    const emailOptions = [
      { value: "email1@example.com", label: "email1@example.com" },
      { value: "email2@example.com", label: "email2@example.com" },
      { value: "email3@example.com", label: "email3@example.com" },
    ];
  
    const sections = [
      {
        title: "From Email",
        icon: <MdEmail className="mr-2" />,
        content: (
          <Select
            options={emailOptions}
            value={selectedEmail}
            onChange={setSelectedEmail}
            placeholder="Specify email..."
          />
        ),
      },
      { title: "Persona", icon: <MdPerson className="mr-2" />, content: <p>Sequence content here...</p> },
      { title: "Lists", icon: <MdList className="mr-2" />, content: <p>Contact list content here...</p> },
      { title: "Email Status", icon: <MdDateRange className="mr-2" />, content: <p>Date range content here...</p> },
      { title: "Not Sent Reason", icon: <MdError className="mr-2" />, content: <p>Not sent reason content here...</p> },
      { title: "Companies", icon: <MdBusiness className="mr-2" />, content: <p>Email opened content here...</p> },
    ];
  
    return (
      <>
        <div className="w-screen h-screen" style={{ backgroundColor: "#F3F4F6" }}>
          <div className="flex">
            <div>
              <div className="flex py-3 px-3" style={{ height: "34rem" }}>
                <div className="bg-white shadow-md rounded p-4">
                  <div className="flex justify-between py-1">
                    <h3 className="font-bold">Filters</h3>
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
                              <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-900 rounded-t-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                <div className="flex items-center">
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
            </div>
  
            <div className="flex-1 p-4">
              <div className="bg-white">
                <div className="flex items-center px-2 py-3">
                  <button className="px-4 py-2 text-black bg-gray-200 rounded-md">
                    Hide Filters
                  </button>
                </div>
  
                <hr />
                <div>
                  <div className="flex">
                    <div className="ml-auto items-center space-x-4">
                      <select className="border border-gray-300 rounded-md">
                        <option>im.uxama85@gmail.com</option>
                      </select>
                    </div>
                    <div>0 / 50 Daily emails sent</div>
                  </div>
                  <div
                    className="flex items-center justify-center h-64 border border-dashed bg-white border-gray-300 rounded-md"
                    style={{ height: "28rem" }}
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
            </div>
          </div>
        </div>
      </>
    );
}

export default PeopleSearch;
