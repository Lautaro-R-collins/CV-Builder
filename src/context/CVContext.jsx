import { createContext, useContext, useReducer } from 'react';
import { initialState, cvReducer } from './cvReducer';

const CVContext = createContext();

export const CVProvider = ({ children }) => {
  const [cvData, dispatch] = useReducer(cvReducer, initialState);

  const updateGeneralInfo = (data) => {
    dispatch({ type: 'UPDATE_GENERAL_INFO', payload: data });
  };

  const addItem = (section, item) => {
    dispatch({ type: 'ADD_ITEM', payload: { section, item } });
  };

  const updateItem = (section, id, item) => {
    dispatch({ type: 'UPDATE_ITEM', payload: { section, id, item } });
  };

  const deleteItem = (section, id) => {
    dispatch({ type: 'DELETE_ITEM', payload: { section, id } });
  };

  return (
    <CVContext.Provider value={{ cvData, updateGeneralInfo, addItem, updateItem, deleteItem }}>
      {children}
    </CVContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useCV = () => {
  const context = useContext(CVContext);
  if (!context) {
    throw new Error('useCV must be used within a CVProvider');
  }
  return context;
};
