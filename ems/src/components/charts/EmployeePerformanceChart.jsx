import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EmployeePerformanceChart = ({ employees }) => {
  // Filter to top 10 employees by completion rate
  const topEmployees = [...employees]
    .map(employee => {
      const totalTasks = employee.taskCounts?.active + employee.taskCounts?.completed + employee.taskCounts?.failed + employee.taskCounts?.newTask || 0;
      const completionRate = totalTasks > 0 ? Math.round((employee.taskCounts?.completed / totalTasks) * 100) : 0;
      return {
        ...employee,
        completionRate,
        totalTasks
      };
    })
    .filter(employee => employee.totalTasks > 0)
    .sort((a, b) => b.completionRate - a.completionRate)
    .slice(0, 10);

  // Prepare data for chart
  const labels = topEmployees.map(employee => employee.firstName);
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Completion Rate (%)',
        data: topEmployees.map(employee => employee.completionRate),
        backgroundColor: 'rgba(59, 130, 246, 0.7)', // primary - blue
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: 'Total Tasks',
        data: topEmployees.map(employee => employee.totalTasks),
        backgroundColor: 'rgba(16, 185, 129, 0.7)', // success - green
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
        borderRadius: 4,
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
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
            const label = context.dataset.label || '';
            const value = context.raw || 0;
            return `${label}: ${value}${context.datasetIndex === 0 ? '%' : ''}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          color: 'rgba(209, 213, 219, 0.2)'
        },
        ticks: {
          font: {
            size: 12
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 12
          }
        }
      }
    }
  };

  return (
    <div className="card bg-white dark:bg-neutral-800 p-4">
      <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-4">Employee Performance</h3>
      {topEmployees.length > 0 ? (
        <div className="h-80">
          <Bar data={data} options={options} />
        </div>
      ) : (
        <div className="h-80 flex items-center justify-center">
          <p className="text-neutral-500 dark:text-neutral-400">No employee performance data available</p>
        </div>
      )}
    </div>
  );
};

export default EmployeePerformanceChart;
