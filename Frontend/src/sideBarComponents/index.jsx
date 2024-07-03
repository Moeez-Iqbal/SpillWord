  // src/components/Sidebar.jsx
  import React from 'react';
  import MainContent from './home';
  import Email from './email';
  import Deals from './deals';
  import Conversations from './conversation';
  import Calls from './calls';
  import Meetings from './meeting';
  import Search from './search';
  import Sequence from './sequence';
  import DataEnrichment from './dataEnrichment';

  function Home ({option})  {
    return (
    <>
    {option == "mainContent" &&  <MainContent/>}
    {option ==  "email" && <Email/>}
    {option ==  "deals" && <Deals/>}
      {option ==  "conversations" && <Conversations/>}
      {option ==  "calls" && <Calls/>}
      {option ==  "meetings" && <Meetings/>}
      {option ==   "search" && <Search/>}
      {option ==   "sequence" && <Sequence/>} 
      {option ==   "dataEnrichment" && <DataEnrichment/>} 

    </>
    );
  }

  export default Home;
