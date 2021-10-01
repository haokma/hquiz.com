import Link from 'next/link';
import Slider from 'react-slick';
import { Topic } from '../../interfaces';
import SampleNextArrow from '../arrowSlider/sampleNextArrow';
import SamplePrevArrow from '../arrowSlider/samplePreveArrow';
import { UserSvg } from '../svg';

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow newClass="top" />,
  prevArrow: <SamplePrevArrow newClass="top" />,
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

interface PROPS {
  topicList: Topic[];
}
const TopicHighlight = (props: PROPS) => {
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
          {topicList.map((item: Topic, index: number) => {
            return (
              <div className="topic-highlight-item" key={index}>
                <div>
                  <div className="topic-highlight-thumbnail">
                    <img src={item.image} alt="" />
                  </div>
                  <div className="topic-highlight-content">
                    <h3 className="topic-highlight-title">
                      <Link href={`de-thi/${item.slug}`}>{item.name}</Link>
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
