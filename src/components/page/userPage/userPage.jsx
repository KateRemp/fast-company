import React, { useState, useEffect } from 'react';
import api from '../../../api';
import PropTypes from 'prop-types';
import Qualities from '../../ui/qualities/qualitiesList';
import { useHistory, Link } from 'react-router-dom';

const UserPage = ({ userId }) => {
  const [user, setUser] = useState();
  const history = useHistory();
  const handleClick = () => {
    history.push('/users');
  };
  useEffect(() => {
    api.users.getById(userId).then((data) => setUser(data));
  }, []);

  if (user) {
    return (
      <div>
        <h1>{user.name}</h1>
        <h2>Профессия: {user.profession.name}</h2>
        <Qualities qualities={user.qualities} />
        <p>completedMeetings: {user.completedMeetings}</p>
        <h2>Rate: {user.rate}</h2>
        <button onClick={handleClick}>Все пользователи</button>
        <button>
          <Link to={`/users/${user._id}/edit`}>edit</Link>
        </button>
      </div>
    );
  }
  return 'loading...';
};

UserPage.propTypes = {
  userId: PropTypes.string.isRequired
};

export default UserPage;
