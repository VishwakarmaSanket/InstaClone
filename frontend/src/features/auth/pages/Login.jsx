import { useState } from "react";
import "../style/form.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

const Login = () => {
  const { user, loading, loginHandler, registerHandler } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function submitHandler(e) {
    e.preventDefault();

    loginHandler(username, password);
    console.log("User Logged In !!!");
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
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
          <input
            onInput={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            name="username"
            id="username"
            placeholder="Username"
          />
          <input
            onInput={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          <button className="button primary-button" type="submit">
            Login
          </button>
        </form>
        <p>
          Don't have an account?{" "}
          <Link className="toggleAuthForm" to="/register">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
