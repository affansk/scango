import React, {createContext, useReducer, useContext} from 'react';

const initialState = {
  uuid: null, // Initialize UUID as null
};

const AppContext = createContext();

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_UUID':
      return {...state, uuid: action.payload};
    default:
      return state;
  }
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{state, dispatch}}>
      {children}
    </AppContext.Provider>
  );
};
