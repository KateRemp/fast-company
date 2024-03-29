import React, { useState, useEffect } from 'react';
import TextField from '../common/form/textField';
import { validator } from '../../utils/validator.';
import CheckBoxField from '../common/form/checkBoxField';

const LoginForm = () => {
  // for more inputs just add nextInput:'' to useState({ email: '', password: '', nextInput:'' })
  const [data, setData] = useState({ email: '', password: '', stayOn: false });
  const [errors, setErrors] = useState({});
  // Сокращаем: Получаем event (e), из него достаём {target}
  // const handleChange is universall for all inputs
  const handleChange = (target) => {
    setData((prevState) => {
      // console.log(prevState);
      return { ...prevState, [target.name]: target.value };
    });
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
      <CheckBoxField name="stayOn" value={data.stayOn} onChange={handleChange}>
        Stay signed in
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

export default LoginForm;
