import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { currentTime } from "utils/today";
const TodoHeader = () => {
  const [nowTimes, setNowTimes] = useState(currentTime().slice(13, 19));
  useEffect(() => {
    const timer = setInterval(() => {
      setNowTimes(currentTime().slice(13, 19));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div>
      <HeaderContainer>
        <div className="day">
          <h1>{currentTime().slice(0, 5)}</h1>
          <h1>{currentTime().slice(5, 8)}</h1>
          <h1>{currentTime().slice(8, 10)}</h1>
          <h1>{currentTime().slice(10, 13)}</h1>
        </div>
        <div className="sub-container">
          <HeaderSpan>{nowTimes}</HeaderSpan>
          <HeaderSpan>해야 할 일 3개</HeaderSpan>
        </div>
      </HeaderContainer>
      <Divider />
    </div>
  );
};

const HeaderContainer = styled.div`
  padding: 20px 32px 25px 32px;
  h1 {
    font-size: 25px;
    padding-right: 10px;
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
`;

const Divider = styled.div`
  width: 100%;
  height: 5px;
  background-color: whitesmoke;
`;
export default TodoHeader;
