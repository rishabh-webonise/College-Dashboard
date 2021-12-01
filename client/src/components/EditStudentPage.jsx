import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../api/api';

export const EditStudentPage = () => {
  const history = useHistory();
  let isAdmin = false;
  let user = null;
  try {
    isAdmin = history.location.state.isAdmin;
    user = history.location.state.user;
  } catch (e) {
    alert('Unauthorized access');
    history.replace('/login');
  }
  const token = localStorage.getItem('token');
  const [departments, setDepartments] = useState([]);

  const editUser = async (e) => {
    e.preventDefault();
    let toAdd = [];
    let toDelete = [];
    Object.values(departments).forEach((ele) => {
      if (ele.status) {
        toAdd.push({
          userId: user._id,
          deptId: ele._id,
        });
      } else {
        toDelete.push(ele._id);
      }
    });

    const res1 = await api.delete(
      `/userdept`,
      {
        userIds: [user._id],
        deptIds: toDelete,
      },
      {
        headers: {
          'x-access-token': token,
        },
      }
    );
    let data = await res1.data;
    console.log(data);
    if (data.status === 'ok') {
    } else {
      alert('Error: ' + data.error);
    }
    const res2 = await api.post(
      `/userdept`,
      {
        data: toAdd,
      },
      {
        headers: {
          'x-access-token': token,
        },
      }
    );
    data = await res2.data;
    console.log(data);
    if (data.status === 'ok') {
    } else {
      alert('Error: ' + data.error);
    }
    history.push('/dashboard', { isAdmin });
  };

  const getAllDepartments = async () => {
    const response = await api.get(`/departments/${user._id}`, {
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

  const updateState = (id) => {
    departments[id].status = !departments[id].status;
    setDepartments(departments);
  };

  useEffect(() => {
    getAllDepartments();
  }, []);

  return (
    <div>
      <h1>Update Departments </h1>
      <form onSubmit={editUser}>
        {Object.values(departments).map((element, id) => (
          <label key={element._id}>
            <input
              type="checkbox"
              name="selected"
              value={id}
              defaultChecked={element.status}
              onChange={(e) => updateState(e.target.value)}
            />
            {element.name}
          </label>
        ))}
        <br />
        <br />
        <input type="submit" value="Update" />
      </form>
    </div>
  );
};
