import React, { FC, createContext, useState, ReactNode } from 'react';

//https://medium.com/@viraj.vimu/react-context-api-vs-zustand-state-manager-98ca9ac76904
//https://stackoverflow.com/questions/53335907/using-react-context-with-react-hooks-in-typescript
//https://stackoverflow.com/questions/66640086/react-usecontext-ts-error-property-does-not-exist-on
//https://stackoverflow.com/questions/67886562/the-expected-type-comes-from-property-value-which-is-declared-here-on-type-in

//BUENO https://stackoverflow.com/questions/66635673/usestate-and-usecontext-in-typescript

type storeContextProvider = {
  children?: ReactNode;
};

export const SearchContext = createContext<
  [query: string, setQuery: React.Dispatch<React.SetStateAction<string>>]
>({} as any);

export const SearchContextProvider: FC<storeContextProvider> = ({ children }) => {
  const [query, setQuery] = useState('');
  return (
    <SearchContext.Provider value={[query, setQuery]}>{children}</SearchContext.Provider>
  );
};
