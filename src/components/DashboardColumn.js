import React, { useEffect, useState, useRef } from 'react';
import useOutsideClick from '../hooks/useOutsideClick';
import { addColumn } from '../api/api';

function DashboardColumn(props) {
  const { title } = props;
  const [ columnTitle, setColumnTitle ] = useState('');
  const [ addMode, setAddMode ] = useState(false);
  const refInput = useRef(null);
  const refColumn = useRef(null);
  
  useOutsideClick(refColumn, () => setAddMode(false));
  
  useEffect(() => {
    if (addMode) refInput.current.focus();
  }, [addMode]);
  
  function handleClick (event) {
    event.preventDefault();
    
    if (addMode) {
      handleSubmit(event);
      setAddMode(false);
    }
    else setAddMode(true);
  }
  function handleSubmit (event) {
    event.preventDefault();

    if (columnTitle.length > 0) {
      addColumn(columnTitle).catch(err => console.error(err));
      setColumnTitle('');
      setAddMode(false);
    }
  }
  
  return (
    <div className="DashboardColumn">
      <header ref={refColumn} className="DashboardColumn__header">
        { title
          ? title
          : <button onClick={handleClick} />
        }
        { addMode && 
          <form onSubmit={handleSubmit} >
            <input 
              ref={refInput}
              type="text"
              value={columnTitle}
              placeholder="Add Column"
              onChange={e => setColumnTitle(e.target.value)}
            />
          </form>
        }
      </header>
    </div>
  );
}

export default DashboardColumn;
