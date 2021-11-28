import { useHistory } from 'react-router-dom';
import { useState } from 'react';

import api from '../api/api';

export const UserRow = ({ user, isAdmin, deleteUser }) => {
  const history = useHistory();
  const [departments, setDepartments] = useState(user.departments);

  const editUser = async () => {
    const response = await api.put(`/students/${user._id}`, {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
      body: {
        departments: departments,
      },
    });
    const data = await response.data;
    console.log(data);
    if (data.status === 'ok') {
      setDepartments(data.departments);
      history.replace('/dashboard', { isAdmin });
    } else {
      alert('Error: ' + data.error);
    }
  };

  return (
    <tr>
      <td>{user.userType}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.departments.toString()}</td>
      {isAdmin && (
        <td>
          <button onClick={(e) => history.push('/editStudent', { isAdmin, user })}> Edit </button>
          <button onClick={(e) => deleteUser(user._id)}> Delete </button>
        </td>
      )}
    </tr>
  );
};
