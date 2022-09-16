import React from 'react';
import UserPage from '../components/page/userPage';
import UsersListPage from '../components/page/usersListPage';
import EditForm from '../components/page/editUserPage/editUserPage';
import { useParams } from 'react-router-dom';

const Users = () => {
  const { userId, edit } = useParams();
  // console.log(userId);
  // console.log(edit);
  return (
    <>
      {userId ? (
        userId && edit ? (
          <EditForm userId={userId} />
        ) : (
          <UserPage userId={userId} />
        )
      ) : (
        <UsersListPage />
      )}
    </>
  );
};

export default Users;
