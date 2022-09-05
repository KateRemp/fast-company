import React, { useState, useEffect } from 'react';
import TextField from '../common/form/textField';
import { validator } from '../../utils/validator.';
import api from '../../api';
import SelectField from '../common/form/selectField';
import RadioField from '../common/form/radioField';
import MultiSelectField from '../common/form/multiSelect';
import CheckBoxField from '../common/form/checkBoxField';

const RegisterForm = () => {
  // for more inputs just add nextInput:'' to useState({ email: '', password: '', nextInput:'' })
  const [data, setData] = useState({
    email: '',
    password: '',
    profession: '',
    sex: 'male',
    qualities: [],
    licence: false
  });
  const [qualities, setQualities] = useState({});
  const [professions, setProfession] = useState();
  const [errors, setErrors] = useState({});
  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfession(data));
    api.qualities.fetchAll().then((data) => setQualities(data));
  }, []);
  // Сокращаем: Получаем event (e), из него достаём {target}
  // const handleChange is universall for all inputs
  const handleChange = (target) => {
    console.log(target);
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: 'email is required'
      },
      isEmail: {
        message: 'invalid email'
      }
    },
    password: {
      isRequired: {
        message: 'password is required'
      },
      isCapitalSymbol: {
        message: 'password must contain uppercase characters'
      },
      isContainDigit: {
        message: 'password must contain digits'
      },
      min: {
        message: 'password must be min 8 characters long',
        value: 8
      }
    },
    profession: {
      isRequired: {
        message: 'profession is required'
      }
    },
    licence: {
      isRequired: {
        message: 'License agreement is required'
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

  // button submit
  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        // type="text" Не обязательно передавать, так как по дефолту in components/TextField as TextField.defaultProps
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Password"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <SelectField
        value={data.profession}
        onChange={handleChange}
        dafaultOption="Choose..."
        options={professions}
        error={errors.profession}
        label="Profession"
      />
      <RadioField
        options={[
          { name: 'Male', value: 'male' },
          { name: 'Female', value: 'female' },
          { name: 'Other', value: 'other' }
        ]}
        value={data.sex}
        name="sex"
        onChange={handleChange}
        label="Sex"
      />
      <MultiSelectField
        options={qualities}
        onChange={handleChange}
        name="qualities"
        label="Qualities"
      />
      <CheckBoxField
        name="licence"
        value={data.licence}
        onChange={handleChange}
        error={errors.licence}
      >
        I agree to the terms of the <a href="#"> license agreement</a>
      </CheckBoxField>
      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto"
      >
        Submit
      </button>
    </form>
  );
};
export default RegisterForm;
