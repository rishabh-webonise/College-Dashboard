import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../api/api';

export const RegisterPage = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = async (e) => {
    e.preventDefault();

    const response = await api.post('/register', {
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
      <h1>Add new student account</h1>
      <form onSubmit={registerUser}>
        <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" />
        <br />
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
        <br />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
        <br />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
};
