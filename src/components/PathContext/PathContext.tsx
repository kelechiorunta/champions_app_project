import React from 'react';
import { ContextPath } from './contextPath';
import { useState } from 'react';

export type pathNameType = '/' | '/products' | '/orders';
export type PathContextType = {
  pathname: pathNameType | string;
  changePath: (path: pathNameType | string) => void;
};

export default function PathContext({ children }: { children: React.ReactNode }) {
  const [pathname, setPathName] = useState<pathNameType | string>('/');

  //   useEffect(() => {
  const changePath = (name: pathNameType | string) => {
    setPathName(name);
  };
  //   }, [pathname]);
  return <ContextPath.Provider value={{ pathname, changePath }}>{children}</ContextPath.Provider>;
}
