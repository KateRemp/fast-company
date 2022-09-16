import React from 'react';
import { useHistory } from 'react-router';

const BackHistoryButton = () => {
  const history = useHistory();
  const handleClick = () => {
    history.goBack();
  };
  // const handleClick = () => {
  // history.push('/users');
  // };
  console.log(history);
  return (
    <button className="btn btn-primary" onClick={handleClick}>
      <i className="bi bi-caret-left"></i>back
    </button>
  );
};

export default BackHistoryButton;
