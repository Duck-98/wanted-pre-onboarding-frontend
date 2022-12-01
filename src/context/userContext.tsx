import React, { createContext, Dispatch, useContext, useReducer } from "react";

type ActionProps =
  | { type: "LOGIN"; key: string | null }
  | { type: "LOGOUT"; key: null };
type StateProps = { user: { key: string | null } };
// UsersContext 에서 사용 할 기본 상태
const initialState: StateProps = {
  user: {
    key: null,
  },
};

const reducer = (state: StateProps, action: ActionProps): StateProps => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: {
          key: action.key,
        },
      };
    case "LOGOUT":
      return {
        ...state,
        user: {
          key: null,
        },
      };
    default:
      return state;
  }
};
type UserDispatchProps = Dispatch<ActionProps>;

export const UserStateContext = createContext<StateProps | null>(null);
export const UserDispatchContext = createContext<UserDispatchProps | null>(
  null,
);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

export const useUserState = () => {
  const state = useContext(UserStateContext);
  if (!state) throw new Error("Cannot find UserProvider");
  return state;
};

export const useUserDispatch = () => {
  const dispatch = useContext(UserDispatchContext);
  if (!dispatch) throw new Error("Cannot find UserProvider");
  return dispatch;
};
