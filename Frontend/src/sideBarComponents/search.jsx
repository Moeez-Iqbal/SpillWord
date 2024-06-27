import React, { useState } from 'react';
import PeopleSearch from '../searchSideBarComponets/peopleSearch';
import CompaniesSearch from '../searchSideBarComponets/companiesSearch';
import { SlPeople } from "react-icons/sl";
import { AiOutlineTeam, AiOutlineFile } from "react-icons/ai";

function Search() {
  const [boolean, setBoolean] = useState(true);
  const [showSaveList, setShowSaveList] = useState(false);

  const handleShowSaveList = () => {
    setShowSaveList(true);
    setBoolean(false); // Ensure other toggles are off if necessary
  };

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
                      className={`text-blue-500 flex items-center ${boolean && !showSaveList ? 'font-bold' : ''}`}
                      onClick={() => { setBoolean(true); setShowSaveList(false); }}
                    >
                      <SlPeople className="mr-2" />
                      <span>People</span>
                    </button>
                  </li>
                  <li className="mb-2 ml-4 hover:bg-blue-200 rounded">
                    <button
                      className={`text-blue-500 flex items-center ${!boolean && !showSaveList ? 'font-bold' : ''}`}
                      onClick={() => { setBoolean(false); setShowSaveList(false); }}
                    >
                      <AiOutlineTeam className="mr-2" />
                      <span>Companies</span>
                    </button>
                  </li>
                  <li className="mb-2 ml-4 hover:bg-blue-200 rounded">
                    <button
                      className={`text-blue-500 flex items-center ${showSaveList ? 'font-bold' : ''}`}
                      onClick={handleShowSaveList}
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
        {/* Conditional Rendering based on boolean and showSaveList */}
        <div className="flex">
          {boolean && !showSaveList && (
            <div className="flex" style={{ width: "80rem" }}>
              <PeopleSearch />
            </div>
          )}
          {!boolean && !showSaveList && (
            <div className="flex" style={{ width: "80rem" }}>
              <CompaniesSearch />
            </div>
          )}
          {showSaveList && (
            <div className="flex" style={{ width: "80rem" }}>
              {/* Insert your Save List component here */}
              <div>
                <h3>This will be the Save List component</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Search;
