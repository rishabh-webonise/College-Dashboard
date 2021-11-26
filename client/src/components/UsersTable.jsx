import { ObjectRow } from './ObjectRow';

export const UsersTable = ({ users }) => {
  return (
    <div>
      <h2>Users:</h2>
      <table>
        <thead>
          <tr>
            <th>User Type</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(users).map((element) => (
            <ObjectRow key={element._id} user={element} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
