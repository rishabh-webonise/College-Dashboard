import React from 'react';

export const DeptRow = ({ dept, isAdmin }) => {
  return (
    <tr>
      <td>{dept.name}</td>
      <td>{dept.head}</td>
      <td>{dept.students.toString()}</td>
      {isAdmin && (
        <td>
          <button onClick={(e) => console.log('Edit')}> Edit </button>
          <button onClick={(e) => console.log('Delete')}> Delete </button>
        </td>
      )}
    </tr>
  );
};
