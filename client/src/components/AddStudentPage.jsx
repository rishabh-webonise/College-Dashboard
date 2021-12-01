import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../api/api';

export const AddStudentPage = () => {
  const history = useHistory();
  let isAdmin = false;
  try {
    isAdmin = history.location.state.isAdmin;
  } catch (e) {
    alert('Unauthorized access');
    history.replace('/login');
  }
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = async (e) => {
    e.preventDefault();

    const response = await api.post(
      '/students',
      {
        name,
        email,
        password,
      },
      {
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      }
    );

    const data = await response.data;
    console.log(data);
    if (data.status === 'ok') {
    } else {
      alert('Error: ' + data.error);
    }
    history.push('/dashboard', { isAdmin });
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
