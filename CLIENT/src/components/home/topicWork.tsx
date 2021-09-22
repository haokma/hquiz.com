import { NextPage } from 'next';

const TopicWork: NextPage = () => {
  return (
    <div className="work">
      <h2 className="work-title">Cách sử dụng Kquiz</h2>
      <p className="work-desc">
        Nếu đây là lần đầu truy cập, đừng bối rối! Kquiz cực kỳ đơn giản và dễ sử dụng chỉ với vài
        thao tác
      </p>
      <div className="container">
        <div className="row">
          <div className="col-xl-4 col-lg-6 col-md-6">
            <div className="work-item">
              <div className="work-item-img">
                <img src="https://s.tracnghiem.net/assets/images/home/smart1.png" alt="" />
              </div>
              <h3 className="work-item-title">Tạo tài khoản đăng nhập</h3>
              <p className="work-item-desc">
                Bạn có thể tự tạo riêng cho mình một tài khoản mới, hoặc liên kết tài khoản Nếu đã
                tham gia Howkteam.com
              </p>
            </div>
          </div>

          <div className="col-xl-4 col-lg-6 col-md-6">
            <div className="work-item">
              <div className="work-item-img">
                <img src="https://s.tracnghiem.net/assets/images/home/smart2.png" alt="" />
              </div>
              <h3 className="work-item-title">Tìm kiếm đề / thi nhanh</h3>
              <p className="work-item-desc">
                Hquiz cung cấp cho bạn một ngân hàng đề thi trắc nghiệm đồ sộ mà bạn có thể nhanh
                chóng thử sức với bất kỳ bộ đề nào hứng thú
              </p>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6 col-md-6">
            <div className="work-item">
              <div className="work-item-img">
                <img src="https://s.tracnghiem.net/assets/images/home/smart3.png" alt="" />
              </div>
              <h3 className="work-item-title">Thử thách bản thân</h3>
              <p className="work-item-desc">
                Thử thách cùng bạn bè, cộng đồng là cách cực kỳ hữu hiệu để nâng cao skills của bạn
                ngay hôm nay.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TopicWork;
