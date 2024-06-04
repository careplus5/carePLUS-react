// Layout.js
import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Common = ({ children, loggedInUsername }) => {
  return (
    <div className={loggedInUsername ? 'inCarePlus' : 'outCarePlus'}>
      <Header loggedInUsername={loggedInUsername} />
      <Sidebar />
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default Common;