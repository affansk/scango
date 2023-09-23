import React, {createContext, useReducer, useContext} from 'react';

const initialState = {
  uuid: null, // Initialize UUID as null
  qrCode: undefined,
};

const AppContext = createContext();

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_UUID':
      return {...state, uuid: action.payload};
    case 'SET_QRCODE':
      return {...state, qrCode: action.payload};
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
