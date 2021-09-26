import React, { useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import MenuMobile from './MenuMobile';
import Sidebar from './Sidebar';

interface IPropsLayout {
  children: React.ReactNode;
}

const Layout = ({ children }: IPropsLayout) => {
  const [isActive, setIsActive] = useState(false);
  return (
    <>
      <Header setIsActive={setIsActive} />
      <div className="home">
        <Sidebar />
        <div className="content">{children}</div>
        <Footer />
        <MenuMobile isActive={isActive} setIsActive={setIsActive} />
      </div>
    </>
  );
};

export default Layout;
