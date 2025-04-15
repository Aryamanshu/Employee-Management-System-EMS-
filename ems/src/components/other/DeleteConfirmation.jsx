import React from 'react';

const DeleteConfirmation = ({ title, message, onCancel, onConfirm, isLoading }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-xl max-w-md w-full p-6 animate-fadeIn">
        <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">{title}</h3>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="btn-outline py-2 px-4"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-danger-600 hover:bg-danger-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Deleting...
              </div>
            ) : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
