import { NextPage } from 'next';
import { useEffect, useState } from 'react';

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
              <img src="https://kquiz.vn/img/kquiz.png" alt="" />
            </div>
            <div className={toggle ? 'header-navbar active' : 'header-navbar'}>
              <ul className="header-list">
                <li className="header-item">Luyện tập</li>
                <li className="header-item">Đề thi</li>
                <li className="header-item">Kết quả thi</li>
                <li className="header-item">Bảng xếp hạng</li>
                <li className="header-item">Bài viết</li>
                <li className="header-item">Về KMA</li>
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
