import type { NextPage } from 'next';
import Link from 'next/link';
import Slider from 'react-slick';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
const Banner: NextPage = () => {
  return (
    <div className="banner">
      <Slider {...settings}>
        <div className="banner-item one">
          <div>
            <div className="banner-left">
              <h1 className="banner-title">Trắc nghiệm THPT</h1>
              <p className="banner-desc">
                Tổng hợp đề thi trắc nghiệm online THPT QG của các môn Toán, Tiếng Anh, Vật lý, Hóa
                học, Sinh học, Địa lý, Lịch sử, GDCD kèm đáp án và lời giải chi tiết.
              </p>
              <div className="banner-button">
                <Link href="/">Thi ngay</Link>
              </div>
            </div>
            <div className="banner-right">
              <img src="https://cdn.fullstack.edu.vn/f8-learning/banners/Banner_04_2.png" alt="" />
            </div>
          </div>
        </div>
        <div className="banner-item two">
          <div>
            <div className="banner-left">
              <h1 className="banner-title">Blog Về KMA</h1>
              <p className="banner-desc">
                Chia Sẻ IT là blog về công nghệ thông tin, tin tức công nghệ, máy tính, thủ thuật
                IT, kiến thức tin học, kiếm tiền trên mạng, kiếm tiền online, thủ thuật ...
              </p>
              <div className="banner-button">
                <Link href="/">Thi ngay</Link>
              </div>
            </div>
            <div className="banner-right">
              <img src="https://cdn.fullstack.edu.vn/f8-learning/banners/Banner_01_2.png" alt="" />
            </div>
          </div>
        </div>
        <div className="banner-item three">
          <div>
            <div className="banner-left">
              <h1 className="banner-title">Shop Giày</h1>
              <p className="banner-desc">
                Chính hãng 100% - Ship COD toàn quốc chỉ - Mẫu mã đa dạng - Đổi trả miễn phí 15
                ngày. Trả góp 0% - Miễn phí ship nội thành - Bảo hành chính hãng 1 năm.
              </p>
              <div className="banner-button">
                <Link href="/">Thi ngay</Link>
              </div>
            </div>
            <div className="banner-right">
              <img src="https://cdn.fullstack.edu.vn/f8-learning/banners/Banner_04_2.png" alt="" />
            </div>
          </div>
        </div>
      </Slider>
      {/* <div className="container">
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
      </div> */}
    </div>
  );
};

export default Banner;
