import React, { useState } from 'react';

const TaskList = ({ data }) => {
  const [filter, setFilter] = useState('all');

  if (!data || !data.tasks) {
    return <div className="flex justify-center items-center p-8">Loading tasks...</div>;
  }

  // Filter tasks based on selected filter
  const filteredTasks = data.tasks.filter(task => {
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

  // Get action buttons based on task status
  const getActionButtons = (task) => {
    if (task.newTask) {
      return (
        <div className="flex space-x-2">
          <button className="btn-primary py-1 px-3 text-xs">Accept</button>
          <button className="btn-outline py-1 px-3 text-xs">Decline</button>
        </div>
      );
    }
    if (task.active && !task.newTask) {
      return (
        <div className="flex space-x-2">
          <button className="btn-success py-1 px-3 text-xs">Complete</button>
          <button className="btn-danger py-1 px-3 text-xs">Mark Failed</button>
        </div>
      );
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

  return (
    <div className="space-y-6">
      {/* Filter tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2 hide-scrollbar">
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

      {/* Task cards */}
      {filteredTasks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-neutral-500 dark:text-neutral-400">No tasks found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTasks.map((task, idx) => (
            <div key={idx} className="card card-hover border border-neutral-200 dark:border-neutral-700">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="space-y-2 mb-4 md:mb-0">
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(task)}
                    {getCategoryBadge(task.category)}
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">{task.taskDate}</span>
                  </div>
                  <h3 className="text-lg font-medium text-neutral-900 dark:text-white">{task.taskTitle}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{task.taskDescription}</p>
                </div>
                <div className="flex-shrink-0">
                  {getActionButtons(task)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;