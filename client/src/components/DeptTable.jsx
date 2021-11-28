import { useHistory } from 'react-router-dom';
import { DeptRow } from './DeptRow';

export const DeptTable = ({ departments }) => {
  const history = useHistory();
  const isAdmin = history.location.state.isAdmin;

  return (
    <div>
      <h2>Departments:</h2>
      {isAdmin && <button onClick={(e) => history.push('/addDept', { isAdmin })}>Add Department</button>}
      {!departments ? (
        <p>No departments</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Dept. Head</th>
              <th>Students</th>
              {isAdmin && <th>Operations</th>}
            </tr>
          </thead>
          <tbody>
            {Object.values(departments).map((element) => (
              <DeptRow key={element._id} dept={element} isAdmin={isAdmin} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
