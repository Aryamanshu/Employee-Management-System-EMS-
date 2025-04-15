import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const EditProfile = ({ employee, onClose, onUpdate }) => {
  const [userData, setUserData] = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: employee.firstName || '',
    email: employee.email || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    // Check if email already exists (except for the current user)
    if (userData && userData.employees) {
      const emailExists = userData.employees.some(emp => 
        emp.email === formData.email && emp.id !== employee.id
      );
      
      if (emailExists) {
        setError('This email is already in use by another employee');
        setIsLoading(false);
        return;
      }
    }

    // Update employee data
    const updatedEmployee = {
      ...employee,
      firstName: formData.firstName,
      email: formData.email
    };

    // Update employees array
    const updatedEmployees = userData.employees.map(emp => 
      emp.id === employee.id ? updatedEmployee : emp
    );

    // Update context
    setUserData({ ...userData, employees: updatedEmployees });

    // Update localStorage
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));

    // Update logged in user if this is the current user
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser && loggedInUser.data && loggedInUser.data.id === employee.id) {
      localStorage.setItem('loggedInUser', JSON.stringify({
        ...loggedInUser,
        data: updatedEmployee
      }));
    }

    setIsLoading(false);
    
    // Notify parent component
    if (onUpdate) {
      onUpdate(updatedEmployee);
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl max-w-md w-full p-6 animate-fadeIn">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Edit Profile</h2>
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
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              className="input"
              placeholder="Enter your full name"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Email Address*
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="input"
              placeholder="Enter your email address"
              required
              disabled={isLoading}
            />
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="btn-outline py-2 px-4"
              disabled={isLoading}
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
                  Saving...
                </div>
              ) : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
