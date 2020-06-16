import React, { createContext, useState } from 'react';

export const DashboardContext = createContext();

const ContextProvider = props => {
  const [ columns, setColumns ] = useState(null);
  const [ items, setItems ] = useState(null);
  
  return (
    <DashboardContext.Provider value={{ columns, setColumns, items, setItems }}>
      { props.children }
    </DashboardContext.Provider>
  );
};

export default ContextProvider;