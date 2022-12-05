import axios from "axios";
import React, {
  useReducer,
  createContext,
  Dispatch,
  useRef,
  useContext,
} from "react";
import { TodoType } from "types/type";

// type StateProps = { [todos: TodoType] };
type StateProps = {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: string;
};
type TodosState = StateProps[];
type ActionProps =
  | any
  | {
      type: "CREATE";
      todo: StateProps[];
    }
  | {
      type: "TOGGLE";
      id: number;
    }
  | { type: "UPDATE"; todo: StateProps[]; id: number }
  | { type: "READ"; todo: StateProps[] }
  | { type: "DELETE"; id: number };
const initialState = [
  {
    id: 1,
    todo: "test",
    userId: "1",
    isCompleted: false,
  },
  {
    id: 2,
    todo: "test2222",
    userId: "2",
    isCompleted: true,
  },
];

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
      return state.concat(action.todo);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

type TodosDispatch = Dispatch<ActionProps>;
const TodosStateContext = createContext<TodosState | null>(null);
const TodosDispatchContext = createContext<TodosDispatch | null>(null);
const TodosNextIdContext = createContext<null | any>(null);
export function TodosProvider({ children }: { children: React.ReactNode }) {
  const [todos, dispatch] = useReducer(todoReducer, initialState);
  const nextId = useRef(5);
  return (
    <TodosStateContext.Provider value={todos}>
      <TodosDispatchContext.Provider value={dispatch}>
        <TodosNextIdContext.Provider value={nextId}>
          {children}
        </TodosNextIdContext.Provider>
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

export function useTodoNextId() {
  const context = useContext(TodosNextIdContext);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
}

// export async function getUsers(dispatch : any) {
//   dispatch({ type: "READ" });
//   try {
//     const response = await axios.get("http://localhost:8000/todos", {
//       headers: {
//         Authorization: `Bearer ${checkUser}`,
//       },
//     });
//     dispatch({ type: "GET_USERS_SUCCESS", data: response.data });
//   } catch (e) {
//     dispatch({ type: "GET_USERS_ERROR", error: e });
//   }
// }

// export const getData = async () => {
//   const todoData = await axios.get("http://localhost:8000/api/todos", {
//     headers: {
//       Authorization: `Bearer ${checkUser}`,
//     },
//   });
//   return {
//     type: "READ",
//     payload: todoData.data,
//   };
// };
