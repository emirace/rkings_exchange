import React, { ReactNode, createContext, useState, useContext } from 'react';

type PageContextType = {
  scrollY: number;
  setScrollY: (value: number) => void;
};

interface Props {
  children?: ReactNode;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

export const PageProvider: React.FC<Props> = ({ children }) => {
  const [scrollY, setScrollY] = useState<number>(0);

  return (
    <PageContext.Provider value={{ scrollY, setScrollY }}>
      {children}
    </PageContext.Provider>
  );
};

const usePage = () => {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error('usePage must be used within a PageProvider');
  }
  return context;
};

export default usePage;
