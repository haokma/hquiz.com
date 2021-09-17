import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import data from '../../data/category.json';

const SCROLL = 150;

const Header: NextPage = () => {
  const [toggle, setToggle] = useState(false);
  const [active, setActive] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > SCROLL) {
        setActive(true);
      } else if (window.scrollY < SCROLL) {
        setActive(false);
      }
    });
  }, []);
  return (
    <div className={active ? 'header active' : 'header'}>
      <div className="container-fluid">
        <div className="header-content">
          <div className="header-toggle" onClick={() => setToggle(!toggle)}>
            <i className="bx bx-menu"></i>
          </div>
          <div className="header-left">
            <div className="header-logo">
              <Link href="/">
                <img src="https://kquiz.vn/img/kquiz.png" alt="" />
              </Link>
            </div>
            <div className={toggle ? 'header-navbar active' : 'header-navbar'}>
              <ul className="header-list">
                {data.category.map((item, index) => (
                  <li className="header-item" key={index}>
                    <Link href={`/${item.slug}`}>{item.title}</Link>
                  </li>
                ))}
              </ul>
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
