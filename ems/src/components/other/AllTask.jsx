import React, { useState } from 'react';

const AllTask = ({ userData }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Filter employees based on search term
  const filteredEmployees = userData?.employees?.filter(employee =>
    employee.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Calculate total tasks
  const calculateTotalTasks = (employee) => {
    return employee.taskCounts.newTask +
           employee.taskCounts.active +
           employee.taskCounts.completed +
           employee.taskCounts.failed;
  };

  // Calculate completion percentage
  const calculateCompletionPercentage = (employee) => {
    const total = calculateTotalTasks(employee);
    if (total === 0) return 0;
    return Math.round((employee.taskCounts.completed / total) * 100);
  };

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-6">
        <div>
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Employee Task Overview</h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Monitor task progress across your team</p>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input py-2 pl-10 pr-4"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="-mx-6 -mb-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-neutral-200 dark:divide-neutral-700">
          <thead className="bg-neutral-50 dark:bg-neutral-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Employee</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">New Tasks</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Active Tasks</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Completed</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Failed</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">Progress</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-neutral-800 divide-y divide-neutral-200 dark:divide-neutral-700">
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee, idx) => (
                <tr key={idx}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                        {employee.firstName.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-neutral-900 dark:text-white">{employee.firstName}</div>
                        <div className="text-sm text-neutral-500 dark:text-neutral-400">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-primary-600 dark:text-primary-400 font-medium">{employee.taskCounts.newTask}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-warning-600 dark:text-warning-400 font-medium">{employee.taskCounts.active}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-success-600 dark:text-success-400 font-medium">{employee.taskCounts.completed}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-danger-600 dark:text-danger-400 font-medium">{employee.taskCounts.failed}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-neutral-200 rounded-full h-2.5 dark:bg-neutral-700 max-w-[100px]">
                      <div
                        className="bg-primary-600 h-2.5 rounded-full"
                        style={{ width: `${calculateCompletionPercentage(employee)}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                      {calculateCompletionPercentage(employee)}% complete
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-sm text-neutral-500 dark:text-neutral-400">
                  {searchTerm ? 'No employees found matching your search.' : 'No employees found.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllTask;