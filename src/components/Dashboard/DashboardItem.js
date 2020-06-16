import React, { useState, useRef, useEffect } from 'react';
import useOutsideClick from '../../hooks/useOutsideClick';
import { addItem } from '../../api/dashboardApi';

function DashboardItem(props) {
  const { title, columnId } = props;
  const [ addMode, setAddMode ] = useState(false);
  const [ itemTitle, setItemTitle ] = useState('');
  const refInput = useRef(null);
  const refItem = useRef(null);

  useOutsideClick(refItem, () => setAddMode(false));
  
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

    if (itemTitle.length > 0) {
      addItem(itemTitle, columnId).catch(err => console.error(err));
      setItemTitle('');
      setAddMode(false);
    }
  }
  
  return (
    <div className="DashboardItem" ref={refItem} >
      <button
        className="DashboardItem__btn"
        disabled={title ? true : false}
        onClick={handleClick} 
      />

      { title && <div className="DashboardItem__name">{title}</div> }
      
      { addMode && 
        <form onSubmit={handleSubmit} className="DashboardItem__input" >
          <input 
            ref={refInput}
            type="text"
            value={itemTitle}
            placeholder="Add an Item"
            onChange={e => setItemTitle(e.target.value)}
          />
        </form>
      }
    </div>
  );
}

export default DashboardItem;
