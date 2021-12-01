import { useHistory } from 'react-router-dom';

export const UserRow = ({ user, isAdmin, deleteUser }) => {
  const history = useHistory();

  return (
    <tr>
      <td>{user.userType}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.departments}</td>
      {isAdmin && (
        <td>
          <button onClick={(e) => history.push('/editStudent', { isAdmin, user })}> Edit </button>
          <button onClick={(e) => deleteUser(user._id)}> Delete </button>
        </td>
      )}
    </tr>
  );
};
