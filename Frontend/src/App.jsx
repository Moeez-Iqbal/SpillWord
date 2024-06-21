import React from 'react';
import './index.css';
import Index from './components';
import approuter from "./router/appRoute"

const App = () => {
  return (
    <div className="flex h-screen">
    
    <Index/>
    {/* <approuter/> */}
    </div>
  );
}

export default App;
