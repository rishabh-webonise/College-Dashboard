import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../api/api';

export const EditStudentPage = () => {
  const history = useHistory();
  const isAdmin = history.location.state.isAdmin;
  const user = history.location.state.user;
  const token = localStorage.getItem('token');
  const [departments, setDepartments] = useState([]);
  const [selected, setSelected] = useState(user.departments);

  const editUser = async (e) => {
    e.preventDefault();

    const response = await api.put(
      `/students/${user._id}`,
      {
        departments: selected,
      },
      {
        headers: {
          'x-access-token': token,
        },
      }
    );

    const data = await response.data;
    console.log(data);
    if (data.status === 'ok') {
      alert('Successfully Updated');
    } else {
      alert('Error: ' + data.error);
    }
    history.push('/dashboard', { isAdmin });
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

  useEffect(() => {
    getAllDepartments();
  }, []);

  return (
    <div>
      <h1>Update Departments </h1>
      <form onSubmit={editUser}>
        {Object.values(departments).map((element) => (
          <label>
            <input type="checkbox" name="selected" key={element._id} />
            {element.name}
          </label>
        ))}
        <br />
        <input type="submit" value="Update" />
      </form>
    </div>
  );
};
