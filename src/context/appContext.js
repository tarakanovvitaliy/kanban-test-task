import React, { createContext, useState } from 'react';

export const AppContext = createContext();

const ContextProvider = props => {
  const [ columns, setColumns ] = useState(null);
  const [ items, setItems ] = useState(null);
  
  return (
    <AppContext.Provider value={{ columns, setColumns, items, setItems }}>
      { props.children }
    </AppContext.Provider>
  );
};

export default ContextProvider;