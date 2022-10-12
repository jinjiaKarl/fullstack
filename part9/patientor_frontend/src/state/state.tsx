import React, { createContext, useContext, useReducer } from "react";
import { Patient } from "../types";

import { Action } from "./reducer";

// useContext, useReducer的使用？？

export type State = {
  patients: { [id: string]: Patient };
};

const initialState: State = {
  patients: {}
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider = ({
  reducer,
  children
}: StateProviderProps) => {
  // 创建一个 state 和 dispatch 的组合
  const [state, dispatch] = useReducer(reducer, initialState);
  // The provider makes the state and the dispatch functions available in all of the components.
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
