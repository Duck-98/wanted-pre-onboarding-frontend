import React, { useCallback, useState } from "react";
import axios from "axios";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import styled, { css } from "styled-components";
import { TodoType } from "types/type";
import { useTodoDispatch } from "context/todoContext";

const TodoItem = ({ todo, isCompleted, id }: TodoType) => {
  const dispatch = useTodoDispatch();
  const [edit, setEdit] = useState(false);
  const [editTodo, setEditTodo] = useState<string>("");

  const handleDeleteTodo = useCallback(async () => {
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

  const handleCheckTodo = useCallback(async () => {
    const data = { todo, isCompleted };
    const checkUser = localStorage.getItem("token");
    try {
      await axios.put(`http://localhost:8000/todos/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${checkUser}`,
        },
      });
      dispatch({ type: "TOGGLE", id: id });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleEditTodo = useCallback(async () => {
    const data = { editTodo };
    const checkUser = localStorage.getItem("token");
    try {
      await axios.put(`http://localhost:8000/todos/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${checkUser}`,
        },
      });
      dispatch({ type: "UPDATE", id: id, todo: data });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleEdit = () => setEdit((prev) => !prev);
  const onChangeTodo = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTodo(e.target.value);
  }, []);

  return (
    <>
      {edit ? (
        <TodoItemEditBox onSubmit={handleEditTodo}>
          <input
            autoFocus
            id="editTodo"
            name="editTodo"
            value={editTodo}
            // defaultValue={todo}
            onChange={onChangeTodo}
          />
          <button className="icon" type="submit">
            <EditIcon />
          </button>
          <div className="icon" onClick={handleEdit}>
            <CloseIcon />
          </div>
        </TodoItemEditBox>
      ) : (
        <TodoItemBox>
          <CheckContainer isCompleted={isCompleted} onClick={handleCheckTodo}>
            {isCompleted && <CheckIcon />}
          </CheckContainer>
          <Span isCompleted={isCompleted}>{todo}</Span>
          <IconCon onClick={handleEdit}>
            <EditIcon />
          </IconCon>
          <IconCon onClick={handleDeleteTodo}>
            <DeleteIcon />
          </IconCon>
        </TodoItemBox>
      )}
    </>
  );
};

const TodoItemEditBox = styled.form`
  margin-top: 10px;
  display: flex;
  align-items: center;
  #editTodo {
    width: 100%;
    height: 26px;
  }
  .icon {
    cursor: pointer;
    border: none;
    background: none;
    &:hover {
      color: #ff6b6b;
    }
  }
`;

const IconCon = styled.div`
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
    ${IconCon} {
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
      text-decoration: line-through;
    `}
`;
export default TodoItem;
