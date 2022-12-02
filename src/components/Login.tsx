import React, { useCallback, useState, useEffect } from "react";
import axios from "axios";
import styled, { css } from "styled-components";
import { useUserDispatch } from "context/userContext";
import { Link, useNavigate } from "react-router-dom";
import { validationId, validationPassword } from "utils/validation";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useUserDispatch();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>("");
  const [isError, setIsError] = useState(false);
  const checkUser = localStorage.getItem("token");
  const handleSubmitEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      if (!validationId(e.target.value)) {
        setEmailError("이메일 형식으로 입력해주세요.ex)abc@gmail.com");
        setIsError(true);
      } else {
        setEmailError(null);
        setIsError(false);
      }
    },
    [],
  );

  const handleSubmitPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      if (!validationPassword(e.target.value)) {
        setPasswordError("8글자 이상 입력해주세요");
        setIsError(true);
      } else {
        setPasswordError(null);
        setIsError(false);
      }
    },
    [],
  );

  const onClickLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { email, password };
    if (!isError) {
      await axios
        .post("http://localhost:8000/auth/signin", data, {
          // withCredentials: true,
        })
        .then((response) => {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.access_token}`;
          dispatch({
            type: "LOGIN",
            key: response.data.access_token,
          });
          localStorage.setItem("token", response.data.access_token);
          return response.data;
        })
        .catch((e) => {
          console.log(e.response.data);
          alert("아이디 혹은 비밀번호를 확인하세요.");
        });
    }
  };
  useEffect(() => {
    if (checkUser === null) {
      navigate("/");
    } else {
      navigate("/todo");
    }
  }, [checkUser]);
  return (
    <Div>
      <Container onSubmit={onClickLogin}>
        <Input
          id="email"
          name="email"
          value={email}
          placeholder="아이디를 입력해주세요"
          onChange={handleSubmitEmail}
        />
        <span>{emailError}</span>
        <Input
          id="password"
          name="password"
          value={password}
          type="password"
          placeholder="비밀번호를 입력해주세요"
          onChange={handleSubmitPassword}
        />
        <span>{passwordError}</span>
        <Button isError={isError}>로그인</Button>
        <div className="link">
          <StyledLink to="/register">회원가입하러가기</StyledLink>
        </div>
      </Container>
    </Div>
  );
};

export default Login;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  height: 100%;
  @media only screen and (min-width: 500px) {
    width: 400px;
  }
`;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 15%;
  width: 500px;
  span {
    font-weight: bold;
    color: red;
  }
  .link {
    display: flex;
    justify-content: flex-end;
  }
  @media only screen and (max-width: 500px) {
    width: 300px;
  }
`;

const StyledLink = styled(Link)`
  font-weight: bold;
  font-size: 12px;
  color: #03c75a;
  cursor: pointer;
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

const Input = styled.input`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 40px;
  margin: 0 0 8px;
  padding: 5px 39px 5px 11px;
  border: solid 1px #dadada;
  background: #fff;
  box-sizing: border-box;
`;

const Button = styled.button<{ isError: boolean }>`
  font-size: 18px;
  font-weight: 700;
  line-height: 49px;
  display: block;
  width: 100%;
  height: 49px;
  margin: 16px 0 7px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  border: none;
  border-radius: 0;
  &:hover {
    background-color: #03a74d;
  }
  ${({ isError }) =>
    isError
      ? css``
      : css`
          background-color: #03c75a;
        `};
`;
