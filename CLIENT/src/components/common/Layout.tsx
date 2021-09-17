import React from 'react';
import Footer from './Footer';
import Header from './Header';

interface IPropsLayout {
  children: React.ReactNode;
}

const Layout = ({ children }: IPropsLayout) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
