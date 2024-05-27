import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Button/Button";
import axios from "axios";
import Cookies from "js-cookie";
import Pic1 from "../../img/pic1.png"; 

const Authentication = () => {
  const [isLogin, setIsLoginPage] = useState(true);

  const togglePage = () => {
    setIsLoginPage(!isLogin);
    setError("");
  };

  const defaultFormFields = {
    name: "",
    email: "",
    password: "",
    cpassword: "",
  };

  const BASE_URL = "http://localhost:5000/api/v1";

  const [error, setError] = useState("");
  const [formFields, setFormFields] = useState(defaultFormFields);

  const login = () => {
    axios
      .post(`${BASE_URL}/login`, formFields)
      .then((res) => {
        alert(res.data.message);
        Cookies.set("et-auth-name", res.data.currentUser.name, { expires: 7 });
        window.location.reload();
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  const register = () => {
    axios
      .post(`${BASE_URL}/register`, formFields)
      .then((res) => {
        alert(res.data.message);
        window.location.reload();
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      console.log("Logging in...");
      login();
    } else {
      console.log("Signing up...");

      if (formFields.password !== formFields.cpassword) {
        setError("Password confirmation does not matched.");
        return;
      }

      register();
    }
  };

  return (
    <PageContainer>
      <ContentWrapper>
        <TextWrapper>
          <ImageWrapper>
            <img src={Pic1} alt="Decorative" />
          </ImageWrapper>
          <h2>
          <span>Spend</span><span className="highlight">Smart</span>: Best way to track your money!
          </h2>
        </TextWrapper>
        <FormContainer>
          <FormStyled $isLogin={isLogin} className="signup" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>
            <small>Create your account.</small>
            {error && <p className="error">{error}</p>}
            <div className="input-control">
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleChange}
              />
            </div>
            <div className="input-control">
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />
            </div>
            <div className="input-control">
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
            <div className="input-control">
              <input
                type="password"
                name="cpassword"
                placeholder="Confirm Password"
                onChange={handleChange}
              />
            </div>
            <div className="submit-btn">
              <Button
                name={"Register"}
                bPad={".8rem 1.6rem"}
                bRad={"30px"}
                bg={"#222260"}
                color={"#fff"}
              />
            </div>
            <p>
              Already have an account?{" "}
              <span className="link" onClick={togglePage}>
                Sign in.
              </span>
            </p>
          </FormStyled>
          <FormStyled $isLogin={isLogin} className="signin" onSubmit={handleSubmit}>
            <h3>Sign In</h3>
            <small>Welcome back!</small>
            {error && <p className="error">{error}</p>}
            <div className="input-control">
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />
            </div>
            <div className="input-control">
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
            <div className="submit-btn">
              <Button
                name={"Login"}
                bPad={".8rem 1.6rem"}
                bRad={"30px"}
                bg={"#222260"}
                color={"#fff"}
              />
            </div>
            <p>
              Don&apos;t have an account?{" "}
              <span className="link" onClick={togglePage}>
                Sign up.
              </span>
            </p>
          </FormStyled>
        </FormContainer>
      </ContentWrapper>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  background-color: #F0F2F5;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 5%;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2rem;
`;

const TextWrapper = styled.div`
  text-align: center;
  max-width: 60%;
  font-family: 'Segoe UI', sans-serif;

  h1, h2 {
    font-size: 2rem;
    color: #222260;
    margin-bottom: 1rem;
    font-weight: normal;
  }

  h1 span, h2 span {
    color: #222260;
  }

  .highlight {
    color: #F4A261;
  }


  h2 {
    font-size: 1.5rem;
    color: #222260;
    margin-top: 1rem;
    font-weight: 600; /* Adjusted to be slightly thicker */
  }
`;

const IconWrapper = styled.span`
  display: inline-block;
  width: 1em;
  height: 1em;
  vertical-align: middle;
  svg {
    width: 100%;
    height: auto;
    fill: #F9842C; /* Set the color to #F9842C */
  }
`;

const ImageWrapper = styled.div`
  img {
    width: 105%;
    height: auto;
  }
`;

const FormContainer = styled.div`
  background: rgba(252, 246, 249, 0.78);
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  border-radius: 20px;
  font-family: 'Segoe UI', sans-serif;
  width: 100%;
  max-width: 400px;
`;

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  &.signup {
    display: ${({ $isLogin }) => ($isLogin ? "none" : "flex")};
  }
  &.signin {
    display: ${({ $isLogin }) => ($isLogin ? "flex" : "none")};
  }

  h3 {
    text-align: center;
    font-weight: 600; /* Match the font weight here */
  }

  label {
    color: #7a7aa0;
  }

  input,
  textarea,
  select {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 1px solid #d3d3d3;
    background: transparent;
    resize: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);

    &::placeholder {
      color: rgba(34, 34, 96, 0.4);
    }
  }

  .input-control {
    input,
    textarea,
    select {
      width: 100%;
      border: 1px solid #ededed;
      border-radius: 10px;
    }
  }

  .selects {
    display: flex;
    justify-content: flex-end;

    select {
      color: rgba(34, 34, 96, 0.4);

      &:focus,
      &:active {
        color: rgba(34, 34, 96, 1);
      }
    }
  }

  .submit-btn {
    button {
      box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
      &:hover {
        background: var(--color-green) !important;
      }
    }
  }

  .link {
    text-decoration: underline;
    color: #00f;
    cursor: pointer;
  }
`;

export default Authentication;
