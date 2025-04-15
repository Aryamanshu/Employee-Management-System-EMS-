import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const Layout = ({ children, user, userData, onLogout, onNavigate, activeSection }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [internalActiveSection, setInternalActiveSection] = useState('dashboard');
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New task assigned to you', time: '2 minutes ago', read: false },
    { id: 2, message: 'Your task "Update website" is due tomorrow', time: '1 hour ago', read: false },
    { id: 3, message: 'Meeting scheduled at 3 PM', time: '3 hours ago', read: true },
  ]);

  // Handle navigation between different sections
  const handleNavigation = (section) => {
    setInternalActiveSection(section);
    // Pass the active section to the parent component
    if (onNavigate) {
      onNavigate(section);
    }
  };

  // Use the prop value if provided, otherwise use internal state
  const currentSection = activeSection || internalActiveSection;

  // Initialize dark mode based on user preference or system preference
  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true' ||
                      window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }

    // Simulate page loading
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', !darkMode);
    document.documentElement.classList.toggle('dark');
  };

  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Toggle sidebar collapsed state
  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Mark all notifications as read
  const markAllNotificationsAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  // Mark a specific notification as read
  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  // Count unread notifications
  const unreadCount = notifications.filter(notification => !notification.read).length;

  if (pageLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-neutral-50 dark:bg-neutral-900 transition-colors duration-200">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 relative">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-primary-200 dark:border-primary-900 rounded-full animate-ping"></div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-primary-500 dark:border-primary-600 rounded-full animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary-600 dark:text-primary-400 text-xl font-bold">EMS</div>
          </div>
          <p className="mt-4 text-neutral-600 dark:text-neutral-400 animate-pulse">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-neutral-50 dark:bg-neutral-900 transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        isCollapsed={sidebarCollapsed}
        toggleSidebar={toggleSidebar}
        toggleCollapse={toggleSidebarCollapse}
        userRole={user}
        userData={userData}
        userName={userData?.firstName || 'Admin'}
        onNavigate={handleNavigation}
        activeSection={currentSection}
      />

      {/* Main Content */}
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-20' : ''}`}>
        <TopBar
          toggleSidebar={toggleSidebar}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          onLogout={onLogout}
          userName={userData?.firstName || 'Admin'}
          notifications={notifications}
          unreadCount={unreadCount}
          markAllAsRead={markAllNotificationsAsRead}
          markAsRead={markNotificationAsRead}
          userRole={user}
        />

        {/* Main content area with animation */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 transition-all duration-300 animate-fadeIn">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 py-4 px-6 text-center text-sm text-neutral-500 dark:text-neutral-400">
          <p>© {new Date().getFullYear()} Employee Management System. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
  }
`;
document.head.appendChild(style);

export default Layout;
