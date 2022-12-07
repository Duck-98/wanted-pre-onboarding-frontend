import React, { useCallback, useState } from "react";
import axios from "axios";
import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { validationId, validationPassword } from "utils/validation";
import { AXIOS_URL } from "utils/api";
const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>("");
  const [isError, setIsError] = useState(false);

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

  const onClickSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { email, password };
    if (!isError) {
      await axios
        .post(`${AXIOS_URL}/auth/signup`, JSON.stringify(data), {
          headers: {
            "Content-Type": `application/json`, // application/json 타입 선언
          },
        })
        .then((response) => {
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.access_token}`;
          navigate("/");
          return response.data;
        })
        .catch((e) => {
          console.log(e.response.data);
          alert(e.response.data.message);
        });
    }
  };

  return (
    <Div>
      <div className="subject">
        <label>회원가입</label>
      </div>
      <Container onSubmit={onClickSignUp}>
        <Input
          id="email"
          name="email"
          value={email}
          placeholder="이메일을 입력해주세요"
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
        <Button isError={isError}>회원가입</Button>
      </Container>
    </Div>
  );
};

export default Register;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  align-items: center;
  height: 100%;
  .subject {
    padding-top: 100px;
    label {
      font-weight: bold;
      font-size: 20px;
    }
  }
  @media only screen and (min-width: 500px) {
    width: 400px;
  }
`;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 5%;
  width: 500px;
  span {
    font-weight: bold;
    color: red;
  }
  @media only screen and (max-width: 500px) {
    width: 300px;
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
    background-color: #b088c9;
  }
  ${({ isError }) =>
    isError
      ? css``
      : css`
          background-color: #9f78b8;
        `};
`;
