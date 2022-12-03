import React, { useCallback } from "react";
import axios from "axios";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import styled, { css } from "styled-components";
import { TodoType } from "types/type";
import { useTodoDispatch } from "context/todoContext";

const TodoItem = ({ todo, isCompleted, id }: TodoType) => {
  const dispatch = useTodoDispatch();

  const deleteTodo = useCallback(async () => {
    const checkUser = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:8000/todos/${id}`, {
        headers: {
          Authorization: `Bearer ${checkUser}`,
        },
      });
      dispatch({ type: "DELETE", id: id });
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <TodoItemBox>
      <CheckContainer isCompleted={isCompleted}>
        {isCompleted && <CheckIcon />}
      </CheckContainer>
      <Span isCompleted={isCompleted}>{todo}</Span>
      <Delete onClick={deleteTodo}>
        <DeleteIcon />
      </Delete>
    </TodoItemBox>
  );
};

const Delete = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;
`;
const TodoItemBox = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  &:hover {
    ${Delete} {
      display: initial;
    }
  }
`;

const CheckContainer = styled.div<{ isCompleted: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${({ isCompleted }) =>
    isCompleted &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

const Span = styled.div<{ isCompleted: boolean }>`
  flex: 1;
  font-size: 21px;
  color: #495057;
  ${({ isCompleted }) =>
    isCompleted &&
    css`
      color: #ced4da;
    `}
`;
export default TodoItem;
