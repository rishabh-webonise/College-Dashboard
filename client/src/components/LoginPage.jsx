import { useState } from 'react';
import { Link } from 'react-router-dom';

import api from '../api/api';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();

    const response = await api.post('/login', {
      email,
      password,
    });

    const data = await response.data;
    console.log(data);
    if (data.status === 'ok') {
      localStorage.setItem('token', data.user);
      alert('Login successful');
      window.location.href = '/dashboard';
    } else {
      alert('Error: ' + data.error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
        <br />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
        <br />
        <input type="submit" value="Login" />
      </form>
      <h6>
        Don't have an account? <Link to={'/register'}>Register</Link>
      </h6>
    </div>
  );
};
