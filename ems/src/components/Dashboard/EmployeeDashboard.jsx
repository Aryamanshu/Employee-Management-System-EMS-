import React, { useState, useEffect, useContext } from 'react';
import TaskList from '../TaskList/TaskList';
import EditProfile from '../other/EditProfile';
import ChangePassword from '../other/ChangePassword';
import { AuthContext } from '../../context/AuthProvider';

const EmployeeDashboard = ({ data: initialData, activeSection }) => {
  const [activeTab, setActiveTab] = useState('tasks');
  const [userData] = useContext(AuthContext);

  // Get the latest user data from context
  const getCurrentUserData = () => {
    if (!userData || !userData.employees || !initialData) return initialData;

    const currentUser = userData.employees.find(emp => emp.email === initialData.email);
    return currentUser || initialData;
  };

  // State to track the current user data
  const [currentData, setCurrentData] = useState(initialData);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Update current data when userData changes
  useEffect(() => {
    setCurrentData(getCurrentUserData());
  }, [userData, initialData]);

  // Clear success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Handle profile update
  const handleProfileUpdate = (updatedEmployee) => {
    setCurrentData(updatedEmployee);
    setSuccessMessage('Profile updated successfully!');
  };

  // Get the current user data
  const data = currentData;

  // Update active tab based on navigation from sidebar
  useEffect(() => {
    if (activeSection) {
      // Map section names to tab names
      const sectionToTab = {
        'dashboard': 'tasks',
        'my-tasks': 'tasks',
        'calendar': 'calendar',
        'profile': 'profile',
        'performance': 'performance'
      };

      if (sectionToTab[activeSection] && sectionToTab[activeSection] !== activeTab) {
        setActiveTab(sectionToTab[activeSection]);
      }
    }
  }, [activeSection]);

  if (!data) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  // Calculate task statistics
  const taskStats = data.taskCounts || { active: 0, newTask: 0, completed: 0, failed: 0 };

  // Calculate completion rate
  const totalTasks = taskStats.active + taskStats.completed + taskStats.failed + taskStats.newTask;
  const completionRate = totalTasks > 0 ? Math.round((taskStats.completed / totalTasks) * 100) : 0;

  return (
    <div className="space-y-6 relative">
      {/* Success message */}
      {successMessage && (
        <div className="fixed top-4 right-4 z-50 bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300 px-4 py-3 rounded-lg shadow-lg max-w-md animate-fadeIn">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>{successMessage}</span>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <EditProfile
          employee={data}
          onClose={() => setShowEditProfile(false)}
          onUpdate={handleProfileUpdate}
        />
      )}

      {/* Change Password Modal */}
      {showChangePassword && (
        <ChangePassword
          employee={data}
          onClose={() => setShowChangePassword(false)}
        />
      )}

      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">My Dashboard</h1>
          <p className="mt-1 text-neutral-600 dark:text-neutral-400">Welcome back, {data.firstName}</p>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-white dark:bg-neutral-800">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">New Tasks</h2>
              <p className="text-2xl font-semibold text-neutral-900 dark:text-white">{taskStats.newTask}</p>
            </div>
          </div>
        </div>

        <div className="card bg-white dark:bg-neutral-800">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-warning-100 dark:bg-warning-900/30 text-warning-600 dark:text-warning-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Active Tasks</h2>
              <p className="text-2xl font-semibold text-neutral-900 dark:text-white">{taskStats.active}</p>
            </div>
          </div>
        </div>

        <div className="card bg-white dark:bg-neutral-800">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-success-100 dark:bg-success-900/30 text-success-600 dark:text-success-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Completed</h2>
              <p className="text-2xl font-semibold text-neutral-900 dark:text-white">{taskStats.completed}</p>
            </div>
          </div>
        </div>

        <div className="card bg-white dark:bg-neutral-800">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-danger-100 dark:bg-danger-900/30 text-danger-600 dark:text-danger-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Failed</h2>
              <p className="text-2xl font-semibold text-neutral-900 dark:text-white">{taskStats.failed}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-neutral-200 dark:border-neutral-700">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('tasks')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'tasks' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300'}`}
          >
            My Tasks
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'calendar' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300'}`}
          >
            Calendar
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'profile' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300'}`}
          >
            Profile
          </button>
        </nav>
      </div>

      {/* Tab content */}
      <div className="mt-6">
        {activeTab === 'tasks' && (
          <div className="space-y-6">
            {/* Task progress */}
            <div className="card">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-neutral-900 dark:text-white">Task Completion</h3>
                <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">{completionRate}% complete</span>
              </div>
              <div className="w-full bg-neutral-200 rounded-full h-2.5 dark:bg-neutral-700">
                <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: `${completionRate}%` }}></div>
              </div>
            </div>

            {/* Task list */}
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-neutral-900 dark:text-white">My Tasks</h3>
                <div className="flex space-x-2">
                  <button className="btn-outline py-1 px-3 text-sm">
                    <span className="mr-1">🔍</span> Filter
                  </button>
                  <button className="btn-outline py-1 px-3 text-sm">
                    <span className="mr-1">⬇️</span> Sort
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <TaskList data={data} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="card">
            <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Calendar</h3>
            <div className="h-96 flex items-center justify-center">
              <p className="text-neutral-500 dark:text-neutral-400">Calendar view coming soon</p>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="card">
            <div className="flex flex-col md:flex-row md:items-center space-y-6 md:space-y-0 md:space-x-6">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-4xl text-primary-600 dark:text-primary-400">
                  {data.firstName.charAt(0)}
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{data.firstName}</h3>
                <p className="text-neutral-600 dark:text-neutral-400">{data.email}</p>
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => setShowEditProfile(true)}
                    className="btn-primary py-1 px-3 text-sm"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={() => setShowChangePassword(true)}
                    className="btn-outline py-1 px-3 text-sm"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-neutral-200 dark:border-neutral-700 pt-6">
              <h4 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Profile Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Full Name</label>
                  <input type="text" className="input" value={data.firstName} disabled />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Email Address</label>
                  <input type="email" className="input" value={data.email} disabled />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Employee ID</label>
                  <input type="text" className="input" value={data.id} disabled />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Role</label>
                  <input type="text" className="input" value="Employee" disabled />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
  }
`;
document.head.appendChild(style);

export default EmployeeDashboard;