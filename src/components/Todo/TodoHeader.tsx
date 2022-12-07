import { useTodoState } from "context/todoContext";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { currentTime } from "utils/today";
import { useNavigate } from "react-router-dom";

const TodoHeader = () => {
  const todos = useTodoState();
  const navigate = useNavigate();
  const filterData = todos.filter((todo) => todo.isCompleted === false);
  const [nowTimes, setNowTimes] = useState(currentTime().slice(13, 19));
  useEffect(() => {
    const timer = setInterval(() => {
      setNowTimes(currentTime().slice(13, 19));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div>
      <HeaderContainer>
        <div className="day">
          <h1>{currentTime().slice(0, 5)}</h1>
          <h1>{currentTime().slice(5, 8)}</h1>
          <h1>{currentTime().slice(8, 10)}</h1>
          <h1>{currentTime().slice(10, 13)}</h1>
          <Button onClick={handleLogout}>로그아웃</Button>
        </div>
        <div className="sub-container">
          <HeaderSpan>{nowTimes}</HeaderSpan>
          {filterData.length === 0 ? (
            <HeaderSpan>오늘 할 일을 완료했습니다!</HeaderSpan>
          ) : (
            <HeaderSpan>해야 할 일 {filterData.length}개</HeaderSpan>
          )}
        </div>
      </HeaderContainer>
      <Divider />
    </div>
  );
};

const Button = styled.button`
  width: 70px;
  height: 20px;
  cursor: pointer;
  background: #9f78b8;
  &:hover {
    background: #b088c9;
  }
  &:active {
    background: #b088c9;
  }
  border: none;
  color: white;
  border-radius: 5px;
`;

const HeaderContainer = styled.div`
  padding: 20px 32px 25px 32px;
  h1 {
    font-size: 25px;
    padding-right: 10px;
    @media only screen and (max-width: 500px) {
      font-size: 18px;
    }
  }
  .day {
    display: flex;
  }
  .sub-container {
    display: flex;
    justify-content: space-between;
  }
`;

const HeaderSpan = styled.span`
  font-size: 18px;
  font-weight: bold;
  @media only screen and (max-width: 500px) {
    font-size: 13px;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 5px;
  background-color: whitesmoke;
`;
export default TodoHeader;
