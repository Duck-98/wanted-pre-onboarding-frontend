import React, { useState, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import { useTodoDispatch } from "context/todoContext";
import { AXIOS_URL } from "utils/api";
const TodoAdd = () => {
  const checkUser = localStorage.getItem("token");
  const dispatch = useTodoDispatch();
  const [todo, setTodo] = useState<string>("");

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
      <FormContainer>
        <form onSubmit={onSubmitTodo}>
          <Input
            autoFocus
            placeholder="할 일을 입력해주세요."
            id="todo"
            name="todo"
            value={todo}
            onChange={onChangeTodo}
          />
          <button type="submit">
            <CustomAdd />
          </button>
        </form>
      </FormContainer>
    </>
  );
};

const CustomAdd = styled(AddIcon)``;

const FormContainer = styled.div`
  width: 100%;
  form {
    width: 100%;
    display: flex;
  }
  button {
    color: white;
    border: none;
    background: #9f78b8;
    &:hover {
      background: #b088c9;
    }
    &:active {
      background: #b088c9;
    }
  }
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
