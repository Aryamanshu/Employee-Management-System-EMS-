import React, { useState, useEffect } from 'react';

const CreateTask = ({ userData, setUserData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [step, setStep] = useState(1);
  const [priority, setPriority] = useState('medium');

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [category, setCategory] = useState('Design');

  // Predefined categories
  const categories = [
    'Design',
    'Development',
    'Meeting',
    'Database',
    'Presentation',
    'QA',
    'Documentation',
    'DevOps',
    'Support'
  ];

  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Create a new task object
    const newTask = {
      taskTitle,
      taskDescription,
      taskDate,
      category,
      priority,
      active: false,
      newTask: true,
      failed: false,
      completed: false,
    };

    // Check if userData.employees is an array
    if (userData && Array.isArray(userData.employees)) {
      const updatedData = userData.employees.map((user) => {
        if (user.firstName === assignTo) {
          // Add the new task to the user's tasks
          return {
            ...user,
            tasks: [...user.tasks, newTask],
            taskCounts: {
              ...user.taskCounts,
              newTask: user.taskCounts.newTask + 1,
            },
          };
        }
        return user;
      });

      // Update the userData state
      setUserData({ ...userData, employees: updatedData });

      // Update localStorage
      localStorage.setItem('employees', JSON.stringify(updatedData));

      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }

    // Reset form fields
    setTaskTitle('');
    setTaskDescription('');
    setTaskDate('');
    setAssignTo('');
    setCategory('Design');
    setPriority('medium');
    setStep(1);
    setIsLoading(false);

    // Hide form after successful submission
    setTimeout(() => {
      setShowForm(false);
    }, 3000);
  };

  // Get today's date in YYYY-MM-DD format for the date input min attribute
  const today = new Date().toISOString().split('T')[0];

  // Get category color based on category name
  const getCategoryColor = (cat) => {
    const categoryColors = {
      'Design': 'bg-purple-500 text-white',
      'Development': 'bg-blue-500 text-white',
      'Meeting': 'bg-yellow-500 text-white',
      'Database': 'bg-green-500 text-white',
      'Presentation': 'bg-orange-500 text-white',
      'QA': 'bg-red-500 text-white',
      'Documentation': 'bg-indigo-500 text-white',
      'DevOps': 'bg-teal-500 text-white',
      'Support': 'bg-pink-500 text-white'
    };
    return categoryColors[cat] || 'bg-gray-500 text-white';
  };

  // Get priority badge
  const getPriorityBadge = (pri) => {
    const priorityClasses = {
      'low': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      'medium': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      'high': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
    };
    return priorityClasses[pri] || priorityClasses.medium;
  };

  // Handle next step
  const handleNextStep = () => {
    if (step === 1 && !taskTitle) {
      return; // Don't proceed if title is empty
    }
    if (step === 2 && !assignTo) {
      return; // Don't proceed if assignee is empty
    }
    setStep(step + 1);
  };

  // Handle previous step
  const handlePrevStep = () => {
    setStep(step - 1);
  };

  // Handle form toggle
  const toggleForm = () => {
    if (showForm) {
      // Reset form when closing
      setTaskTitle('');
      setTaskDescription('');
      setTaskDate('');
      setAssignTo('');
      setCategory('Design');
      setPriority('medium');
      setStep(1);
    }
    setShowForm(!showForm);
  };

  return (
    <div className="relative">
      {/* Success notification */}
      {showSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300 px-4 py-3 rounded-lg shadow-lg max-w-md animate-fadeIn">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Task successfully created and assigned to {assignTo}!</span>
          </div>
        </div>
      )}

      {/* Create task button or card */}
      {!showForm ? (
        <div
          onClick={toggleForm}
          className="card bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-900/10 border-2 border-dashed border-primary-300 dark:border-primary-700 hover:border-primary-400 dark:hover:border-primary-600 transition-all duration-300 cursor-pointer group"
        >
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-8 h-8 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">Create New Task</h3>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-md">
              Assign tasks to your team members and track their progress efficiently
            </p>
          </div>
        </div>
      ) : (
        <div className="card overflow-hidden">
          {/* Header with progress indicator */}
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Create New Task</h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">Step {step} of 3</p>
            </div>
            <button
              type="button"
              onClick={toggleForm}
              className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full mb-6 overflow-hidden">
            <div
              className="h-full bg-primary-500 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>

          <form onSubmit={submitHandler}>
            {/* Step 1: Basic Task Information */}
            {step === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <label htmlFor="taskTitle" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Task Title*
                  </label>
                  <input
                    id="taskTitle"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    className="input"
                    type="text"
                    placeholder="Enter a descriptive title for the task"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="taskDescription" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Description*
                  </label>
                  <textarea
                    id="taskDescription"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                    className="input min-h-[120px]"
                    placeholder="Provide detailed information about what needs to be done"
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                    Priority Level*
                  </label>
                  <div className="flex space-x-4">
                    {['low', 'medium', 'high'].map((pri) => (
                      <div key={pri} className="flex-1">
                        <input
                          type="radio"
                          id={`priority-${pri}`}
                          name="priority"
                          value={pri}
                          checked={priority === pri}
                          onChange={() => setPriority(pri)}
                          className="sr-only"
                        />
                        <label
                          htmlFor={`priority-${pri}`}
                          className={`block w-full py-3 px-4 text-center rounded-lg cursor-pointer transition-all duration-200 ${priority === pri ?
                            `ring-2 ring-offset-2 dark:ring-offset-neutral-800 ${getPriorityBadge(pri)}` :
                            'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'}`}
                        >
                          <span className="capitalize">{pri}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Assignment and Scheduling */}
            {step === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <label htmlFor="assignTo" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Assign To*
                  </label>
                  <div className="relative">
                    <select
                      id="assignTo"
                      value={assignTo}
                      onChange={(e) => setAssignTo(e.target.value)}
                      className="input pl-10"
                      required
                    >
                      <option value="">Select employee</option>
                      {userData && userData.employees && userData.employees.map((employee, index) => (
                        <option key={index} value={employee.firstName}>{employee.firstName}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="taskDate" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Due Date*
                  </label>
                  <div className="relative">
                    <input
                      id="taskDate"
                      value={taskDate}
                      onChange={(e) => setTaskDate(e.target.value)}
                      className="input pl-10"
                      type="date"
                      min={today}
                      required
                    />
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Employee Task Load
                  </label>
                  {assignTo ? (
                    <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4">
                      {userData && userData.employees && userData.employees
                        .filter(emp => emp.firstName === assignTo)
                        .map((employee, index) => {
                          const activeTasks = employee.taskCounts?.active || 0;
                          const newTasks = employee.taskCounts?.newTask || 0;
                          const totalActive = activeTasks + newTasks;

                          return (
                            <div key={index}>
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-sm text-neutral-700 dark:text-neutral-300">Current Active Tasks</span>
                                <span className={`px-2 py-1 text-xs rounded-full ${totalActive > 5 ? 'bg-warning-100 text-warning-800 dark:bg-warning-900/30 dark:text-warning-300' : 'bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300'}`}>
                                  {totalActive} tasks
                                </span>
                              </div>
                              <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${totalActive > 5 ? 'bg-warning-500' : 'bg-success-500'}`}
                                  style={{ width: `${Math.min(totalActive * 10, 100)}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
                                {totalActive > 5 ?
                                  'This employee has a high workload. Consider assigning to someone else.' :
                                  'This employee has capacity for more tasks.'}
                              </p>
                            </div>
                          );
                        })
                      }
                    </div>
                  ) : (
                    <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4 text-center text-neutral-500 dark:text-neutral-400">
                      Select an employee to see their current workload
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Categorization and Review */}
            {step === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                    Task Category*
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {categories.map((cat, index) => (
                      <div key={index}>
                        <input
                          type="radio"
                          id={`category-${cat}`}
                          name="category"
                          value={cat}
                          checked={category === cat}
                          onChange={() => setCategory(cat)}
                          className="sr-only"
                        />
                        <label
                          htmlFor={`category-${cat}`}
                          className={`block w-full py-2 px-3 text-center rounded-lg cursor-pointer transition-all duration-200 ${category === cat ?
                            `ring-2 ring-offset-2 dark:ring-offset-neutral-800 ${getCategoryColor(cat)}` :
                            'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700'}`}
                        >
                          {cat}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Task Summary</h3>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-neutral-500 dark:text-neutral-400">Title</span>
                      <span className="text-sm font-medium text-neutral-900 dark:text-white">{taskTitle}</span>
                    </div>

                    <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4">
                      <span className="text-sm text-neutral-500 dark:text-neutral-400">Assigned To</span>
                      <div className="mt-1 flex items-center">
                        <div className="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-xs text-primary-600 dark:text-primary-400 font-medium">
                          {assignTo ? assignTo.charAt(0) : '?'}
                        </div>
                        <span className="ml-2 text-sm font-medium text-neutral-900 dark:text-white">{assignTo || 'Not assigned'}</span>
                      </div>
                    </div>

                    <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4 flex justify-between">
                      <span className="text-sm text-neutral-500 dark:text-neutral-400">Due Date</span>
                      <span className="text-sm font-medium text-neutral-900 dark:text-white">{taskDate || 'Not set'}</span>
                    </div>

                    <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4 flex justify-between">
                      <span className="text-sm text-neutral-500 dark:text-neutral-400">Priority</span>
                      <span className={`px-2 py-1 text-xs rounded-full capitalize ${getPriorityBadge(priority)}`}>{priority}</span>
                    </div>

                    <div className="border-t border-neutral-200 dark:border-neutral-700 pt-4 flex justify-between">
                      <span className="text-sm text-neutral-500 dark:text-neutral-400">Category</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(category)}`}>{category}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="btn-outline py-2 px-4"
                >
                  <svg className="w-5 h-5 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                  Back
                </button>
              ) : (
                <button
                  type="button"
                  onClick={toggleForm}
                  className="btn-outline py-2 px-4"
                >
                  Cancel
                </button>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="btn-primary py-2 px-4"
                  disabled={step === 1 && !taskTitle || step === 2 && !assignTo}
                >
                  Next
                  <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn-primary py-2 px-4"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating...
                    </>
                  ) : (
                    'Create Task'
                  )}
                </button>
              )}
            </div>
          </form>
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

export default CreateTask;