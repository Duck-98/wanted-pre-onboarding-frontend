import React, { useReducer, createContext, Dispatch, useContext } from "react";
import { TodoType } from "types/type";

type TodosState = TodoType[];
type ActionProps =
  | any
  | {
      type: "CREATE";
      todo: TodoType[];
    }
  | {
      type: "TOGGLE";
      id: number;
    }
  | { type: "UPDATE"; todo: TodoType[]; id: number }
  | { type: "READ"; todo: TodoType[] }
  | { type: "DELETE"; id: number };

function todoReducer(state: TodosState, action: ActionProps): TodosState {
  switch (action.type) {
    case "CREATE":
      return state.concat(action.todo);
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo,
      );
    case "DELETE":
      return state.filter((todo) => todo.id !== action.id);
    case "UPDATE":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, todo: todo.todo } : todo,
      );
    case "READ":
      state = [];
      return state.concat(action.todo);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

type TodosDispatch = Dispatch<ActionProps>;
const TodosStateContext = createContext<TodosState | null>(null);
const TodosDispatchContext = createContext<TodosDispatch | null>(null);
export function TodosProvider({ children }: { children: React.ReactNode }) {
  const [todos, dispatch] = useReducer(todoReducer, []);
  return (
    <TodosStateContext.Provider value={todos}>
      <TodosDispatchContext.Provider value={dispatch}>
        {children}
      </TodosDispatchContext.Provider>
    </TodosStateContext.Provider>
  );
}

export function useTodoState() {
  const state = useContext(TodosStateContext);
  if (!state) {
    throw new Error("Cannot find TodoProvider");
  }
  return state;
}

export function useTodoDispatch() {
  const dispatch = useContext(TodosDispatchContext);
  if (!dispatch) {
    throw new Error("Cannot find TodoProvider");
  }
  return dispatch;
}
