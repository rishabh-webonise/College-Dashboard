import React from 'react';

export const ObjectRow = ({ user }) => {
  return (
    <tr>
      <td>{user.userType}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
    </tr>
  );
};
