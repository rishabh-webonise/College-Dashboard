import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

import api from '../api/api';

export const RegisterPage = () => {
  const history = useHistory();

  const [userType, setUserType] = useState('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = async (e) => {
    e.preventDefault();

    const response = await api.post('/register', {
      userType,
      name,
      email,
      password,
    });

    const data = await response.data;
    console.log(data);
    if (data.status === 'ok') {
      alert('Successfully registered');
      history.push('/login');
    } else {
      alert('Error: ' + data.error);
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={registerUser}>
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
        <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" />
        <br />
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
        <br />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
        <br />
        <input type="submit" value="Register" />
      </form>
      <h6>
        Already have an account? <Link to={'/login'}>Login</Link>
      </h6>
    </div>
  );
};
