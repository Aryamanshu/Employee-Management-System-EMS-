import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import CreateTask from '../other/CreateTask';
import AllTask from '../other/AllTask';
import AddEmployee from '../other/AddEmployee';
import EmployeeDetails from '../other/EmployeeDetails';
import DeleteConfirmation from '../other/DeleteConfirmation';
import CircularCharts from '../charts/CircularCharts';
import EmployeePerformanceChart from '../charts/EmployeePerformanceChart';

const AdminDashboard = ({ activeSection }) => {
  const [userData, setUserData] = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  // Update active tab based on navigation from sidebar
  useEffect(() => {
    if (activeSection) {
      // Map section names to tab names
      const sectionToTab = {
        'dashboard': 'overview',
        'employees': 'employees',
        'tasks': 'tasks',
        'analytics': 'analytics'
      };

      if (sectionToTab[activeSection] && sectionToTab[activeSection] !== activeTab) {
        setActiveTab(sectionToTab[activeSection]);
      }
    }
  }, [activeSection]);

  // Calculate statistics
  const calculateStats = () => {
    if (!userData || !userData.employees) return { totalEmployees: 0, totalTasks: 0, completedTasks: 0, pendingTasks: 0, newTasks: 0, activeTasks: 0, failedTasks: 0 };

    const employees = userData.employees;
    let totalTasks = 0;
    let completedTasks = 0;
    let pendingTasks = 0;
    let newTasks = 0;
    let activeTasks = 0;
    let failedTasks = 0;

    employees.forEach(employee => {
      if (employee.tasks) {
        totalTasks += employee.tasks.length;
        employee.tasks.forEach(task => {
          if (task.completed) completedTasks++;
          else if (task.newTask) newTasks++;
          else if (task.active) activeTasks++;
          else if (task.failed) failedTasks++;

          if (!task.completed) pendingTasks++;
        });
      }
    });

    return {
      totalEmployees: employees.length,
      totalTasks,
      completedTasks,
      pendingTasks,
      newTasks,
      activeTasks,
      failedTasks
    };
  };

  // Force refresh stats when userData changes
  useEffect(() => {
    setRefreshKey(prevKey => prevKey + 1);
  }, [userData]);

  const stats = calculateStats();

  // Filter employees based on search term
  const filteredEmployees = userData?.employees?.filter(employee =>
    employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Handle employee addition
  const handleEmployeeAdded = (newEmployee) => {
    setSuccessMessage(`Employee ${newEmployee.firstName} added successfully!`);
    setTimeout(() => setSuccessMessage(''), 3000);
    setRefreshKey(prevKey => prevKey + 1);
  };

  // Handle viewing employee details
  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowEmployeeDetails(true);
  };

  // Handle employee deletion confirmation
  const handleDeleteEmployeeClick = (employee) => {
    setEmployeeToDelete(employee);
    setShowDeleteConfirmation(true);
  };

  // Handle employee deletion
  const handleDeleteEmployee = () => {
    setIsLoading(true);

    // Remove employee from userData
    const updatedEmployees = userData.employees.filter(emp => emp.id !== employeeToDelete.id);
    setUserData({ ...userData, employees: updatedEmployees });

    // Update localStorage
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));

    setIsLoading(false);
    setShowDeleteConfirmation(false);
    setEmployeeToDelete(null);
    setSuccessMessage(`Employee ${employeeToDelete.firstName} deleted successfully!`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Handle task deletion
  const handleDeleteTask = (employeeId, taskIndex) => {
    // Find the employee
    const employee = userData.employees.find(emp => emp.id === employeeId);
    if (!employee) return;

    // Get task status to update counts
    const task = employee.tasks[taskIndex];
    const updatedTaskCounts = { ...employee.taskCounts };

    if (task.newTask) updatedTaskCounts.newTask--;
    else if (task.active) updatedTaskCounts.active--;
    else if (task.completed) updatedTaskCounts.completed--;
    else if (task.failed) updatedTaskCounts.failed--;

    // Remove task from employee's tasks
    const updatedTasks = [...employee.tasks];
    updatedTasks.splice(taskIndex, 1);

    // Update employee with new tasks and counts
    const updatedEmployee = {
      ...employee,
      tasks: updatedTasks,
      taskCounts: updatedTaskCounts
    };

    // Update userData with updated employee
    const updatedEmployees = userData.employees.map(emp =>
      emp.id === employeeId ? updatedEmployee : emp
    );

    setUserData({ ...userData, employees: updatedEmployees });

    // Update localStorage
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));

    setSuccessMessage(`Task deleted successfully!`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="space-y-6">
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

      {/* Add Employee Modal */}
      {showAddEmployee && (
        <AddEmployee
          onClose={() => setShowAddEmployee(false)}
          onEmployeeAdded={handleEmployeeAdded}
        />
      )}

      {/* Employee Details Modal */}
      {showEmployeeDetails && selectedEmployee && (
        <EmployeeDetails
          employee={selectedEmployee}
          onClose={() => setShowEmployeeDetails(false)}
          onDeleteTask={handleDeleteTask}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmation && employeeToDelete && (
        <DeleteConfirmation
          title="Delete Employee"
          message={`Are you sure you want to delete ${employeeToDelete.firstName}? This action cannot be undone.`}
          onCancel={() => setShowDeleteConfirmation(false)}
          onConfirm={handleDeleteEmployee}
          isLoading={isLoading}
        />
      )}

      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Admin Dashboard</h1>
          <p className="mt-1 text-neutral-600 dark:text-neutral-400">Manage your employees and tasks</p>
        </div>
        <div>
          <button
            className="btn-primary"
            onClick={() => setShowAddEmployee(true)}
          >
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
              <div className="flex items-center text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                <span className="mr-2 text-primary-600 dark:text-primary-400">{stats.newTasks} new</span>
                <span className="mr-2 text-warning-600 dark:text-warning-400">{stats.activeTasks} active</span>
                <span className="text-danger-600 dark:text-danger-400">{stats.failedTasks} failed</span>
              </div>
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
            {/* Circular Charts */}
            <CircularCharts stats={stats} />

            {/* Employee Performance Chart */}
            <EmployeePerformanceChart employees={userData?.employees || []} />

            {/* Recent Activity */}
            <div className="card">
              <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Recent Activity</h3>
              {userData?.employees?.length > 0 ? (
                <div className="space-y-4">
                  {userData.employees.slice(0, 3).map((employee, idx) => {
                    // Find the most recent task for this employee
                    const recentTask = employee.tasks && employee.tasks.length > 0 ?
                      employee.tasks[employee.tasks.length - 1] : null;

                    if (!recentTask) return null;

                    let actionText = '';
                    if (recentTask.completed) actionText = 'completed';
                    else if (recentTask.active) actionText = 'is working on';
                    else if (recentTask.newTask) actionText = 'was assigned';
                    else if (recentTask.failed) actionText = 'failed';

                    return (
                      <div key={idx} className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                            {employee.firstName.charAt(0)}
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-neutral-900 dark:text-white">{employee.firstName} {actionText} a task</p>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">Task: "{recentTask.taskTitle}"</p>
                          <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-1">Due: {recentTask.taskDate}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex items-center justify-center h-32">
                  <p className="text-neutral-500 dark:text-neutral-400">No recent activity</p>
                </div>
              )}
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
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
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Tasks</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Completion Rate</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700">
                  {filteredEmployees.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-sm text-neutral-500 dark:text-neutral-400">
                        {searchTerm ? 'No employees found matching your search.' : 'No employees found. Add your first employee!'}
                      </td>
                    </tr>
                  ) : (
                    filteredEmployees.map((employee, index) => {
                      // Calculate completion rate
                      const totalTasks = employee.taskCounts?.active + employee.taskCounts?.completed + employee.taskCounts?.failed + employee.taskCounts?.newTask || 0;
                      const completionRate = totalTasks > 0 ? Math.round((employee.taskCounts?.completed / totalTasks) * 100) : 0;

                      return (
                        <tr key={`${employee.id}-${refreshKey}`} className="hover:bg-neutral-50 dark:hover:bg-neutral-750 transition-colors duration-150">
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
                            <div className="flex space-x-2">
                              <span className="px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300">
                                {employee.taskCounts?.newTask || 0} new
                              </span>
                              <span className="px-2 py-1 text-xs rounded-full bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-300">
                                {employee.taskCounts?.active || 0} active
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-16 bg-neutral-200 rounded-full h-2 mr-2 dark:bg-neutral-700">
                                <div className="bg-success-500 h-2 rounded-full" style={{ width: `${completionRate}%` }}></div>
                              </div>
                              <span className="text-sm text-neutral-900 dark:text-white">{completionRate}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <button
                              onClick={() => handleViewEmployee(employee)}
                              className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300 mr-3"
                            >
                              View
                            </button>
                            <button
                              onClick={() => handleDeleteEmployeeClick(employee)}
                              className="text-danger-600 hover:text-danger-900 dark:text-danger-400 dark:hover:text-danger-300"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="space-y-6">
            <CreateTask userData={userData} setUserData={setUserData} />
            <AllTask userData={userData} />
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="card">
              <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Task Analytics</h3>

              {/* Circular Charts */}
              <CircularCharts stats={stats} />

              <div className="mt-8">
                <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">Task Status Breakdown</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="card bg-white dark:bg-neutral-800 p-4 border border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h2 className="text-xs font-medium text-neutral-600 dark:text-neutral-400">New Tasks</h2>
                        <p className="text-lg font-semibold text-neutral-900 dark:text-white">{stats.newTasks}</p>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400">
                          {stats.totalTasks > 0 ? Math.round((stats.newTasks / stats.totalTasks) * 100) : 0}% of total
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 w-full bg-neutral-200 rounded-full h-1.5 dark:bg-neutral-700">
                      <div
                        className="bg-primary-600 h-1.5 rounded-full"
                        style={{ width: `${stats.totalTasks ? (stats.newTasks / stats.totalTasks) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="card bg-white dark:bg-neutral-800 p-4 border border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-warning-100 dark:bg-warning-900/30 text-warning-600 dark:text-warning-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h2 className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Active Tasks</h2>
                        <p className="text-lg font-semibold text-neutral-900 dark:text-white">{stats.activeTasks}</p>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400">
                          {stats.totalTasks > 0 ? Math.round((stats.activeTasks / stats.totalTasks) * 100) : 0}% of total
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 w-full bg-neutral-200 rounded-full h-1.5 dark:bg-neutral-700">
                      <div
                        className="bg-warning-500 h-1.5 rounded-full"
                        style={{ width: `${stats.totalTasks ? (stats.activeTasks / stats.totalTasks) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="card bg-white dark:bg-neutral-800 p-4 border border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-success-100 dark:bg-success-900/30 text-success-600 dark:text-success-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h2 className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Completed Tasks</h2>
                        <p className="text-lg font-semibold text-neutral-900 dark:text-white">{stats.completedTasks}</p>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400">
                          {stats.totalTasks > 0 ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0}% of total
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 w-full bg-neutral-200 rounded-full h-1.5 dark:bg-neutral-700">
                      <div
                        className="bg-success-500 h-1.5 rounded-full"
                        style={{ width: `${stats.totalTasks ? (stats.completedTasks / stats.totalTasks) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="card bg-white dark:bg-neutral-800 p-4 border border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-center">
                      <div className="p-2 rounded-full bg-danger-100 dark:bg-danger-900/30 text-danger-600 dark:text-danger-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h2 className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Failed Tasks</h2>
                        <p className="text-lg font-semibold text-neutral-900 dark:text-white">{stats.failedTasks}</p>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400">
                          {stats.totalTasks > 0 ? Math.round((stats.failedTasks / stats.totalTasks) * 100) : 0}% of total
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 w-full bg-neutral-200 rounded-full h-1.5 dark:bg-neutral-700">
                      <div
                        className="bg-danger-500 h-1.5 rounded-full"
                        style={{ width: `${stats.totalTasks ? (stats.failedTasks / stats.totalTasks) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-4">Employee Performance</h4>
                <EmployeePerformanceChart employees={userData?.employees || []} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;