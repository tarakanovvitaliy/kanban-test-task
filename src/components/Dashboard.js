import React, { useEffect, useContext } from 'react';
import { AppContext } from '../context/appContext';
import { columnsListener } from '../api/api';
import DashboardColumn from './DashboardColumn';

function Dashboard(props) {
  const { columns, setColumns } = useContext(AppContext);
  
  useEffect(() => {
    columnsListener(fetchColumns);
    // eslint-disable-next-line 
  }, []);
  

  function fetchColumns (columns) {
    setColumns(columns);
  }
  
  return (
    <div className="Dashboard">
      { columns && columns.map((column, index) => 
          <DashboardColumn key={index} title={column.name} /> )
      }
      <DashboardColumn />
    </div>
  );
}

export default Dashboard;
