import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import api from '../../../api';
import { validator } from '../../../utils/validator.';
import SelectField from '../form/selectField';
import TextAreaField from '../form/textAreaField';
const initialData = { userId: '', content: '' };

const AddCommentForm = ({ onSubmit }) => {
  const [data, setData] = useState(initialData);
  const [users, setUsers] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);
  // transform options to format {label:'',value:''} for SelectField options
  const arrayOfUsers =
    users &&
    Object.keys(users).map((userId) => ({
      label: users[userId].name,
      value: users[userId]._id
    }));
  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };
  const validatorConfig = {
    userId: {
      isRequired: {
        message: 'name is required'
      }
    },
    content: {
      isRequired: {
        message: 'massage is required'
      }
    }
  };
  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    // true or false?
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onSubmit(data);
    clearForm();
  };

  const clearForm = () => {
    setData(initialData);
    setErrors({});
  };

  return (
    <div>
      <h2>New comment</h2>
      <form onSubmit={handleSubmit}>
        <SelectField
          value={data.userId}
          onChange={handleChange}
          name="userId"
          defaultOption="Choose..."
          options={arrayOfUsers}
          error={errors.userId}
        />
        <TextAreaField
          label="text"
          name="content"
          value={data.content}
          onChange={handleChange}
          error={errors.content}
        />
        <button type="submit" disabled={!isValid} className="btn btn-primary ">
          Submit
        </button>
      </form>
    </div>
  );
};
AddCommentForm.propTypes = {
  onSubmit: PropTypes.func
};
export default AddCommentForm;
