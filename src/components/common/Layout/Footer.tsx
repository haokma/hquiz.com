import type { NextPage } from 'next';
import Link from 'next/link';
import { FacebookSvg, YoutobeSvg } from 'src/components/common/Svg';

const Footer: NextPage = () => {
  return (
    <div className="footer">
      <div className="footer-left">
        <img
          src="https://fullstack.edu.vn/assets/icon/f8_icon.png"
          alt=""
          className="footer-logo"
        />
      </div>
      <div className="footer-right">
        <span>Liên hệ với chúng tôi</span>
        <Link href="https://www.facebook.com/haoham137/">
          <a>
            <FacebookSvg />
          </a>
        </Link>
        <Link href="/">
          <a>
            <YoutobeSvg />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
