import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import '../styles/Card.css';

export default function Signup() {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

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
      const { data } = await addUser({
        variables: { ...formState },
      });
      console.log("Mutation Data:", data);

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
      console.error("Mutation Error:", e);
    }
  };

  return (
    <main className="flex-row justify-center mb-4">
        <div className="form-card">
          <h1 className="card-header p-2">Sign Up</h1>
          {error && (
            <div className="alert-text">
              <p>Signup unsuccessful. Please try again</p>
            </div>
          )}
          <div className="card-body">
            {data ? (
              <p>Success! Welcome to our site :)</p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div className="form-item row">
                  <input
                    className="form-input"
                    placeholder="Username"
                    name="username"
                    type="text"
                    value={formState.name}
                    onChange={handleChange}
                  />
                </div>
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
                  style={{ cursor: "pointer" }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}
          </div>
        </div>
        <p className="form-aftertext">
          Already have an account? <Link to="/login">Click here to login.</Link>
        </p>
    </main>
  );
}
