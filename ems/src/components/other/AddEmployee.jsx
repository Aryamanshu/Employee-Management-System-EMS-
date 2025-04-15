import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const AddEmployee = ({ onClose, onEmployeeAdded }) => {
  const [userData, setUserData] = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    // Check if email already exists
    if (userData && userData.employees) {
      const emailExists = userData.employees.some(emp => emp.email === email);
      if (emailExists) {
        setError('An employee with this email already exists');
        setIsLoading(false);
        return;
      }
    }

    // Create new employee object
    const newEmployee = {
      id: userData.employees.length + 1,
      firstName,
      email,
      password,
      taskCounts: {
        active: 0,
        newTask: 0,
        completed: 0,
        failed: 0
      },
      tasks: []
    };

    // Update context with new employee
    const updatedEmployees = [...userData.employees, newEmployee];
    setUserData({ ...userData, employees: updatedEmployees });

    // Update localStorage
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));

    // Notify parent component
    if (onEmployeeAdded) {
      onEmployeeAdded(newEmployee);
    }

    setIsLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl max-w-md w-full p-6 animate-fadeIn">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Add New Employee</h2>
          <button 
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-danger-100 text-danger-800 dark:bg-danger-900/30 dark:text-danger-300 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Full Name*
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input"
              placeholder="Enter employee name"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Email Address*
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="Enter email address"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Password*
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="Enter password"
              required
              minLength="3"
            />
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Minimum 3 characters
            </p>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="btn-outline py-2 px-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary py-2 px-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding...
                </div>
              ) : 'Add Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
