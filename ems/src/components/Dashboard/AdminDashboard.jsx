import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import CreateTask from '../other/CreateTask';
import AllTask from '../other/AllTask';

const AdminDashboard = () => {
  const [authData] = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('overview');

  // Calculate statistics
  const calculateStats = () => {
    if (!authData || !authData.employees) return { totalEmployees: 0, totalTasks: 0, completedTasks: 0, pendingTasks: 0 };

    const employees = authData.employees;
    let totalTasks = 0;
    let completedTasks = 0;
    let pendingTasks = 0;

    employees.forEach(employee => {
      if (employee.tasks) {
        totalTasks += employee.tasks.length;
        employee.tasks.forEach(task => {
          if (task.completed) completedTasks++;
          else pendingTasks++;
        });
      }
    });

    return {
      totalEmployees: employees.length,
      totalTasks,
      completedTasks,
      pendingTasks
    };
  };

  const stats = calculateStats();

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Admin Dashboard</h1>
          <p className="mt-1 text-neutral-600 dark:text-neutral-400">Manage your employees and tasks</p>
        </div>
        <div>
          <button className="btn-primary">
            <span className="mr-2">+</span> Add Employee
          </button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card bg-white dark:bg-neutral-800">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Total Employees</h2>
              <p className="text-2xl font-semibold text-neutral-900 dark:text-white">{stats.totalEmployees}</p>
            </div>
          </div>
        </div>

        <div className="card bg-white dark:bg-neutral-800">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
              </svg>
            </div>
            <div className="ml-4">
              <h2 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Total Tasks</h2>
              <p className="text-2xl font-semibold text-neutral-900 dark:text-white">{stats.totalTasks}</p>
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
              <h2 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Completed Tasks</h2>
              <p className="text-2xl font-semibold text-neutral-900 dark:text-white">{stats.completedTasks}</p>
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
              <h2 className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Pending Tasks</h2>
              <p className="text-2xl font-semibold text-neutral-900 dark:text-white">{stats.pendingTasks}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-neutral-200 dark:border-neutral-700">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'overview' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300'}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('employees')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'employees' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300'}`}
          >
            Employees
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'tasks' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300'}`}
          >
            Tasks
          </button>
        </nav>
      </div>

      {/* Tab content */}
      <div className="mt-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                      A
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-neutral-900 dark:text-white">Arjun completed a task</p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">Completed "Update website" task</p>
                    <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                      S
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-neutral-900 dark:text-white">Sneha accepted a new task</p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400">Accepted "Database optimization" task</p>
                    <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">5 hours ago</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Task Distribution</h3>
                <div className="h-64 flex items-center justify-center">
                  <p className="text-neutral-500 dark:text-neutral-400">Chart placeholder</p>
                </div>
              </div>

              <div className="card">
                <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Employee Performance</h3>
                <div className="h-64 flex items-center justify-center">
                  <p className="text-neutral-500 dark:text-neutral-400">Chart placeholder</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'employees' && (
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-neutral-900 dark:text-white">All Employees</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search employees..."
                  className="input py-1 pl-8 pr-4"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
              </div>
            </div>

            <div className="-mx-6 -mb-6 overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
                <thead className="bg-neutral-50 dark:bg-neutral-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Email</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Active Tasks</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Completed</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700">
                  {authData && authData.employees && authData.employees.map((employee, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                            {employee.firstName.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-neutral-900 dark:text-white">{employee.firstName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-neutral-500 dark:text-neutral-400">{employee.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-neutral-900 dark:text-white">{employee.taskCounts?.active || 0}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-neutral-900 dark:text-white">{employee.taskCounts?.completed || 0}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300 mr-3">View</button>
                        <button className="text-danger-600 hover:text-danger-900 dark:text-danger-400 dark:hover:text-danger-300">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="space-y-6">
            <CreateTask />
            <AllTask />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;