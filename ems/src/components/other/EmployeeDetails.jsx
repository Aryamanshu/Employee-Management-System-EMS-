import React, { useState } from 'react';

const EmployeeDetails = ({ employee, onClose, onDeleteTask }) => {
  const [activeTab, setActiveTab] = useState('tasks');
  const [filter, setFilter] = useState('all');

  // Filter tasks based on selected filter
  const filteredTasks = employee.tasks.filter(task => {
    if (filter === 'all') return true;
    if (filter === 'new') return task.newTask;
    if (filter === 'active') return task.active && !task.newTask;
    if (filter === 'completed') return task.completed;
    if (filter === 'failed') return task.failed;
    return true;
  });

  // Get status badge for task
  const getStatusBadge = (task) => {
    if (task.newTask) {
      return <span className="px-2 py-1 text-xs rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300">New</span>;
    }
    if (task.active && !task.newTask) {
      return <span className="px-2 py-1 text-xs rounded-full bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-300">In Progress</span>;
    }
    if (task.completed) {
      return <span className="px-2 py-1 text-xs rounded-full bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300">Completed</span>;
    }
    if (task.failed) {
      return <span className="px-2 py-1 text-xs rounded-full bg-danger-100 text-danger-800 dark:bg-danger-900/30 dark:text-danger-300">Failed</span>;
    }
    return null;
  };

  // Get category badge
  const getCategoryBadge = (category) => {
    const categoryColors = {
      'Design': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      'Development': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      'Meeting': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      'Database': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      'Presentation': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      'QA': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      'Documentation': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300',
      'DevOps': 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300',
      'Support': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300'
    };

    const colorClass = categoryColors[category] || 'bg-neutral-100 text-neutral-800 dark:bg-neutral-900/30 dark:text-neutral-300';

    return <span className={`px-2 py-1 text-xs rounded-full ${colorClass}`}>{category}</span>;
  };

  // Calculate completion rate
  const totalTasks = employee.taskCounts.active + employee.taskCounts.completed + employee.taskCounts.failed + employee.taskCounts.newTask;
  const completionRate = totalTasks > 0 ? Math.round((employee.taskCounts.completed / totalTasks) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden animate-fadeIn">
        <div className="flex justify-between items-center p-6 border-b border-neutral-200 dark:border-neutral-700">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Employee Details</h2>
          <button 
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="flex flex-col md:flex-row md:items-center space-y-6 md:space-y-0 md:space-x-6 mb-6">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-4xl text-primary-600 dark:text-primary-400">
                {employee.firstName.charAt(0)}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-neutral-900 dark:text-white">{employee.firstName}</h3>
              <p className="text-neutral-600 dark:text-neutral-400">{employee.email}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <div className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded-full text-sm">
                  ID: {employee.id}
                </div>
                <div className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-300 rounded-full text-sm">
                  Tasks: {totalTasks}
                </div>
                <div className="px-3 py-1 bg-success-100 dark:bg-success-900/30 text-success-800 dark:text-success-300 rounded-full text-sm">
                  Completion: {completionRate}%
                </div>
              </div>
            </div>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="card bg-white dark:bg-neutral-800 p-4">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                  </svg>
                </div>
                <div className="ml-3">
                  <h2 className="text-xs font-medium text-neutral-600 dark:text-neutral-400">New Tasks</h2>
                  <p className="text-lg font-semibold text-neutral-900 dark:text-white">{employee.taskCounts.newTask}</p>
                </div>
              </div>
            </div>

            <div className="card bg-white dark:bg-neutral-800 p-4">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-warning-100 dark:bg-warning-900/30 text-warning-600 dark:text-warning-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div className="ml-3">
                  <h2 className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Active Tasks</h2>
                  <p className="text-lg font-semibold text-neutral-900 dark:text-white">{employee.taskCounts.active}</p>
                </div>
              </div>
            </div>

            <div className="card bg-white dark:bg-neutral-800 p-4">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-success-100 dark:bg-success-900/30 text-success-600 dark:text-success-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div className="ml-3">
                  <h2 className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Completed</h2>
                  <p className="text-lg font-semibold text-neutral-900 dark:text-white">{employee.taskCounts.completed}</p>
                </div>
              </div>
            </div>

            <div className="card bg-white dark:bg-neutral-800 p-4">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-danger-100 dark:bg-danger-900/30 text-danger-600 dark:text-danger-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div className="ml-3">
                  <h2 className="text-xs font-medium text-neutral-600 dark:text-neutral-400">Failed</h2>
                  <p className="text-lg font-semibold text-neutral-900 dark:text-white">{employee.taskCounts.failed}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-neutral-200 dark:border-neutral-700 mb-6">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('tasks')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'tasks' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300'}`}
              >
                Tasks
              </button>
              <button
                onClick={() => setActiveTab('performance')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'performance' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300'}`}
              >
                Performance
              </button>
            </nav>
          </div>

          {/* Tab content */}
          {activeTab === 'tasks' && (
            <div>
              {/* Task progress */}
              <div className="card mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-neutral-900 dark:text-white">Task Completion</h3>
                  <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">{completionRate}% complete</span>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2.5 dark:bg-neutral-700">
                  <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: `${completionRate}%` }}></div>
                </div>
              </div>

              {/* Filter tabs */}
              <div className="flex space-x-2 overflow-x-auto pb-2 hide-scrollbar mb-4">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full ${filter === 'all' ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300' : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300'}`}
                >
                  All Tasks
                </button>
                <button
                  onClick={() => setFilter('new')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full ${filter === 'new' ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300' : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300'}`}
                >
                  New
                </button>
                <button
                  onClick={() => setFilter('active')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full ${filter === 'active' ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300' : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300'}`}
                >
                  In Progress
                </button>
                <button
                  onClick={() => setFilter('completed')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full ${filter === 'completed' ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300' : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300'}`}
                >
                  Completed
                </button>
                <button
                  onClick={() => setFilter('failed')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full ${filter === 'failed' ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300' : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300'}`}
                >
                  Failed
                </button>
              </div>

              {/* Task list */}
              {filteredTasks.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-neutral-500 dark:text-neutral-400">No tasks found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredTasks.map((task, idx) => (
                    <div key={idx} className="card card-hover border border-neutral-200 dark:border-neutral-700 transition-all duration-200">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="space-y-2 mb-4 md:mb-0">
                          <div className="flex items-center space-x-2">
                            {getStatusBadge(task)}
                            {getCategoryBadge(task.category)}
                            <span className="text-xs text-neutral-500 dark:text-neutral-400">{task.taskDate}</span>
                          </div>
                          <h3 className="text-lg font-medium text-neutral-900 dark:text-white">{task.taskTitle}</h3>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">{task.taskDescription}</p>
                        </div>
                        <div className="flex-shrink-0">
                          <button
                            onClick={() => onDeleteTask && onDeleteTask(employee.id, idx)}
                            className="text-danger-600 hover:text-danger-800 dark:text-danger-400 dark:hover:text-danger-300"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'performance' && (
            <div className="card">
              <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Performance Overview</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Task Completion Rate</h4>
                  <div className="w-full bg-neutral-200 rounded-full h-4 dark:bg-neutral-700">
                    <div 
                      className="bg-primary-600 h-4 rounded-full flex items-center justify-end pr-2 text-xs text-white font-medium"
                      style={{ width: `${completionRate}%` }}
                    >
                      {completionRate}%
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Task Distribution</h4>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="bg-primary-100 dark:bg-primary-900/30 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">{employee.taskCounts.newTask}</div>
                      <div className="text-xs text-neutral-600 dark:text-neutral-400">New</div>
                    </div>
                    <div className="bg-warning-100 dark:bg-warning-900/30 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-warning-600 dark:text-warning-400">{employee.taskCounts.active}</div>
                      <div className="text-xs text-neutral-600 dark:text-neutral-400">Active</div>
                    </div>
                    <div className="bg-success-100 dark:bg-success-900/30 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-success-600 dark:text-success-400">{employee.taskCounts.completed}</div>
                      <div className="text-xs text-neutral-600 dark:text-neutral-400">Completed</div>
                    </div>
                    <div className="bg-danger-100 dark:bg-danger-900/30 p-3 rounded-lg">
                      <div className="text-2xl font-bold text-danger-600 dark:text-danger-400">{employee.taskCounts.failed}</div>
                      <div className="text-xs text-neutral-600 dark:text-neutral-400">Failed</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Recent Activity</h4>
                  <div className="space-y-3">
                    {employee.tasks.slice(0, 3).map((task, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-700 flex items-center justify-center text-neutral-600 dark:text-neutral-400">
                          {idx + 1}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-neutral-900 dark:text-white">{task.taskTitle}</p>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400">
                            {task.newTask ? 'New task' : 
                             task.active ? 'In progress' : 
                             task.completed ? 'Completed' : 'Failed'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
