import React from 'react';
import Header from './Header';
import Sidebar from './SideBar';

const MyBasicLayout = ({ children, showSidebar = true, showHeader = true }) => {
  return (
    <div className="h-screen flex flex-col">
      {/* Header at the top */}
      {showHeader && (
        <div>
          <Header />
        </div>
      )}

      {/* Main Content Area with Sidebar and Children */}
      <div className="flex flex-1">
        {showSidebar && (
          <div className="w-64">
            <Sidebar />
          </div>
        )}
        <div className="flex-1 p-8 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default MyBasicLayout;
