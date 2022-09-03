import React, { useState } from 'react';
import LoginForm from '../components/ui/loginForm';
import RegisterForm from '../components/ui/registerForm';
import { useParams, Link } from 'react-router-dom';

const Login = () => {
  const params = useParams();
  const { type } = params;
  console.log(params.type);
  const [formType, setFormType] = useState(
    type === 'register' ? type : 'login'
  ); // po default otkrivaetsja forma login
  const toggleFormType = () => {
    setFormType((prevState) =>
      prevState === 'register' ? 'login' : 'register'
    );
  };
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {formType === 'register' ? (
            <>
              <h3 className="mb-4">Register</h3>
              <RegisterForm />
              <p>
                Already have account?{' '}
                <Link to={'login'} role="button" onClick={toggleFormType}>
                  Sign In
                </Link>
              </p>
            </>
          ) : (
            <>
              <h3 className="mb-4">Login</h3>
              <LoginForm />
              <p>
                Dont have account?{' '}
                <Link
                  to={'/login/register'}
                  role="button"
                  onClick={toggleFormType}
                >
                  Sign Up
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
