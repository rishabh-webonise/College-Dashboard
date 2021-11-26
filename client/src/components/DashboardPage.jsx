import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import { useHistory } from 'react-router-dom';
import api from '../api/api';
import { UsersTable } from './UsersTable';
import { LogOutButton } from './LogOutButton';

export const DashboardPage = () => {
  const history = useHistory();
  const [users, setUsers] = useState({});

  const getInitalData = async () => {
    const response = await api.get('/dashboard', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
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

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwt.decode(token); //userType, name, email
      if (!user) {
        localStorage.removeItem('token');
        history.replace('/login');
      } else {
        getInitalData();
      }
    }
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <LogOutButton />
      <UsersTable users={users} />
    </div>
  );
};
