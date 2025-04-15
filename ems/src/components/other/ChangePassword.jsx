import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const ChangePassword = ({ employee, onClose }) => {
  const [userData, setUserData] = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess(false);

    // Validate current password
    if (formData.currentPassword !== employee.password) {
      setError('Current password is incorrect');
      setIsLoading(false);
      return;
    }

    // Validate new password
    if (formData.newPassword.length < 3) {
      setError('New password must be at least 3 characters long');
      setIsLoading(false);
      return;
    }

    // Validate password confirmation
    if (formData.newPassword !== formData.confirmPassword) {
      setError('New password and confirmation do not match');
      setIsLoading(false);
      return;
    }

    // Update employee data
    const updatedEmployee = {
      ...employee,
      password: formData.newPassword
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
    setSuccess(true);
    
    // Reset form
    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    
    // Close after 2 seconds on success
    if (success) {
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl max-w-md w-full p-6 animate-fadeIn">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">Change Password</h2>
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

        {success && (
          <div className="mb-4 p-3 bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300 rounded-lg">
            Password changed successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Current Password*
            </label>
            <input
              id="currentPassword"
              name="currentPassword"
              type="password"
              value={formData.currentPassword}
              onChange={handleChange}
              className="input"
              placeholder="Enter your current password"
              required
              disabled={isLoading || success}
            />
          </div>

          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              New Password*
            </label>
            <input
              id="newPassword"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
              className="input"
              placeholder="Enter your new password"
              required
              minLength="3"
              disabled={isLoading || success}
            />
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Minimum 3 characters
            </p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
              Confirm New Password*
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input"
              placeholder="Confirm your new password"
              required
              disabled={isLoading || success}
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
              disabled={isLoading || success}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Changing...
                </div>
              ) : 'Change Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
