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

  return (
    <div className="card">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Create New Task</h2>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">Assign tasks to your team members</p>
      </div>

      {showSuccess && (
        <div className="mb-6 p-4 bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300 rounded-lg">
          Task successfully created and assigned to {assignTo}!
        </div>
      )}

      <form onSubmit={submitHandler} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              placeholder="Enter task title"
              required
            />
          </div>

          <div>
            <label htmlFor="assignTo" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Assign To*
            </label>
            <select
              id="assignTo"
              value={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
              className="input"
              required
            >
              <option value="">Select employee</option>
              {userData && userData.employees && userData.employees.map((employee, index) => (
                <option key={index} value={employee.firstName}>{employee.firstName}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="taskDate" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Due Date*
            </label>
            <input
              id="taskDate"
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              className="input"
              type="date"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Category*
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input"
              required
            >
              {categories.map((cat, index) => (
                <option key={index} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
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
            placeholder="Enter task description"
            required
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="btn-primary"
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
        </div>
      </form>
    </div>
  );
};

export default CreateTask;