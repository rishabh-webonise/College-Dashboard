import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../api/api';

export const LoginPage = () => {
  const history = useHistory();
  const [userType, setUserType] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();

    const response = await api.post('/login', {
      userType,
      email,
      password,
    });

    const data = await response.data;
    console.log(data);
    if (data.status === 'ok') {
      localStorage.setItem('token', data.user);
      alert('Login successful');
      const isAdmin = userType === 'admin';
      history.replace('/dashboard', { isAdmin });
    } else {
      alert('Error: ' + data.error);
    }
  };

  return (
    <div>
      <h1>Login Portal</h1>
      <form onSubmit={loginUser}>
        <label>
          <input
            type="radio"
            name="userType"
            value="student"
            onChange={(e) => setUserType(e.target.value)}
            checked={userType === 'student'}
          />{' '}
          Student
        </label>
        <label>
          <input
            type="radio"
            name="userType"
            value="admin"
            onChange={(e) => setUserType(e.target.value)}
            checked={userType === 'admin'}
          />{' '}
          Admin
        </label>
        <br />
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
        <br />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
        <br />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
};
