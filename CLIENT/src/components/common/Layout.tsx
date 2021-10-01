import React, { useState } from 'react';
import Footer from 'src/components/common/Footer';
import Header from 'src/components/common/Header';
import MenuMobile from 'src/components/common/MenuMobile';
import Sidebar from 'src/components/common/Sidebar';

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
