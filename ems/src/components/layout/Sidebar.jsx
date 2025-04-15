import React from 'react';

const Sidebar = ({ isOpen, toggleSidebar, userRole, userName }) => {
  // Define navigation items based on user role
  const navItems = userRole === 'admin' 
    ? [
        { name: 'Dashboard', icon: '📊', active: true },
        { name: 'Employees', icon: '👥', active: false },
        { name: 'Tasks', icon: '📝', active: false },
        { name: 'Reports', icon: '📈', active: false },
        { name: 'Settings', icon: '⚙️', active: false },
      ]
    : [
        { name: 'Dashboard', icon: '📊', active: true },
        { name: 'My Tasks', icon: '📝', active: false },
        { name: 'Calendar', icon: '📅', active: false },
        { name: 'Profile', icon: '👤', active: false },
      ];

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-white dark:bg-neutral-800 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo and brand */}
          <div className="flex items-center justify-center h-16 px-6 border-b dark:border-neutral-700">
            <span className="text-xl font-bold text-primary-600 dark:text-primary-400">EMS</span>
          </div>

          {/* User info */}
          <div className="flex flex-col items-center py-4 border-b dark:border-neutral-700">
            <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-2xl">
              {userName.charAt(0)}
            </div>
            <h3 className="mt-2 text-sm font-medium text-neutral-900 dark:text-neutral-100">{userName}</h3>
            <span className="text-xs text-neutral-500 dark:text-neutral-400 capitalize">{userRole}</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-4 overflow-y-auto">
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className={`flex items-center px-4 py-3 text-sm rounded-lg ${
                      item.active
                        ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400'
                        : 'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700/50'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t dark:border-neutral-700">
            <a
              href="#"
              className="flex items-center px-4 py-2 text-sm text-neutral-700 rounded-lg hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-700/50"
            >
              <span className="mr-3">❓</span>
              <span>Help & Support</span>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
