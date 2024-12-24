import React, { useState, useEffect } from 'react';
import { createEmployee, updateEmployee } from '../services/api';

type Employee = {
  id?: number;
  name: string;
  department: string;
  position: string;
};

type EmployeeFormProps = {
  onRefresh: () => void;
  editingEmployee?: Employee | null;
  onCancelEdit?: () => void;
};

const EmployeeForm: React.FC<EmployeeFormProps> = ({ onRefresh, editingEmployee, onCancelEdit }) => {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');

  useEffect(() => {
    if (editingEmployee) {
      setName(editingEmployee.name);
      setDepartment(editingEmployee.department);
      setPosition(editingEmployee.position);
    } else {
      setName('');
      setDepartment('');
      setPosition('');
    }
  }, [editingEmployee]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !department || !position) {
      alert('Please fill in all fields');
      return;
    }

    try {
      if (editingEmployee) {
        await updateEmployee({ id: editingEmployee.id, name, department, position });
      } else {
        await createEmployee({ name, department, position });
      }

      onRefresh();
      setName('');
      setDepartment('');
      setPosition('');
      if (onCancelEdit) onCancelEdit();
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />
      <input
        type="text"
        placeholder="Position"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      />
      <button type="submit">{editingEmployee ? 'Update Employee' : 'Add Employee'}</button>
      {editingEmployee && <button type="button" onClick={onCancelEdit}>Cancel</button>}
    </form>
  );
};

export default EmployeeForm;
