import axios from 'axios';

const API_URL = 'http://localhost:5000/employees';

export const getEmployees = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createEmployee = async (employee: { name: string; department: string; position: string }) => {
  const response = await axios.post(API_URL, employee);
  return response.data;
};

export const updateEmployee = async (employee: { id?: number; name: string; department: string; position: string }) => {
  const response = await axios.put(`${API_URL}/${employee.id}`, employee);
  return response.data;
};

export const deleteEmployee = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};
