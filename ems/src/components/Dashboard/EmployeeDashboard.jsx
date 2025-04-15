import React from 'react';
import Header from '../other/Header';
import TaskListNumbers from '../other/TaskListNumbers';
import TaskList from '../TaskList/TaskList';

const EmployeeDashboard = (props) => {
  return (
    <div className='p-10 bg-[#1C1C1C] h-screen'>
        {/* Pass firstName explicitly to Header */}
        <Header changeUser={props.changeUser} firstName={props.data?.firstName || 'Employee'} />
        <TaskListNumbers data={props.data} />
        <TaskList data={props.data} />
    </div>
  );
};

export default EmployeeDashboard;