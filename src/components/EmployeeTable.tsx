import React from 'react';
import { deleteEmployee } from '../services/api';

type Employee = {
  id: number;
  name: string;
  department: string;
  position: string;
};

type EmployeeTableProps = {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onRefresh: () => void;
};

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, onEdit, onRefresh }) => {
  const handleDelete = async (id: number) => {
    try {
      await deleteEmployee(id);
      onRefresh();
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Department</th>
          <th>Position</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.name}</td>
            <td>{employee.department}</td>
            <td>{employee.position}</td>
            <td>
              <button onClick={() => onEdit(employee)}>Edit</button>
              <button onClick={() => handleDelete(employee.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
