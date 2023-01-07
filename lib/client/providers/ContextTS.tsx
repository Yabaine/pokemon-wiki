import React, { FC, createContext, useContext, useState, ReactNode } from 'react';

//https://medium.com/@viraj.vimu/react-context-api-vs-zustand-state-manager-98ca9ac76904
//https://stackoverflow.com/questions/53335907/using-react-context-with-react-hooks-in-typescript
//https://stackoverflow.com/questions/66640086/react-usecontext-ts-error-property-does-not-exist-on
//https://stackoverflow.com/questions/67886562/the-expected-type-comes-from-property-value-which-is-declared-here-on-type-in

type Query = {
  query: string | '';
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

type storeContextProvider = {
  children?: ReactNode;
};

//useStore devuelve type Query

const useStore = () => {
  const [query, setQuery] = useState('');
  return {
    query,
    setQuery,
  };
};

//Context del tipo React.Context<Query>
const Context = createContext<Query>(useStore());

const StoreContextProvider: FC<storeContextProvider> = ({ children }) => {
  return <Context.Provider value={useStore()}>{children}</Context.Provider>;
};

/* export const useStoreContext = () => useContext(Context); */

export default StoreContextProvider;
