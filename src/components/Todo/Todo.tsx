import React, { useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Todo = ({ children }: any) => {
  const navigate = useNavigate();
  const checkUser = localStorage.getItem("token");
  useEffect(() => {
    if (checkUser === null) {
      navigate("/");
    }
  }, [checkUser]);

  return <TodoContainer>{children}</TodoContainer>;
};

const TodoContainer = styled.div`
  width: 500px;
  height: 600px;
  position: relative;
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);
  margin: 0 auto;
  margin-top: 96px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  @media only screen and (max-width: 500px) {
    width: 350px;
  }
`;

export default Todo;
