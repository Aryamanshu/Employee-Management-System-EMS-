import React, { useState } from 'react';

const HelpSupport = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // FAQ data
  const faqData = [
    {
      id: 1,
      question: 'How do I accept a new task?',
      answer: 'When you receive a new task, it will appear in your "My Tasks" section. Click on the task to view details, then click the "Accept" button to accept the task. Once accepted, the task will move to your active tasks and you can start working on it.'
    },
    {
      id: 2,
      question: 'How do I mark a task as completed?',
      answer: 'To mark a task as completed, go to your "My Tasks" section, find the active task you want to complete, and click the "Complete" button. This will update the task status and move it to your completed tasks list.'
    },
    {
      id: 3,
      question: 'What happens if I decline a task?',
      answer: 'If you decline a task, it will be removed from your task list. Your manager will be notified that you have declined the task, and they may reassign it to another employee or discuss it with you.'
    },
    {
      id: 4,
      question: 'How can I view my task history?',
      answer: 'You can view your task history by going to the "My Tasks" section and using the filter options to view completed or failed tasks. This allows you to track your performance and review past work.'
    },
    {
      id: 5,
      question: 'How do I update my profile information?',
      answer: 'To update your profile information, go to the "Profile" tab in your dashboard. Click on the "Edit Profile" button to update your personal information. To change your password, click on the "Change Password" button.'
    },
    {
      id: 6,
      question: 'What do the different task statuses mean?',
      answer: 'Tasks can have the following statuses: "New" (assigned but not yet accepted), "Active" (accepted and in progress), "Completed" (finished successfully), and "Failed" (not completed successfully or marked as failed).'
    },
    {
      id: 7,
      question: 'How are task completion rates calculated?',
      answer: 'Task completion rates are calculated as the percentage of completed tasks out of the total number of tasks assigned to you. This includes new, active, completed, and failed tasks. The formula is: (Completed Tasks ÷ Total Tasks) × 100.'
    }
  ];

  // User guide sections
  const userGuideData = [
    {
      title: 'Getting Started',
      content: `
        <h4>Welcome to the Employee Management System</h4>
        <p>This guide will help you get started with using the EMS platform effectively.</p>
        
        <h5>Logging In</h5>
        <p>To access the system, use your provided email address and password. If you've forgotten your password, contact your administrator.</p>
        
        <h5>Dashboard Overview</h5>
        <p>After logging in, you'll see your personalized dashboard with task statistics, recent activities, and quick access to all features.</p>
      `
    },
    {
      title: 'Managing Tasks',
      content: `
        <h4>Working with Tasks</h4>
        <p>The task management system allows you to track and update your assigned work.</p>
        
        <h5>Accepting Tasks</h5>
        <p>When you receive a new task, review the details and click "Accept" to start working on it or "Decline" if you're unable to take it on.</p>
        
        <h5>Updating Task Status</h5>
        <p>As you work on tasks, update their status to reflect your progress. Mark tasks as "Completed" when finished or "Failed" if you encounter issues that prevent completion.</p>
        
        <h5>Task Filters</h5>
        <p>Use the filter options to view specific types of tasks: All, New, Active, Completed, or Failed.</p>
      `
    },
    {
      title: 'Profile Management',
      content: `
        <h4>Managing Your Profile</h4>
        <p>Keep your profile information up-to-date for better communication and system functionality.</p>
        
        <h5>Updating Personal Information</h5>
        <p>Click on "Edit Profile" to update your name, email, and other personal details.</p>
        
        <h5>Changing Password</h5>
        <p>Regularly update your password for security. Click "Change Password" and follow the prompts to set a new password.</p>
      `
    },
    {
      title: 'For Administrators',
      content: `
        <h4>Administrator Functions</h4>
        <p>As an administrator, you have additional capabilities to manage the system.</p>
        
        <h5>Adding Employees</h5>
        <p>Add new employees by clicking the "Add Employee" button and filling in their details.</p>
        
        <h5>Creating Tasks</h5>
        <p>Create and assign tasks to employees from the "Tasks" tab in the admin dashboard.</p>
        
        <h5>Analytics</h5>
        <p>View system-wide analytics and performance metrics in the "Analytics" tab to track productivity and task completion rates.</p>
      `
    }
  ];

  // Handle FAQ toggle
  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  // Handle contact form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle contact form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        setContactForm({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }, 3000);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Help & Support</h1>
        <p className="mt-1 text-neutral-600 dark:text-neutral-400">Get assistance and learn how to use the system</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-neutral-200 dark:border-neutral-700">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('faq')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'faq' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300'}`}
          >
            FAQ
          </button>
          <button
            onClick={() => setActiveTab('userGuide')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'userGuide' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300'}`}
          >
            User Guide
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'contact' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-300'}`}
          >
            Contact Support
          </button>
        </nav>
      </div>

      {/* Tab content */}
      <div className="mt-6">
        {/* FAQ Tab */}
        {activeTab === 'faq' && (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                {faqData.map((faq) => (
                  <div 
                    key={faq.id} 
                    className="border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full flex justify-between items-center p-4 text-left focus:outline-none"
                    >
                      <span className="font-medium text-neutral-900 dark:text-white">{faq.question}</span>
                      <svg 
                        className={`w-5 h-5 text-neutral-500 transition-transform duration-200 ${expandedFaq === faq.id ? 'transform rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>
                    
                    {expandedFaq === faq.id && (
                      <div className="p-4 bg-neutral-50 dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700">
                        <p className="text-neutral-600 dark:text-neutral-400">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* User Guide Tab */}
        {activeTab === 'userGuide' && (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6">User Guide</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Sidebar navigation */}
                <div className="md:col-span-1 space-y-2">
                  {userGuideData.map((section, index) => (
                    <button
                      key={index}
                      onClick={() => document.getElementById(`section-${index}`).scrollIntoView({ behavior: 'smooth' })}
                      className="w-full text-left px-4 py-2 rounded-lg text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                    >
                      {section.title}
                    </button>
                  ))}
                </div>
                
                {/* Content area */}
                <div className="md:col-span-3 space-y-8">
                  {userGuideData.map((section, index) => (
                    <div key={index} id={`section-${index}`} className="scroll-mt-6">
                      <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-4 pb-2 border-b border-neutral-200 dark:border-neutral-700">
                        {section.title}
                      </h3>
                      <div 
                        className="prose prose-sm max-w-none dark:prose-invert prose-headings:font-medium prose-h4:text-base prose-h5:text-sm"
                        dangerouslySetInnerHTML={{ __html: section.content }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Support Tab */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-6">Contact Support</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Contact form */}
                <div className="lg:col-span-2">
                  {submitSuccess ? (
                    <div className="bg-success-100 text-success-800 dark:bg-success-900/30 dark:text-success-300 p-4 rounded-lg mb-6">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>Your message has been sent successfully! Our support team will get back to you soon.</span>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                            Your Name*
                          </label>
                          <input
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={contactForm.name}
                            onChange={handleInputChange}
                            className="input"
                            placeholder="Enter your name"
                            disabled={isSubmitting}
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
                            required
                            value={contactForm.email}
                            onChange={handleInputChange}
                            className="input"
                            placeholder="Enter your email"
                            disabled={isSubmitting}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                          Subject*
                        </label>
                        <input
                          id="subject"
                          name="subject"
                          type="text"
                          required
                          value={contactForm.subject}
                          onChange={handleInputChange}
                          className="input"
                          placeholder="Enter subject"
                          disabled={isSubmitting}
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
                          Message*
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows="6"
                          required
                          value={contactForm.message}
                          onChange={handleInputChange}
                          className="input"
                          placeholder="Describe your issue or question"
                          disabled={isSubmitting}
                        ></textarea>
                      </div>
                      
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="btn-primary"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <div className="flex items-center">
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Sending...
                            </div>
                          ) : 'Send Message'}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
                
                {/* Contact information */}
                <div className="lg:col-span-1">
                  <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-6">
                    <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Contact Information</h3>
                    
                    <div className="space-y-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-neutral-900 dark:text-white">Email</p>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">aryamanshumishra@gmail.com</p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-neutral-900 dark:text-white">Phone</p>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">+91 9260955703</p>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-neutral-900 dark:text-white">Support Hours</p>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">Monday - Friday: 9AM - 5PM</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700">
                      <h4 className="text-sm font-medium text-neutral-900 dark:text-white mb-3">Quick Links</h4>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <a href="#" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                            Knowledge Base
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                            Video Tutorials
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                            System Status
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpSupport;
