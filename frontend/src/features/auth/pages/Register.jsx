import React from "react";
import "../style/form.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

const Register = () => {
  const { loading, registerHandler } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();

    await registerHandler(username, email, password);
    console.log("User Registered !!!");
    navigate("/");
  }

  if (loading)
    return (
      <main>
        <div className="svg-loader">
          <svg viewBox="0 0 100 100">
            <circle
              className="track"
              cx="50"
              cy="50"
              r="40"
              fill="none"
              strokeWidth="6"
            />
            <circle
              className="progress"
              cx="50"
              cy="50"
              r="40"
              fill="none"
              strokeWidth="6"
            />
          </svg>
        </div>
      </main>
    );

  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={submitHandler}>
          <input
            onInput={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            name="username"
            placeholder="Username"
          />
          <input
            onInput={(e) => {
              setEmail(e.target.value);
            }}
            type="text"
            name="email"
            placeholder="Email"
          />
          <input
            onInput={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            name="password"
            placeholder="Password"
          />
          <button className="button primary-button" type="submit">
            Register
          </button>
        </form>
        <p>
          Already have an account?{" "}
          <Link className="toggleAuthForm" to="/login">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
