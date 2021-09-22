import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import data from '../../data/category.json';

const SCROLL = 150;
interface PROPS {
  setIsActive: any;
}

const Header: NextPage<PROPS> = (props: PROPS) => {
  const { setIsActive } = props;
  return (
    <div className="header">
      <div className="container-fluid">
        <div className="header-content">
          <div className="header-toggle" onClick={() => setIsActive(true)}>
            <i className="bx bx-menu"></i>
          </div>
          <div className="header-left">
            <div className="header-logo">
              <Link href="/">
                <img src="https://fullstack.edu.vn/assets/icon/f8_icon.png" alt="" />
              </Link>
            </div>
          </div>
          <div className="header-right">
            <div className="header-login">
              <a href="">Đăng nhập/Đăng ký</a>
            </div>
            <div className="header-quiz">
              <a href="">Thi nhanh</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
