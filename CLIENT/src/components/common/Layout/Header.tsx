import Link from 'next/link';
import { Dispatch, useEffect, useState } from 'react';
import { USER_RESPONSE } from 'src/interfaces';

interface PROPS {
  setIsActive: Dispatch<boolean>;
  handleLogout: () => void;
  user: USER_RESPONSE;
}

const Header = (props: PROPS) => {
  const { setIsActive, user, handleLogout } = props;
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    if (window !== undefined) {
      window.addEventListener('click', (event) => {
        setIsModal(false);
        event.stopPropagation();
      });
    }
  }, []);

  return (
    <div className="header">
      <div className="container-fluid">
        <div className="header-content">
          <div
            className="header-toggle"
            onClick={() => setIsActive(true)}
          >
            <i className="bx bx-menu"></i>
          </div>
          <div className="header-left">
            <div className="header-logo">
              <Link href="/">
                <img
                  src="https://fullstack.edu.vn/assets/icon/f8_icon.png"
                  alt=""
                />
              </Link>
            </div>
          </div>
          <div className="header-search">
            <svg
              style={{ width: '14px' }}
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="search"
              className="svg-inline--fa fa-search fa-w-16 "
              role="img"
              xmlns="http://wheww.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
              ></path>
            </svg>
            <input type="text" placeholder="Tìm kiếm đề thi" />
          </div>
          <div className="header-right">
            {/* {!user && (
              <>
                <div className="header-login">
                  <Link href="/authentication/login">
                    <a>Đăng nhập/Đăng ký</a>
                  </Link>
                </div>
              </>
            )} */}
            <div className="header-quiz">
              <Link href="/de-thi">
                <a>Thi nhanh</a>
              </Link>
            </div>
            {user && (
              <>
                <div className="header-user">
                  <img
                    onClick={(event) => {
                      setIsModal(true);
                      event.stopPropagation();
                    }}
                    src="https://avatar-redirect.appspot.com/google/118403421965346863995?size=400"
                    alt={user.username}
                  />
                  <div
                    className={
                      isModal
                        ? 'header-user-modal active'
                        : 'header-user-modal'
                    }
                    onClick={(event) => event.stopPropagation()}
                  >
                    <div className="user-modal">
                      <div className="user-modal-heading">
                        <img
                          src="https://avatar-redirect.appspot.com/google/118403421965346863995?size=400"
                          alt={user.username}
                        />
                        <div>
                          <p>{user.username}</p>
                          <span>@nguyenhao</span>
                        </div>
                      </div>
                      <hr />
                      <ul className="user-modal-list">
                        <li>
                          <Link href="/de-thi">
                            <a>Lịch sử thi</a>
                          </Link>
                          <Link href="/de-thi">
                            <a>Bài viết của tôi</a>
                          </Link>
                        </li>
                        <hr />
                        <li
                          onClick={() => {
                            handleLogout();
                            setIsModal(false);
                          }}
                        >
                          <span>Đăng xuất</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
