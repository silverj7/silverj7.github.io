import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as CarouselStyle from './CarouselStyle.module.scss';
import CarouselTitleComponent from './CarouselTitleComponent';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { CarouselType } from '../../NetflixComponent';

interface CarouselProp {
  title: string; // Carousel 재사용을 위한 title props
  data: CarouselType[];
}

const CarouselRankComponent = (props: CarouselProp) => {
  const { title, data } = props;

  const navigationPrevRef = useRef<HTMLDivElement>(null);
  const navigationNextRef = useRef(null);

  const [realIndex, setRealIndex] = useState(0);

  useEffect(() => {
    if (!navigationPrevRef.current) return;

    if (realIndex === 0) {
      navigationPrevRef.current.style.display = 'none';
    } else {
      navigationPrevRef.current.style.display = 'flex';
    }
  }, [realIndex]);

  return (
    <div className={CarouselStyle.itemWrapper}>
      <CarouselTitleComponent title={title} />
      <div className={CarouselStyle.itemInner}>
        <Swiper
          modules={[Navigation]}
          className={CarouselStyle.swiperWrapper}
          rewind={true}
          spaceBetween={4}
          slidesPerView={2}
          slidesPerGroup={6}
          allowTouchMove={false}
          onActiveIndexChange={(swiper: any) => {
            setRealIndex(swiper.realIndex);
          }}
          navigation={{ prevEl: '#prevBtn', nextEl: '#nextBtn' }}
          breakpoints={{
            1400: {
              spaceBetween: 8,
              slidesPerView: 6,
            },
            1100: {
              spaceBetween: 6,
              slidesPerView: 5,
            },
            800: {
              spaceBetween: 4,
              slidesPerView: 4,
            },
            500: {
              spaceBetween: 4,
              slidesPerView: 3,
            },
          }}
        >
          <>
            <div
              id="prevBtn"
              ref={navigationPrevRef}
              className={CarouselStyle.arrowLeft}
            >
              <FaChevronLeft
                className={CarouselStyle.arrowLeftImg}
                style={{
                  width: '100%',
                  height: '100%',
                  margin: '0 auto',
                  color: '#fff',
                }}
              />
            </div>
            <div
              id="nextBtn"
              ref={navigationNextRef}
              className={CarouselStyle.arrowRight}
            >
              <FaChevronRight
                className={CarouselStyle.arrowRightImg}
                style={{
                  width: '100%',
                  height: '100%',
                  margin: '0 auto',
                  color: '#fff',
                }}
              />
            </div>
          </>
          {data.map((item: any, index: number) => {
            return (
              <SwiperSlide>
                <div className={CarouselStyle.rankItem}>
                  <svg
                    width="50%"
                    height="100%"
                    viewBox="-20 0 70 154"
                    className={CarouselStyle.rankIcon}
                  >
                    <path
                      stroke="#595959"
                      stroke-linejoin="square"
                      stroke-width="4"
                      d={item.rankIconPath}
                      className={CarouselStyle.rankIconPath}
                    ></path>
                  </svg>
                  <img
                    key={`itemBox` + index}
                    src={item.imgSrc}
                    alt={item.title}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default CarouselRankComponent;
