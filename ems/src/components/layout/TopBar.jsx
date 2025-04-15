import React from 'react';

const TopBar = ({ toggleSidebar, darkMode, toggleDarkMode, onLogout, userName }) => {
  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-neutral-800 border-b dark:border-neutral-700 shadow-sm">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        {/* Left: Menu button (mobile) and breadcrumbs */}
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 mr-2 text-neutral-600 rounded-lg lg:hidden dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          
          {/* Breadcrumbs */}
          <div className="hidden md:flex items-center text-sm">
            <span className="text-neutral-900 dark:text-neutral-100">Dashboard</span>
          </div>
        </div>
        
        {/* Right: User actions */}
        <div className="flex items-center space-x-3">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 text-neutral-600 rounded-lg dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
          >
            {darkMode ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
              </svg>
            )}
          </button>
          
          {/* Notifications */}
          <button className="p-2 text-neutral-600 rounded-lg dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
            </svg>
          </button>
          
          {/* User menu */}
          <div className="relative">
            <button className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500">
              <span className="mr-2 text-neutral-700 dark:text-neutral-300 hidden md:block">{userName}</span>
              <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-sm text-primary-700 dark:text-primary-300">
                {userName.charAt(0)}
              </div>
            </button>
          </div>
          
          {/* Logout button */}
          <button
            onClick={onLogout}
            className="p-2 text-neutral-600 rounded-lg dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
