import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";
import {
  MdEmail,
  MdList,
  MdDateRange,
  MdError,
  MdBusiness,
} from "react-icons/md";
import EmailTemplatePopUp from "./emailTemplate"; // Import the popup component

function PeopleSearch() {
  const [selectedEmails, setSelectedEmails] = useState([]);
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
    emailClicked: "",
    emailReplied: "",
    emailMeetingSet: "",
    emailBounced: "",
    list: "",
    emailStatus: "",
    notSentReason: "",
    company: "",
  });
  const [filterOptions, setFilterOptions] = useState({
    lists: [],
    emailStatusOptions: [],
    notSentReasonOptions: [],
    companies: [],
    countries: [],
    industries: [],
  });
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Manage popup state

  const emailOptions = [
    { value: "email1@example.com", label: "Email 1" },
    { value: "email2@example.com", label: "Email 2" },
    { value: "email3@example.com", label: "Email 3" },
  ];

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const [
          listsRes,
          emailStatusRes,
          notSentReasonRes,
          companiesRes,
          countryRes,
          industryRes,
        ] = await Promise.all([
          axios.get("http://localhost:3002/getemail", {
            params: { company: filter.company },
          }),
          axios.get("http://localhost:3002/email-status"),
          axios.get("http://localhost:3002/not-sent-reasons"),
          axios.get("http://localhost:3002/unique-companies"),
          axios.get("http://localhost:3002/getmail", {
            params: { industry: filter.industry },
          }),
        ]);

        setFilterOptions({
          lists: listsRes.data,
          emailStatusOptions: emailStatusRes.data,
          notSentReasonOptions: notSentReasonRes.data,
          companies: companiesRes.data.map((company) => ({
            value: company,
            label: company,
          })),
          countries: countryRes.data.map((country) => ({
            value: country,
            label: country,
          })),
          industries: industryRes.data.map((industry) => ({
            value: industry,
            label: industry,
          })),
        });
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    };

    fetchFilterOptions();
  }, [filter.company, filter.industry]);

  const fetchData = async () => {
    try {
      const { company, Listname, ...restFilters } = filter;
      const response = await axios.get("http://localhost:3002/getemail", {
        params: {
          company: company,
          Listname: Listname,
          ...restFilters,
        },
      });
      console.log("getmail", response.data);
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
    setSelectedEmails((prevSelected) => {
      if (prevSelected.includes(email)) {
        return prevSelected.filter((e) => e !== email);
      } else {
        return [...prevSelected, email];
      }
    });
  };

  const handleSendClick = () => {
    if (selectedEmails.length > 0) {
      setIsPopupOpen(true); // Open the popup
    } else {
      alert("Please select at least one email to send.");
    }
  };

  const sections = [
    {
      title: "From Email",
      icon: <MdEmail className="mr-2" />,
      content: (
        <Select
          options={[{ value: "", label: "Select email..." }, ...emailOptions]}
          value={selectedEmails.map((email) => ({
            value: email,
            label: email,
          }))}
          isMulti
          onChange={(selectedOptions) => {
            const selectedEmails = selectedOptions.map(
              (option) => option.value
            );
            setSelectedEmails(selectedEmails);
            handleFilterChange("emailSent", selectedEmails.join(","));
          }}
          placeholder="Specify email..."
        />
      ),
      filterKey: "emailSent",
    },
    {
      title: "Lists",
      icon: <MdList className="mr-2" />,
      content: (
        <Select
          options={filterOptions.lists.map((l) => ({ value: l, label: l }))}
          value={filter.list}
          onChange={(selectedOption) =>
            handleFilterChange("list", selectedOption?.value || "")
          }
          placeholder="Select list..."
        />
      ),
      filterKey: "list",
    },
    {
      title: "Country",
      icon: <MdDateRange className="mr-2" />,
      content: (
        <Select
          options={filterOptions.countries}
          value={filter.country}
          onChange={(selectedOption) =>
            handleFilterChange("country", selectedOption?.value || "")
          }
          placeholder="Select country..."
        />
      ),
      filterKey: "country",
    },
    {
      title: "Industry",
      icon: <MdError className="mr-2" />,
      content: (
        <Select
          options={filterOptions.industries}
          value={filter.industry}
          onChange={(selectedOption) =>
            handleFilterChange("industry", selectedOption?.value || "")
          }
          placeholder="Select industry..."
        />
      ),
      filterKey: "industry",
    },
    {
      title: "Companies",
      icon: <MdBusiness className="mr-2" />,
      content: (
        <Select
          options={filterOptions.companies}
          value={filter.company}
          onChange={(selectedOption) =>
            handleFilterChange("company", selectedOption?.value || "")
          }
          placeholder="Type to search companies..."
          onInputChange={(inputValue) =>
            handleFilterChange("company", inputValue)
          }
        />
      ),
      filterKey: "company",
    },
  ];

  return (
    <>
      <div className="w-screen h-screen bg-gray-100">
        <div className="flex">
          <div className="w-1/4 bg-white shadow-md p-4 mx-4 my-6 rounded">
            <h3 className="font-bold text-lg mb-4">Filters</h3>
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
              {emailList.length === 0 ? (
                <div className="text-center text-gray-500">
                  No emails found.
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {emailList.map((email, index) => (
                    <li key={email._id} className="py-2 flex items-center">
                      <input
                        key={email._id}
                        type="checkbox"
                        className="mr-2"
                        checked={selectedEmails.includes(email._id)}
                        onChange={() => toggleSelectEmail(email._id)}
                      />
                      <div className="flex-1">
                        {email.Listname}: {email.email}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Render the popup component if open */}
      {isPopupOpen && (
        <EmailTemplatePopUp
          selectedEmails={selectedEmails.map((emailId) => {
            const selectedEmail = emailList.find(
              (email) => email._id === emailId
            );
            return {
              value: selectedEmail.email, // Assuming you want to use the email address as value and label
              label: selectedEmail.email,
            };
          })}
          userEmailAddress={filter.name}
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </>
  );
}

export default PeopleSearch;
