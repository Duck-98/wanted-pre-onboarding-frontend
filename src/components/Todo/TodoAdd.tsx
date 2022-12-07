import React, { useState, useCallback } from "react";
import axios from "axios";
import styled, { css } from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import { useTodoDispatch } from "context/todoContext";
import { AXIOS_URL } from "utils/api";
const TodoAdd = () => {
  const checkUser = localStorage.getItem("token");
  const dispatch = useTodoDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [todo, setTodo] = useState<string>("");
  const onToggle = () => setOpen(!open);

  const onChangeTodo = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  }, []);
  const onSubmitTodo = async () => {
    const data = { todo };
    try {
      const response = await axios.post(`${AXIOS_URL}/todos`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${checkUser}`,
        },
      });
      dispatch({ type: "CREATE", todo: response.data });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {open && (
        <InsertFormPositioner>
          <InsertForm onSubmit={onSubmitTodo}>
            <Input
              autoFocus
              placeholder="할 일을 입력해주세요."
              id="todo"
              name="todo"
              value={todo}
              onChange={onChangeTodo}
            />
            <Button type="submit">
              <CustomAdd />
            </Button>
          </InsertForm>
        </InsertFormPositioner>
      )}
      <CircleButton onClick={onToggle} open={open}>
        <AddIcon />
      </CircleButton>
    </>
  );
};

const Button = styled.button`
  border: none;
  background: #ffffff;
  position: absolute;
  right: 40px;
  top: 43px;
  cursor: pointer;
  &:active {
    color: #b088c9;
  }
`;

const CustomAdd = styled(AddIcon)``;

const CircleButton = styled.button<{ open: boolean }>`
  background: #9f78b8;
  &:hover {
    background: #b088c9;
  }
  &:active {
    background: #b088c9;
  }

  z-index: 5;
  cursor: pointer;
  width: 60px;
  height: 60px;
  display: block;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, 50%);
  color: white;
  border-radius: 50%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.125s all ease-in;
  ${({ open }) =>
    open &&
    css`
      background: #ff6b6b;
      &:hover {
        background: #ff8787;
      }
      &:active {
        background: #fa5252;
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `}
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
`;

const InsertForm = styled.form`
  background: #f8f9fa;
  padding-left: 32px;
  padding-top: 32px;
  padding-right: 32px;
  padding-bottom: 72px;

  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;

export default TodoAdd;
