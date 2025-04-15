import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const TaskList = ({ data }) => {
  const [filter, setFilter] = useState('all');
  const [userData, setUserData] = useContext(AuthContext);
  const [expandedTask, setExpandedTask] = useState(null);
  const [actionInProgress, setActionInProgress] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [confirmAction, setConfirmAction] = useState(null);
  const [recentlyUpdatedTask, setRecentlyUpdatedTask] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // Used to force re-render

  // Clear success message after 3 seconds
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Clear recently updated task indicator after 5 seconds
  useEffect(() => {
    if (recentlyUpdatedTask !== null) {
      const timer = setTimeout(() => {
        setRecentlyUpdatedTask(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [recentlyUpdatedTask]);

  // Force re-render when data changes
  useEffect(() => {
    setRefreshKey(prevKey => prevKey + 1);
  }, [data.tasks, data.taskCounts]);

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

  // Show confirmation dialog for task actions
  const showConfirmation = (action, task) => {
    let message = '';
    let confirmText = '';
    let actionType = '';

    switch(action) {
      case 'accept':
        message = `Are you sure you want to accept the task "${task.taskTitle}"?`;
        confirmText = 'Accept Task';
        actionType = 'accept';
        break;
      case 'decline':
        message = `Are you sure you want to decline the task "${task.taskTitle}"? This action cannot be undone.`;
        confirmText = 'Decline Task';
        actionType = 'decline';
        break;
      case 'complete':
        message = `Mark task "${task.taskTitle}" as completed?`;
        confirmText = 'Complete Task';
        actionType = 'complete';
        break;
      case 'fail':
        message = `Mark task "${task.taskTitle}" as failed?`;
        confirmText = 'Mark as Failed';
        actionType = 'fail';
        break;
      default:
        return;
    }

    setConfirmAction({
      message,
      confirmText,
      actionType,
      task
    });
  };

  // Handle task actions
  const handleAcceptTask = (task, index) => {
    setActionInProgress(true);

    // Create a copy of the user's tasks
    const updatedTasks = [...data.tasks];

    // Update the task status
    updatedTasks[index] = {
      ...task,
      newTask: false,
      active: true
    };

    // Update the user's task counts
    const updatedTaskCounts = {
      ...data.taskCounts,
      newTask: data.taskCounts.newTask - 1,
      active: data.taskCounts.active + 1
    };

    // Update the user data in the context
    updateUserData(updatedTasks, updatedTaskCounts);

    // Show success message and highlight the updated task
    setSuccessMessage(`Task "${task.taskTitle}" accepted successfully!`);
    setRecentlyUpdatedTask({
      title: task.taskTitle,
      action: 'accept',
      index: index
    });
    setActionInProgress(false);
    setConfirmAction(null);
  };

  const handleDeclineTask = (task, index) => {
    setActionInProgress(true);

    // Create a copy of the user's tasks without the declined task
    const updatedTasks = data.tasks.filter((_, i) => i !== index);

    // Update the user's task counts
    const updatedTaskCounts = {
      ...data.taskCounts,
      newTask: data.taskCounts.newTask - 1
    };

    // Update the user data in the context
    updateUserData(updatedTasks, updatedTaskCounts);

    // Show success message
    setSuccessMessage(`Task "${task.taskTitle}" declined.`);
    setRecentlyUpdatedTask({
      title: task.taskTitle,
      action: 'decline',
      index: -1 // Removed task
    });
    setActionInProgress(false);
    setConfirmAction(null);
  };

  const handleCompleteTask = (task, index) => {
    setActionInProgress(true);

    // Create a copy of the user's tasks
    const updatedTasks = [...data.tasks];

    // Update the task status
    updatedTasks[index] = {
      ...task,
      active: false,
      completed: true
    };

    // Update the user's task counts
    const updatedTaskCounts = {
      ...data.taskCounts,
      active: data.taskCounts.active - 1,
      completed: data.taskCounts.completed + 1
    };

    // Update the user data in the context
    updateUserData(updatedTasks, updatedTaskCounts);

    // Show success message
    setSuccessMessage(`Task "${task.taskTitle}" marked as completed!`);
    setRecentlyUpdatedTask({
      title: task.taskTitle,
      action: 'complete',
      index: index
    });
    setActionInProgress(false);
    setConfirmAction(null);
  };

  const handleFailTask = (task, index) => {
    setActionInProgress(true);

    // Create a copy of the user's tasks
    const updatedTasks = [...data.tasks];

    // Update the task status
    updatedTasks[index] = {
      ...task,
      active: false,
      failed: true
    };

    // Update the user's task counts
    const updatedTaskCounts = {
      ...data.taskCounts,
      active: data.taskCounts.active - 1,
      failed: data.taskCounts.failed + 1
    };

    // Update the user data in the context
    updateUserData(updatedTasks, updatedTaskCounts);

    // Show success message
    setSuccessMessage(`Task "${task.taskTitle}" marked as failed.`);
    setRecentlyUpdatedTask({
      title: task.taskTitle,
      action: 'fail',
      index: index
    });
    setActionInProgress(false);
    setConfirmAction(null);
  };

  // Execute the confirmed action
  const executeAction = () => {
    if (!confirmAction) return;

    const taskIndex = data.tasks.findIndex(t =>
      t.taskTitle === confirmAction.task.taskTitle &&
      t.taskDescription === confirmAction.task.taskDescription
    );

    if (taskIndex === -1) {
      setConfirmAction(null);
      return;
    }

    switch(confirmAction.actionType) {
      case 'accept':
        handleAcceptTask(confirmAction.task, taskIndex);
        break;
      case 'decline':
        handleDeclineTask(confirmAction.task, taskIndex);
        break;
      case 'complete':
        handleCompleteTask(confirmAction.task, taskIndex);
        break;
      case 'fail':
        handleFailTask(confirmAction.task, taskIndex);
        break;
      default:
        setConfirmAction(null);
    }
  };

  // Helper function to update user data in the context
  const updateUserData = (updatedTasks, updatedTaskCounts) => {
    // Create a local copy of the updated user data
    const updatedUserData = {
      ...data,
      tasks: updatedTasks,
      taskCounts: updatedTaskCounts
    };

    // Find the current user in the employees array
    const updatedEmployees = userData.employees.map(employee => {
      if (employee.email === data.email) {
        return updatedUserData;
      }
      return employee;
    });

    // Update the context with the new data
    setUserData({ ...userData, employees: updatedEmployees });

    // Update localStorage to persist changes
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser && loggedInUser.role === 'employee') {
      localStorage.setItem('loggedInUser', JSON.stringify({
        ...loggedInUser,
        data: updatedUserData
      }));
    }

    // Force a re-render of the component
    setRefreshKey(prevKey => prevKey + 1);
  };

  // Toggle task details expansion
  const toggleTaskExpansion = (index) => {
    setExpandedTask(expandedTask === index ? null : index);
  };

  // Get action buttons based on task status
  const getActionButtons = (task, index) => {
    if (task.newTask) {
      return (
        <div className="flex space-x-2">
          <button
            onClick={() => showConfirmation('accept', task)}
            className="btn-primary py-1 px-3 text-xs"
            disabled={actionInProgress}
          >
            Accept
          </button>
          <button
            onClick={() => showConfirmation('decline', task)}
            className="btn-outline py-1 px-3 text-xs"
            disabled={actionInProgress}
          >
            Decline
          </button>
        </div>
      );
    }
    if (task.active && !task.newTask) {
      return (
        <div className="flex space-x-2">
          <button
            onClick={() => showConfirmation('complete', task)}
            className="btn-success py-1 px-3 text-xs"
            disabled={actionInProgress}
          >
            Complete
          </button>
          <button
            onClick={() => showConfirmation('fail', task)}
            className="btn-danger py-1 px-3 text-xs"
            disabled={actionInProgress}
          >
            Mark Failed
          </button>
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

      {/* Confirmation dialog */}
      {confirmAction && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl max-w-md w-full p-6 animate-fadeIn">
            <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Confirm Action</h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">{confirmAction.message}</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setConfirmAction(null)}
                className="btn-outline py-2 px-4"
                disabled={actionInProgress}
              >
                Cancel
              </button>
              <button
                onClick={executeAction}
                className={`py-2 px-4 rounded-lg font-medium transition-all duration-200 ${confirmAction.actionType === 'decline' || confirmAction.actionType === 'fail' ? 'bg-danger-600 hover:bg-danger-700 text-white' : 'bg-primary-600 hover:bg-primary-700 text-white'}`}
                disabled={actionInProgress}
              >
                {actionInProgress ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : confirmAction.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}

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
            <div
              key={`${idx}-${refreshKey}`}
              className={`card card-hover border transition-all duration-300 ${recentlyUpdatedTask && recentlyUpdatedTask.title === task.taskTitle ?
                (recentlyUpdatedTask.action === 'accept' ? 'border-primary-400 dark:border-primary-600 shadow-md' :
                 recentlyUpdatedTask.action === 'complete' ? 'border-success-400 dark:border-success-600 shadow-md' :
                 recentlyUpdatedTask.action === 'fail' ? 'border-danger-400 dark:border-danger-600 shadow-md' :
                 'border-neutral-200 dark:border-neutral-700') :
                'border-neutral-200 dark:border-neutral-700'}`}
            >
              <div
                className={`flex flex-col md:flex-row md:items-center md:justify-between cursor-pointer ${actionInProgress && confirmAction && confirmAction.task.taskTitle === task.taskTitle ? 'opacity-70' : ''}`}
                onClick={() => toggleTaskExpansion(idx)}
              >
                <div className="space-y-2 mb-4 md:mb-0">
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(task)}
                    {getCategoryBadge(task.category)}
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">{task.taskDate}</span>
                  </div>
                  <h3 className="text-lg font-medium text-neutral-900 dark:text-white">{task.taskTitle}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2">{task.taskDescription}</p>
                </div>
                <div className="flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                  {getActionButtons(task, idx)}
                </div>
              </div>

              {/* Expanded task details */}
              {expandedTask === idx && (
                <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Description</h4>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">{task.taskDescription}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">Details</h4>
                      <ul className="text-sm text-neutral-600 dark:text-neutral-400 space-y-1">
                        <li><span className="font-medium">Due Date:</span> {task.taskDate}</li>
                        <li><span className="font-medium">Category:</span> {task.category}</li>
                        <li><span className="font-medium">Status:</span> {task.newTask ? 'New' : task.active ? 'In Progress' : task.completed ? 'Completed' : 'Failed'}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
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

export default TaskList;