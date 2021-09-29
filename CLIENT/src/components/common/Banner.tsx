import Link from 'next/link';
import Slider from 'react-slick';
import data from '../../data/banner.json';
import SampleNextArrow from '../arrowSlider/sampleNextArrow';
import SamplePrevArrow from '../arrowSlider/samplePreveArrow';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};
const Banner = () => {
  return (
    <div className="banner">
      <Slider {...settings}>
        {data.banner.map((item, index) => {
          return (
            <div className={`${item.className}`} key={index}>
              <div>
                <div className="banner-left">
                  <h1 className="banner-title">{item.title}</h1>
                  <p className="banner-desc">{item.description}</p>
                  <div className="banner-button">
                    <Link href={item.link}>{item.button}</Link>
                  </div>
                </div>
                <div className="banner-right">
                  <img src={item.image} alt="" />
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Banner;
