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
      <div className="home">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
