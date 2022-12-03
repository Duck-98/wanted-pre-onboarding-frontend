import axios from "axios";
import { useTodoDispatch, useTodoState } from "context/todoContext";
// import { useUserState } from "context/userContext";
import React, { useEffect, useCallback } from "react";
import styled from "styled-components";
import TodoItem from "./TodoItem";
const TodoList = () => {
  const dispatch = useTodoDispatch();
  const todos = useTodoState();
  // const users = useUserState;
  const getTodos = useCallback(async () => {
    const checkUser = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:8000/todos", {
        headers: {
          Authorization: `Bearer ${checkUser}`,
        },
      });
      dispatch({ type: "READ", todo: response.data });
    } catch (error) {
      console.error(error);
    }
  }, []);

  // const dispatch = useTodoDispatch();
  useEffect(() => {
    getTodos();
    console.log(todos);
  }, []);
  return (
    <TodoListBox>
      {todos?.map((todo) => (
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
