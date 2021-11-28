import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';

import api from '../api/api';
import { UsersTable } from './UsersTable';
import { DeptTable } from './DeptTable';
import { LogOutButton } from './LogOutButton';

export const DashboardPage = () => {
  const history = useHistory();
  const [users, setUsers] = useState({});
  const [departments, setDepartments] = useState({});
  const token = localStorage.getItem('token');

  const getAllUsers = async () => {
    const response = await api.get('/students', {
      headers: {
        'x-access-token': token,
      },
    });
    const data = await response.data;
    console.log(data);
    if (data.status === 'ok') {
      setUsers(data.users);
    } else {
      alert('Error: ' + data.error);
    }
  };

  const getAllDepartments = async () => {
    const response = await api.get('/departments', {
      headers: {
        'x-access-token': token,
      },
    });
    const data = await response.data;
    console.log(data);
    if (data.status === 'ok') {
      setDepartments(data.departments);
    } else {
      alert('Error: ' + data.error);
    }
  };

  const deleteUser = async (UserId) => {
    const response = await api.delete(`/students/${UserId}`, {
      headers: {
        'x-access-token': token,
      },
    });
    const data = await response.data;
    console.log(data);
    if (data.status === 'ok') {
      //TODO: Update specific data only
      getAllUsers();
      getAllDepartments();
      alert('User deleted successfully!');
    } else {
      alert('Error: ' + data.error);
    }
  };

  useEffect(() => {
    if (token) {
      const user = jwt.decode(token); //_id
      if (!user) {
        localStorage.removeItem('token');
        history.replace('/login');
      } else {
        getAllUsers();
        getAllDepartments();
      }
    } else {
      history.replace('/login');
    }
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <LogOutButton />
      <hr />
      <UsersTable users={users} deleteUser={deleteUser} />
      <hr />
      <DeptTable departments={departments} />
    </div>
  );
};
