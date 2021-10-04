import Link from 'next/link';
import Slider from 'react-slick';
import NextArrow from 'src/components/common/ArrowSlider/NextArrow';
import PrevArrow from 'src/components/common/ArrowSlider/PreveArrow';
import { TOPIC } from 'src/interfaces';
import { UserSvg } from '../common/Svg';

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

interface TOPICHIGHLIGHTPROPS {
  topicList: TOPIC[];
}
const TopicHighlight = (props: TOPICHIGHLIGHTPROPS) => {
  const { topicList } = props;
  return (
    <div className="topic-highlight">
      <div className="topic-highlight-heading">
        <h2>Đề thi nổi bật</h2>
        <Link href="/de-thi">
          <a>
            <span>Xem tất cả</span>
            <i className="bx bx-chevron-right"></i>
          </a>
        </Link>
      </div>
      <div className="slider">
        <Slider {...settings}>
          {topicList.map((item: TOPIC, index: number) => {
            return (
              <div className="topic-highlight-item" key={index}>
                <div>
                  <div className="topic-highlight-thumbnail">
                    <img src={item.image} alt="" />
                  </div>
                  <div className="topic-highlight-content">
                    <h3 className="topic-highlight-title">
                      <Link href={`/de-thi/${item.slug}`}>{item.name}</Link>
                    </h3>
                    <div className="topic-highlight-view">
                      <UserSvg />
                      <span>{item.views}</span>
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

export default TopicHighlight;
