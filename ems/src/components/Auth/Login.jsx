import React, { useState, useEffect } from 'react';

const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('employee');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);

  // Animation effect when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationComplete(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Fill in demo credentials based on active tab
  const fillDemoCredentials = () => {
    if (activeTab === 'admin') {
      setEmail('admin@me.com');
      setPassword('123');
    } else {
      setEmail('e@e.com');
      setPassword('123');
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 500));

      const loginSuccess = handleLogin(email, password);

      if (loginSuccess === false) {
        setError('Invalid email or password');
      } else {
        // Clear form on success
        setEmail('');
        setPassword('');
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 transition-all duration-300">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary-200 dark:bg-primary-900/20 blur-3xl opacity-30"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-secondary-200 dark:bg-secondary-900/20 blur-3xl opacity-30"></div>
      </div>

      <div className="relative w-full max-w-6xl mx-auto flex flex-col lg:flex-row rounded-3xl overflow-hidden shadow-2xl my-8 bg-white dark:bg-neutral-800 transition-all duration-300 transform opacity-0 translate-y-4 scale-95 animate-fade-in-up">
        {/* Left side - Brand/Illustration */}
        <div className="lg:w-1/2 bg-gradient-to-br from-primary-600 to-primary-700 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-40 h-40 rounded-full border-8 border-white"></div>
            <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full border-8 border-white"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border-8 border-white"></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-12">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h1 className="text-2xl font-bold">EMS</h1>
            </div>

            <h2 className="text-4xl font-bold mb-4 leading-tight">
              Manage Your Team <br />With Efficiency
            </h2>
            <p className="text-primary-100 mb-8 max-w-md">
              Streamline task assignments, track progress, and boost productivity with our modern employee management platform.
            </p>
          </div>

          <div className="relative z-10 space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-white/20 p-2 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Task Management</h3>
                <p className="text-primary-100 text-sm">Create, assign and track tasks in real-time</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-white/20 p-2 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Performance Analytics</h3>
                <p className="text-primary-100 text-sm">Visualize productivity and track progress</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="lg:w-1/2 p-8 md:p-12 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">Welcome Back</h2>
              <p className="text-neutral-600 dark:text-neutral-400">Sign in to your account to continue</p>
            </div>

            {/* User type tabs */}
            <div className="flex rounded-lg bg-neutral-100 dark:bg-neutral-700/30 p-1 mb-8">
              <button
                onClick={() => setActiveTab('employee')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === 'employee' ? 'bg-white dark:bg-neutral-700 shadow-sm text-primary-600 dark:text-primary-400' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'}`}
              >
                Employee
              </button>
              <button
                onClick={() => setActiveTab('admin')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${activeTab === 'admin' ? 'bg-white dark:bg-neutral-700 shadow-sm text-primary-600 dark:text-primary-400' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'}`}
              >
                Admin
              </button>
            </div>

            {error && (
              <div className="p-4 mb-6 text-sm text-danger-800 bg-danger-100 rounded-lg dark:bg-danger-900/30 dark:text-danger-300 flex items-center">
                <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={submitHandler} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-neutral-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="input pl-10 transition-all duration-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder={activeTab === 'admin' ? 'admin@me.com' : 'you@example.com'}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="password" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      Password
                    </label>
                    <a href="#" className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-neutral-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="input pl-10 pr-10 transition-all duration-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="••••••••"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 focus:outline-none"
                      >
                        {showPassword ? (
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-neutral-700 dark:text-neutral-300">
                    Remember me
                  </label>
                </div>

                <button
                  type="button"
                  onClick={fillDemoCredentials}
                  className="text-sm text-primary-600 hover:text-primary-500 dark:text-primary-400 hover:underline"
                >
                  Use demo account
                </button>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full flex justify-center items-center py-2.5 transition-all duration-200 transform hover:translate-y-[-2px] hover:shadow-lg"
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

            <div className="mt-8 text-center">
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Don't have an account? <a href="#" className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 hover:underline">Contact admin</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translate3d(0, 20px, 0) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0) scale(1);
    }
  }

  .animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
  }
`;
document.head.appendChild(style);

export default Login;