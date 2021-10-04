import React, { useState } from 'react';
import Footer from 'src/components/common/Layout/Footer';
import Header from 'src/components/common/Layout/Header';
import MenuMobile from 'src/components/common/Layout/MenuMobile';
import Sidebar from 'src/components/common/Layout/Sidebar';
import { getLocalStorage } from 'src/utils';

interface IPropsLayout {
  children: React.ReactNode;
}

const Layout = ({ children }: IPropsLayout) => {
  const [isActive, setIsActive] = useState(false);

  const [user, setUser] = useState(getLocalStorage('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser('');
  };
  return (
    <>
      <Header
        setIsActive={setIsActive}
        handleLogout={handleLogout}
        user={user}
      />
      <div className="home">
        <Sidebar />
        <div className="content">{children}</div>
        <Footer />
        <MenuMobile
          isActive={isActive}
          setIsActive={setIsActive}
          user={user}
          handleLogout={handleLogout}
        />
      </div>
    </>
  );
};

export default Layout;
