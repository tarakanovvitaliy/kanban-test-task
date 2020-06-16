import React, { useEffect, useState, useRef, useContext } from 'react';

// hooks // store // api
import useOutsideClick from '../../hooks/useOutsideClick';
import { DashboardContext } from './_store/dashboardContext';
import { addColumn, deleteColumn } from '../../api/dashboardApi';

// components
import DashboardItem from './DashboardItem';

function DashboardColumn(props) {
  const { title, columnId } = props;
  const { items } = useContext(DashboardContext);
  const [ columnTitle, setColumnTitle ] = useState('');
  const [ currentItems, setCurrentItems ] = useState([]);
  const [ addMode, setAddMode ] = useState(false);
  const refInput = useRef(null);
  const refColumn = useRef(null);
  
  useOutsideClick(refColumn, () => setAddMode(false));
  
  useEffect(() => {
    if (addMode) refInput.current.focus();
  }, [addMode]);

  useEffect(() => {
    if (items) {
      setCurrentItems(items.filter(item => item.columnId === columnId));
    }
    // eslint-disable-next-line
  }, [items]);
  
  function handleDelete () {
    deleteColumn(columnId);
  }
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
          ? <>
              <span>{ title }</span>
              <button className="DashboardColumn__deleteBtn" onClick={handleDelete} />
            </>
          : <button className="DashboardColumn__addBtn" onClick={handleClick} />
        }
        { addMode && 
          <form className="DashboardColumn__input" onSubmit={handleSubmit} >
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

      { title &&
        <div className="DashboardColumn__body">
          { currentItems.map((item, i) => <DashboardItem key={i} columnId={columnId} title={item.name} />)
          }
          <DashboardItem columnId={columnId} />
        </div>
      }
    </div>
  );
}

export default DashboardColumn;
