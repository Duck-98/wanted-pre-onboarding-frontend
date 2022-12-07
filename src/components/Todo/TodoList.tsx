import axios from "axios";
import { useTodoDispatch, useTodoState } from "context/todoContext";
import React, { useEffect, useCallback } from "react";
import styled from "styled-components";
import { TodoType } from "types/type";
import TodoItem from "./TodoItem";
import { AXIOS_URL } from "utils/api";
const TodoList = () => {
  const dispatch = useTodoDispatch();
  const todos = useTodoState();
  const getTodos = useCallback(async () => {
    const checkUser = localStorage.getItem("token");
    try {
      const response = await axios.get(`${AXIOS_URL}/todos`, {
        headers: {
          Authorization: `Bearer ${checkUser}`,
        },
      });
      dispatch({ type: "READ", todo: response.data });
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <TodoListBox>
      {todos?.map((todo: TodoType) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          todo={todo.todo}
          isCompleted={todo.isCompleted}
          userId={todo.userId}
        />
      ))}
    </TodoListBox>
  );
};

const TodoListBox = styled.div`
  padding: 20px 32px;
  flex: 1;
  overflow-y: auto;
`;

export default TodoList;
