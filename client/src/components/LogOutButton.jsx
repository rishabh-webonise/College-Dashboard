export const LogOutButton = () => {
  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };
  return (
    <div>
      <button onClick={(e) => logout()}>Log Out</button>
    </div>
  );
};
