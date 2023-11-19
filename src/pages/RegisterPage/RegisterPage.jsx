import { useState } from "react";
import "./RegisterPage.css";
import { NavLink, useNavigate } from "react-router-dom";

function RegisterPage() {
  const [user, setUser] = useState();
  const [errorMassage, setErrorMassage] = useState("");
  const navigate = useNavigate();

  function handleChange(event) {
    const { value, id } = event.target;
    setUser((prevValue) => ({
      ...prevValue,
      [id]: value,
    }));
  }

  function handleSignUp() {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    for (const userInfo in users) {
      if (users[userInfo].email === user.email) {
        setErrorMassage("user already exists");
        return;
      }
    }
    localStorage.setItem("users", JSON.stringify([...users, user]));
    navigate("/", {
      state: {
        first_name: user.first_name,
        last_name: user.last_name,
      },
    });
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
        <h3 className="loginMassage">Register</h3>
        <h3 className="errorMassage">{errorMassage}</h3>
        <div>
          <input
            className="inputName"
            type="text"
            placeholder="First Name"
            id="first_name"
            onChange={handleChange}
            onFocus={handleFocus}
          />
          <input
            className="inputName"
            type="text"
            placeholder="Last Name"
            id="last_name"
            onChange={handleChange}
            onFocus={handleFocus}
          />
        </div>
        <input
          className="inputEmail"
          type="email"
          placeholder="Email"
          id="email"
          onChange={handleChange}
          onFocus={handleFocus}
        />
        <input
          className="inputPassword"
          type="password"
          id="password"
          placeholder="Password"
          onChange={handleChange}
          onFocus={handleFocus}
        />
        <button className="inputButton" onClick={handleSignUp}>
          Sign up
        </button>
        <h4 className="registerTitle">
          <NavLink className="registerLink" to="/login">
            Sign in
          </NavLink>
        </h4>
      </div>
    </div>
  );
}
export default RegisterPage;
