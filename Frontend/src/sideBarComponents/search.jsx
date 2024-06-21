// src/components/Sidebar.jsx
import React, { useState } from 'react';
import PeopleSearch from '../searchSideBarComponets/peopleSearch';
import CompaniesSearch from '../searchSideBarComponets/companiesSearch';
import { SlPeople } from "react-icons/sl";
import { AiOutlineTeam, AiOutlineFile } from "react-icons/ai";

function Search() {
  const [boolean, setBoolean] = useState(true);

  return (
    <>
      <div className="w-screen h-screen" style={{ backgroundColor: "#F3F4F6" }}>
        <div className="p-4 bg-white ">
          <h2 className="text-xl font-bold mb-4">Search</h2>
          <div>
            <div className="flex items-center justify-between space-x-4">
              <div>
                <ul className="flex">
                  <li className="mb-2 hover:bg-blue-200 rounded">
                    <button
                      className="text-blue-500 flex items-center "
                      onClick={() => setBoolean(true)}
                    >
                      <SlPeople className="mr-2" />
                      <span>People</span>
                    </button>
                  </li>
                  <li className="mb-2 ml-4 hover:bg-blue-200 rounded">
                    <button
                      onClick={() => setBoolean(false)}
                      className="text-blue-500 flex items-center"
                    >
                      <AiOutlineTeam className="mr-2" />
                      <span>Companies</span>
                    </button>
                  </li>
                  <li className="mb-2 ml-4 hover:bg-blue-200 rounded">
                    <button
                      onClick={() => setBoolean(false)}
                      className="text-blue-500 flex items-center"
                    >
                      <AiOutlineFile className="mr-2" />
                      <span>Save List</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Second Div */}
        <div className="flex">
          {boolean ? (
            <>
              <div className="flex" style={{ width: "80rem" }}>
                <PeopleSearch />
              </div>
            </>
          ) : (
            <>
              <div className="flex" style={{ width: "80rem" }}>
                <CompaniesSearch />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Search;
