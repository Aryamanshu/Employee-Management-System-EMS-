import React, { useContext, useEffect, useState } from 'react';
import Login from './components/Auth/Login';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import HelpSupport from './components/other/HelpSupport';
import { AuthContext } from './context/AuthProvider';
import Layout from './components/layout/Layout';

const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [authData] = useContext(AuthContext);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      try {
        const userData = JSON.parse(loggedInUser);
        setUser(userData.role);
        setLoggedInUserData(userData.data);
      } catch (error) {
        console.error('Error parsing user data:', error);
        // Clear invalid data
        localStorage.removeItem('loggedInUser');
      }
    }
  }, []);

  const handleLogin = (email, password) => {
    if (email === 'admin@me.com' && password === '123') {
      setUser('admin');
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin' }));
      return true;
    } else if (authData) {
      const employee = authData.employees.find((e) => email === e.email && e.password === password);
      if (employee) {
        setUser('employee');
        setLoggedInUserData(employee);
        localStorage.setItem('loggedInUser', JSON.stringify({ role: 'employee', data: employee }));
        return true;
      }
    }

    // Login failed
    return false;
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);
    setLoggedInUserData(null);
  };

  // If user is not logged in, show login page
  if (!user) {
    return <Login handleLogin={handleLogin} />;
  }

  // Handle navigation between different sections
  const handleNavigation = (section) => {
    setActiveSection(section);
  };

  // Render the appropriate dashboard inside the layout
  return (
    <Layout
      user={user}
      userData={loggedInUserData}
      onLogout={handleLogout}
      onNavigate={handleNavigation}
      activeSection={activeSection}
    >
      {activeSection === 'help-&-support' ? (
        <HelpSupport />
      ) : user === 'admin' ? (
        <AdminDashboard activeSection={activeSection} />
      ) : (
        <EmployeeDashboard data={loggedInUserData} activeSection={activeSection} />
      )}
    </Layout>
  );
};

export default App;