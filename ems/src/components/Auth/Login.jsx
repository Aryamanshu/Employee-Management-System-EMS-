import React, { useState } from 'react';

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 500));

      handleLogin(email, password);

      // If handleLogin doesn't throw an error but returns false
      setEmail('');
      setPassword('');
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Left side - Illustration/Brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary-600 flex-col items-center justify-center p-12 text-white">
        <div className="max-w-md">
          <h1 className="text-4xl font-bold mb-6">Employee Management System</h1>
          <p className="text-primary-100 mb-8">
            Streamline your workforce management with our comprehensive employee management solution.
          </p>
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-primary-500 p-2 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Task Management</h3>
                <p className="text-primary-200 text-sm">Assign, track, and manage tasks efficiently</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-primary-500 p-2 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Employee Profiles</h3>
                <p className="text-primary-200 text-sm">Comprehensive employee information at a glance</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">Welcome Back</h2>
            <p className="mt-2 text-neutral-600 dark:text-neutral-400">Please sign in to your account</p>
          </div>

          <form onSubmit={submitHandler} className="space-y-6">
            {error && (
              <div className="p-4 mb-4 text-sm text-danger-800 bg-danger-100 rounded-lg dark:bg-danger-900/30 dark:text-danger-300">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Password
                </label>
                <a href="#" className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400">
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input"
                placeholder="••••••••"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full flex justify-center items-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="text-sm text-center text-neutral-600 dark:text-neutral-400">
              <p>Demo Credentials:</p>
              <p className="mt-1">Admin: admin@me.com / 123</p>
              <p>Employee: e@e.com / 123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;