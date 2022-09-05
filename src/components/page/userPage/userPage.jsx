import React, { useState, useEffect } from 'react';
import api from '../../../api';
import PropTypes from 'prop-types';
import Qualities from '../../ui/qualities/qualitiesList';
import { useHistory } from 'react-router-dom';
// import React from 'react';

const UserPage = ({ userId }) => {
  const [user, setUser] = useState();
  const history = useHistory();
  const handleClick = () => {
    history.push('/users');
  };
  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  }, []);
  console.log(user);
  if (user) {
    return (
      <div>
        <h1>{user.name}</h1>
        <h2>Профессия: {user.profession.name}</h2>
        <Qualities qualities={user.qualities} />
        <p>completedMeetings: {user.completedMeetings}</p>
        <h2>Rate: {user.rate}</h2>
        <button onClick={handleClick}>Все пользователи</button>
      </div>
    );
  }
  return 'loading...';
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserPage;
