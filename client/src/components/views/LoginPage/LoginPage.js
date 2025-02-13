import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_actions";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value);
  };

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const body = {
      email: email,
      password: password,
    };

    dispatch(loginUser(body))
      .unwrap()
      .then((response) => {
        if (response.loginSuccess) {
          console.log("로그인 성공");
          navigate("/");
        } else {
          console.log(response.payload.message);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={onEmailHandler}
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={onPasswordHandler}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
