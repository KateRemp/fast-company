import React, { useState, useEffect } from 'react';
import api from '../api';
import PropTypes from 'prop-types';
import QualitiesList from './qualitiesList';
import { useHistory } from 'react-router-dom';
// import React from 'react';

const UserPage = ({ userId }) => {
  const [user, setUser] = useState();
  const history = useHistory();
  const handleBackToList = () => {
    history.push('/users');
  };
  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  }, []);
  console.log(user);
  if (user) {
    return (
      <>
        <h1>{user.name}</h1>
        <h2>Профессия:{user.profession.name}</h2>
        <QualitiesList qualities={user.qualities} />
        <h6>completedMeetings:{user.completedMeetings}</h6>
        <h2>Rate:{user.rate}</h2>
        <button onClick={() => handleBackToList()}>Все пользователи</button>
      </>
    );
  }
  return 'loading...';
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserPage;
