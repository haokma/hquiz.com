import type { NextPage } from 'next';
import Link from 'next/link';

const Banner: NextPage = () => {
  return (
    <div className="banner">
      <div className="container">
        <div className="row">
          <div className="col-xl-6">
            <div className="banner-content">
              <h1 className="banner-title">
                Rèn luyện hơn <strong>937,273+</strong> câu trắc nghiệm dành riêng cho bạn
              </h1>
              <p className="banner-desc">
                Ngân hàng đề thi trắc nghiệm đa dạng, dành riêng cho cộng đồng lập trình từ cơ bản
                đến nâng cao. Cùng Kquiz: Luyện tập, thử thách, không ngại khó!
              </p>
              <div className="banner-button">
                <Link href="/">Thi nhanh</Link>
              </div>
            </div>
          </div>
          <div className="col-xl-6"></div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
