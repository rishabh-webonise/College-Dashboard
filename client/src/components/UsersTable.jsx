import { useHistory } from 'react-router-dom';
import { UserRow } from './UserRow';

export const UsersTable = ({ users, deleteUser }) => {
  const history = useHistory();
  const isAdmin = history.location.state.isAdmin;

  return (
    <div>
      <h2>Students:</h2>
      {isAdmin && <button onClick={(e) => history.push('/addStudent', { isAdmin })}>Add Student</button>}
      {!users ? (
        <p>No users</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>User Type</th>
              <th>Name</th>
              <th>Email</th>
              <th>Departments</th>
              {isAdmin && <th>Operations</th>}
            </tr>
          </thead>
          <tbody>
            {Object.values(users).map((element) => (
              <UserRow key={element._id} user={element} isAdmin={isAdmin} deleteUser={deleteUser} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
