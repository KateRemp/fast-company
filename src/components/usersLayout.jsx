import React from 'react';
import UserPage from './userPage';
import Users from './usersList';
import { useParams } from 'react-router-dom';

const usersLayout = () => {
  const { userId } = useParams();

  return <>{userId ? <UserPage userId={userId} /> : <Users />}</>;
};

export default usersLayout;
