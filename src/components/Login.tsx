import React, { useState } from "react";
import axios from "axios";
import styled, { css } from "styled-components";
import { useUserDispatch } from "context/userContext";
const Login = () => {
  const dispatch = useUserDispatch();
  const [id, setId] = useState("");
  const [idError, setIdError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState({ id, password });
  const handleSubmitId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const handleSubmitPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    console.log(password);
  };
  const validationId = (id: string) => {
    const idRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return idRegex.test(id);
  };
  const validationPassword = (password: string) => {
    const passwordRegex = /^.{8,}$/;
    return passwordRegex.test(password);
  };
  const handleValidation = () => {
    if (!validationId(id)) {
      setIdError("이메일 형식으로 입력해주세요.ex)abc@gmail.com");
    }
    if (idError) {
      setIdError("");
      return false;
    }
    if (!validationPassword(password)) {
      setPasswordError("8글자 이상 입력해주세요.");
    }
    if (passwordError) {
      setPasswordError("");
      return false;
    }
    if (idError === "" && passwordError === "") {
      setIsError(true);
      console.log("문제있음", isError);
    } else {
      setIsError(false);
      console.log("문제없음", isError);
    }
    return true;
  };
  const onClickLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    // e: React.FormEvent<HTMLFormElement>,
    e.preventDefault();
    const valid = handleValidation();
    if (!valid) {
      console.log("error", idError);
      console.log("error", passwordError);
    } else {
      setData({ id, password });
      await axios
        .post("https://pre-onboarding-selection-task.shop/auto/signin", data, {
          withCredentials: true,
        })
        .then((response) => {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.access_token}`;
          dispatch({
            type: "LOGIN",
            key: response.data.access_token,
          });
          // navigate(-1);
          return response.data;
        })
        .catch((e) => {
          console.log(e.response.data);
          alert("아이디 혹은 비밀번호를 확인하세요.");
        });
    }
  };
  return (
    <Div>
      <Container onSubmit={onClickLogin}>
        <Input
          id="id"
          name="id"
          value={id}
          placeholder="아이디를 입력해주세요"
          onChange={handleSubmitId}
        />
        <span>{idError}</span>
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
  background-color: #03c75a;
  &:hover {
    background-color: #03a74d;
  }
  ${({ isError }) =>
    isError
      ? css`
          /* background-color: red; */
        `
      : css`
          /* background-color: #03c75a; */
        `};
`;
