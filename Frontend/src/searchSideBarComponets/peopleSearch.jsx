import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";
import {
  MdEmail,
  MdPerson,
  MdList,
  MdDateRange,
  MdError,
  MdBusiness,
} from "react-icons/md";

function PeopleSearch() {
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [emailList, setEmailList] = useState([]);
  const [filter, setFilter] = useState({
    Listname: "",
    industry: "",
    country: "",
    city: "",
    name: "",
    timezone: "",
    totalYearsOfExperience: "",
    timeInCurrentRole: "",
    sequence: "",
    lastActivity: "",
    emailSent: "",
  });
  const [selectedEmails, setSelectedEmails] = useState([]);

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
          onChange={(selectedOption) => {
            setSelectedEmail(selectedOption);
            handleFilterChange("emailSent", selectedOption?.value || "");
          }}
          placeholder="Specify email..."
        />
      ),
      filterKey: "emailSent",
    },
    {
      title: "Persona",
      icon: <MdPerson className="mr-2" />,
      content: (
        <Select
          options={[]} /* Replace with persona options */
          value={filter.persona}
          onChange={(selectedOption) =>
            handleFilterChange("persona", selectedOption)
          }
          placeholder="Select persona..."
        />
      ),
      filterKey: "persona",
    },
    {
      title: "Lists",
      icon: <MdList className="mr-2" />,
      content: (
        <Select
          options={[]} /* Replace with list options */
          value={filter.list}
          onChange={(selectedOption) =>
            handleFilterChange("list", selectedOption)
          }
          placeholder="Select list..."
        />
      ),
      filterKey: "list",
    },
    {
      title: "Email Status",
      icon: <MdDateRange className="mr-2" />,
      content: (
        <Select
          options={[]} /* Replace with email status options */
          value={filter.emailStatus}
          onChange={(selectedOption) =>
            handleFilterChange("emailStatus", selectedOption)
          }
          placeholder="Select email status..."
        />
      ),
      filterKey: "emailStatus",
    },
    {
      title: "Not Sent Reason",
      icon: <MdError className="mr-2" />,
      content: (
        <Select
          options={[]} /* Replace with not sent reason options */
          value={filter.notSentReason}
          onChange={(selectedOption) =>
            handleFilterChange("notSentReason", selectedOption)
          }
          placeholder="Select not sent reason..."
        />
      ),
      filterKey: "notSentReason",
    },
    {
      title: "Companies",
      icon: <MdBusiness className="mr-2" />,
      content: (
        <Select
          options={[]} /* Replace with company options */
          value={filter.company}
          onChange={(selectedOption) =>
            handleFilterChange("company", selectedOption)
          }
          placeholder="Select company..."
        />
      ),
      filterKey: "company",
    },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3002/getemail", {
        params: filter,
      });
      setEmailList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filter]);

  const handleFilterChange = (name, value) => {
    setFilter({ ...filter, [name]: value });
  };

  const toggleSelectEmail = (email) => {
    if (selectedEmails.includes(email)) {
      setSelectedEmails(selectedEmails.filter((e) => e !== email));
    } else {
      setSelectedEmails([...selectedEmails, email]);
    }
  };

  const handleSendClick = () => {
    if (selectedEmails.length > 0) {
      const toEmails = selectedEmails.join(';');
      window.location.href = `mailto:${toEmails}`;
    } else {
      alert('Please select at least one email to send.');
    }
  };

  return (
    <>
      <div className="w-screen h-screen bg-gray-100">
        <div className="flex">
          {/* Sidebar with Filters */}
          <div className="w-1/4 bg-white shadow-md p-4 mx-4 my-6 rounded">
            <h3 className="font-bold text-lg mb-4">Filters</h3>
            {/* Filter sections */}
            {sections.map((section, index) => (
              <Disclosure key={index}>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full py-2 px-4 text-sm font-medium text-left text-blue-900 rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
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
                    <Disclosure.Panel className="px-4 pt-2 pb-4 text-sm text-gray-500">
                      {section.content}
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
          {/* Main Content Area */}
          <div className="flex-1 p-4">
            <div className="flex justify-end mb-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600"
                onClick={handleSendClick}
              >
                Send
              </button>
              <button className="px-4 py-2 ml-2 bg-gray-200 text-gray-700 rounded-md font-semibold hover:bg-gray-300">
                Export
              </button>
              <button className="px-4 py-2 ml-2 bg-red-500 text-white rounded-md font-semibold hover:bg-red-600">
                Delete
              </button>
              <button className="px-4 py-2 ml-2 bg-green-500 text-white rounded-md font-semibold hover:bg-green-600">
                Add to existing list
              </button>
            </div>
            <div className="bg-white rounded-md border border-gray-300 p-4">
              {/* Display email list */}
              {emailList.length === 0 ? (
                <div className="text-center text-gray-500">
                  No emails found.
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {emailList.map((email, index) => (
                    <li key={index} className="flex items-center space-x-4 p-2">
                      <input
                        type="checkbox"
                        className="form-checkbox h-6 w-6 text-blue-500"
                        checked={selectedEmails.includes(email.email)}
                        onChange={() => toggleSelectEmail(email.email)}
                      />
                      <span>{email.Listname} - {email.email}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PeopleSearch;
