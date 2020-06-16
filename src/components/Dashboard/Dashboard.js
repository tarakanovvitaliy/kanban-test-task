import React, { useEffect, useContext } from 'react';
import ContextProvider, { DashboardContext } from './_store/dashboardContext';
import { columnsListener, itemsListener } from '../../api/dashboardApi';
import DashboardColumn from './DashboardColumn';

function DashboardProvider() {
  return <ContextProvider><Dashboard /></ContextProvider>;
}

function Dashboard(props) {
  const { columns, setColumns, setItems } = useContext(DashboardContext);
  
  useEffect(() => {
    columnsListener(fetchColumns);
    itemsListener(fetchItems);
    // eslint-disable-next-line 
  }, []);
  

  function fetchColumns (columns) {
    setColumns(columns);
  }

  function fetchItems (columns) {
    setItems(columns);
  }
  
  return (
    <div className="Dashboard">
      { columns && columns.map((column, index) => 
          <DashboardColumn key={index} title={column.name} columnId={column.id} /> )
      }
      <DashboardColumn />
    </div>
  );
}

export default DashboardProvider;
