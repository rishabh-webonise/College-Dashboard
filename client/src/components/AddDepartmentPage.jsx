import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../api/api';

export const AddDepartmentPage = () => {
  const history = useHistory();
  let isAdmin = false;
  try {
    isAdmin = history.location.state.isAdmin;
  } catch (e) {
    alert('Unauthorized access');
    history.replace('/login');
  }
  const [name, setName] = useState('');
  const [head, setHead] = useState('');

  const registerUser = async (e) => {
    e.preventDefault();

    const response = await api.post(
      '/departments',
      {
        name,
        head,
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
      <h1>Add new department account</h1>
      <form onSubmit={registerUser}>
        <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Name" />
        <br />
        <input value={head} onChange={(e) => setHead(e.target.value)} type="text" placeholder="Dept. Head" />
        <br />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
};
