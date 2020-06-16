import React from 'react';
import ContextProvider from './context/appContext';
import Dashboard from './components/Dashboard';

function AppProvider() {
  return <ContextProvider><App /></ContextProvider>;
}

function App() {
  return (
    <div className="App">
      <header className="App__header">Page Title</header>
      <Dashboard />
    </div>
  );
}

export default AppProvider;
