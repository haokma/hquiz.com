import React from 'react';
import Banner from './Banner';
import Footer from './Footer';
import Header from './Header';

interface IPropsLayout {
  children: React.ReactNode;
}

const Layout = ({ children }: IPropsLayout) => {
  return (
    <>
      <Header />
      <Banner />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
