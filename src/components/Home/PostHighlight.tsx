import Link from 'next/link';
import Slider from 'react-slick';
import NextArrow from 'src/components/common/ArrowSlider/NextArrow';
import PrevArrow from 'src/components/common/ArrowSlider/PreveArrow';
import data from 'src/data/blog.json';
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <NextArrow newClass="top" />,
  prevArrow: <PrevArrow newClass="top" />,
  responsive: [
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1100,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
const PostHightLight = () => {
  return (
    <div className="post">
      <div className="topic-highlight-heading">
        <h2>Bài viết nổi bật</h2>
        <Link href="https://www.kmait.tk/">
          <a>
            <span>Xem tất cả</span>
            <i className="bx bx-chevron-right"></i>
          </a>
        </Link>
      </div>
      <div className="post-slider">
        <Slider {...settings}>
          {data.blog.map((item, index) => {
            return (
              <div className="post-item" key={index}>
                <div>
                  <div className="post-thumbnail">
                    <img src={item.image} alt="" />
                  </div>
                  <div className="post-content">
                    <h3 className="post-title">
                      <Link href="https://www.kmait.tk/">{item.title}</Link>
                    </h3>
                    <div className="post-view">
                      <div>
                        <svg
                          style={{ width: '18px' }}
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="users"
                          className="svg-inline--fa fa-users fa-w-20 "
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 640 512"
                        >
                          <path
                            fill="currentColor"
                            d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"
                          ></path>
                        </svg>
                        <span>{item.view}</span>
                      </div>
                      <div>
                        <span>{item.createdAt}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default PostHightLight;
