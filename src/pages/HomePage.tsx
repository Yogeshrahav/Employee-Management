import React, { useEffect, useState } from 'react';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeTable from '../components/EmployeeTable';
import { getEmployees } from '../services/api';

const HomePage: React.FC = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);

  const fetchEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleEdit = (employee: any) => {
    setEditingEmployee(employee);
  };

  const handleCancelEdit = () => {
    setEditingEmployee(null);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div>
      <h1>Employee Management</h1>
      <EmployeeForm
        onRefresh={fetchEmployees}
        editingEmployee={editingEmployee}
        onCancelEdit={handleCancelEdit}
      />
      <EmployeeTable employees={employees} onEdit={handleEdit} onRefresh={fetchEmployees} />
    </div>
  );
};

export default HomePage;
