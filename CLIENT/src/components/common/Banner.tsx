import type { NextPage } from 'next';
import Link from 'next/link';
import Slider from 'react-slick';

import data from '../../data/banner.json';

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
