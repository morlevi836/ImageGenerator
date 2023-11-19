/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import "./LoginPage.css";
import { NavLink, useNavigate } from "react-router-dom";

function LoginPage() {
  const [user, setUser] = useState();
  const [errorMassage, setErrorMassage] = useState("");
  const navigate = useNavigate();

  const users = JSON.parse(localStorage.getItem("users"));

  function userInfo(event) {
    const { type, value } = event.target;
    setUser((prevValue) => ({
      ...prevValue,
      [type]: value,
    }));
  }

  function handleLogin() {
    for (const userValue in users) {
      if (
        users[userValue].email === user.email &&
        users[userValue].password === user.password
      ) {
        navigate("/", {
          state: {
            first_name: users[userValue].first_name,
            last_name: users[userValue].last_name,
          },
        });
        return;
      }
    }
    setErrorMassage("User isn't found");
  }

  function handleFocus() {
    setErrorMassage("");
  }

  return (
    <div className="Flex__Div">
      <button className="goBackButton" onClick={() => navigate("/")}>
        <img
          className="leftArrowImg"
          src="left-arrow.png"
          alt="left-arrow"
          draggable="false"
        />{" "}
        Go Back
      </button>
      <img className="logoImg" src="Logo.png" alt="Logo" draggable="false" />
      <h3 className="logoMassage">Image Generator</h3>
      <div className="inputInfo">
        <h3 className="loginMassage">Login</h3>
        <h3 className="errorMassage">{errorMassage}</h3>
        <input
          className="inputEmail"
          type="email"
          placeholder="Enter your email"
          onChange={userInfo}
          onFocus={handleFocus}
        />
        <input
          className="inputPassword"
          type="password"
          placeholder="password"
          onChange={userInfo}
          onFocus={handleFocus}
        />
        <button className="inputButton" onClick={handleLogin}>
          Sign In
        </button>
      </div>
      <div className="registerInfo">
        <h4 className="registerTitle">
          Don't have an account?{" "}
          <NavLink className="registerLink" to="/Register">
            Sign up
          </NavLink>
        </h4>
      </div>
    </div>
  );
}
export default LoginPage;
