import { createContext, useContext, useReducer, useEffect } from 'react';
import { initialState, cvReducer } from './cvReducer';

const CVContext = createContext();

const STORAGE_KEY = 'cv_builder_data';

export const CVProvider = ({ children }) => {
  const [cvData, dispatch] = useReducer(cvReducer, initialState, (initial) => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initial;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cvData));
  }, [cvData]);

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

  const updateSettings = (data) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: data });
  };

  return (
    <CVContext.Provider value={{ cvData, updateGeneralInfo, addItem, updateItem, deleteItem, updateSettings }}>
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
