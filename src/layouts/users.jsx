import React from 'react';
import UserPage from '../components/userPage';
import UsersList from '../components/usersList';
import { useParams } from 'react-router-dom';

const Users = () => {
  const { userId } = useParams();

  return <>{userId ? <UserPage userId={userId} /> : <UsersList />}</>;
};

export default Users;
