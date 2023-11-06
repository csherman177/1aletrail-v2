import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import '../styles/Card.css';

export default function Login (props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <main className="flex-row justify-center mb-4">
        <div className="form-card">
          <h1 className="card-header p-2">Login</h1>
          {error && (
            <div className="alert-text">
              <p>Login unsuccessful. Please try again</p>
            </div>
          )}
          <div className="card-body">
            {data ? (
              <p>
                Success! Welcome back :)
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div className="form-item row">
                  <input
                    className="form-input"
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-item row">
                  <input
                    className="form-input"
                    placeholder="********"
                    name="password"
                    type="password"
                    value={formState.password}
                    onChange={handleChange}
                  />
                </div>
                <button
                  className="form-btn"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
        <p className="form-aftertext">Don't have an account yet?{' '}
            <Link to="/signup">Click here to sign up.</Link>
        </p>
    </main>
  );
};
