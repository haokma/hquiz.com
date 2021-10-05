import type { NextPage } from 'next';
import Link from 'next/link';
import { FacebookSvg, YoutobeSvg } from 'src/components/common/Svg';

const Footer: NextPage = () => {
  return (
    <div className="footer">
      <div className="footer-left">
        <img
          src="https://res.cloudinary.com/nguyenhao/image/upload/v1633446187/Tracnghiem/416613070518cc469509_oftg5t.jpg"
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
