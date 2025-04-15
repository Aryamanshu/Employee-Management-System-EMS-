import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const CircularCharts = ({ stats }) => {
  // Task Status Distribution Data
  const taskStatusData = {
    labels: ['New Tasks', 'Active Tasks', 'Completed Tasks', 'Failed Tasks'],
    datasets: [
      {
        data: [stats.newTasks, stats.activeTasks, stats.completedTasks, stats.failedTasks],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)', // primary - blue
          'rgba(245, 158, 11, 0.7)', // warning - amber
          'rgba(16, 185, 129, 0.7)', // success - green
          'rgba(239, 68, 68, 0.7)',  // danger - red
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Task Completion Rate Data
  const completionRateData = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        data: [stats.completedTasks, stats.pendingTasks],
        backgroundColor: [
          'rgba(16, 185, 129, 0.7)', // success - green
          'rgba(209, 213, 219, 0.7)', // neutral - gray
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(209, 213, 219, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12
          }
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = total > 0 ? Math.round((value / total) * 100) : 0;
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    },
    cutout: '70%', // For doughnut chart
  };

  // Pie chart options (without cutout)
  const pieOptions = {
    ...options,
    cutout: undefined,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="card bg-white dark:bg-neutral-800 p-4">
        <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Task Status Distribution</h3>
        <div className="h-64 relative">
          <Doughnut data={taskStatusData} options={options} />
          {stats.totalTasks > 0 ? (
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-3xl font-bold text-neutral-900 dark:text-white">{stats.totalTasks}</span>
              <span className="text-sm text-neutral-500 dark:text-neutral-400">Total Tasks</span>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-neutral-500 dark:text-neutral-400">No tasks yet</span>
            </div>
          )}
        </div>
      </div>

      <div className="card bg-white dark:bg-neutral-800 p-4">
        <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Task Completion Rate</h3>
        <div className="h-64">
          <Pie data={completionRateData} options={pieOptions} />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="bg-success-50 dark:bg-success-900/10 p-3 rounded-lg">
            <div className="text-lg font-semibold text-success-600 dark:text-success-400">
              {stats.totalTasks > 0 ? Math.round((stats.completedTasks / stats.totalTasks) * 100) : 0}%
            </div>
            <div className="text-xs text-neutral-600 dark:text-neutral-400">Completion Rate</div>
          </div>
          <div className="bg-primary-50 dark:bg-primary-900/10 p-3 rounded-lg">
            <div className="text-lg font-semibold text-primary-600 dark:text-primary-400">
              {stats.totalTasks}
            </div>
            <div className="text-xs text-neutral-600 dark:text-neutral-400">Total Tasks</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularCharts;
