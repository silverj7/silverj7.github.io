import React, { useEffect, useRef, useState } from 'react';
import * as CarouselStyle from './CarouselStyle.module.scss';
import CarouselTitleComponent from './CarouselTitleComponent';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { BsHandThumbsUp, BsPlusLg } from 'react-icons/bs';
import { ImPlay3 } from 'react-icons/im';
import { MdKeyboardArrowDown } from 'react-icons/md';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { CarouselType } from '../../NetflixComponent';
import Modal from 'react-modal';

interface CarouselProp {
  title: string; // Carousel 재사용을 위한 title props
  data: CarouselType[];
}

const CarouselComponent = (props: CarouselProp) => {
  const { title, data } = props;
  const navigationPrevRef = useRef<HTMLDivElement>(null);
  const navigationNextRef = useRef(null);
  const imgRef = useRef<HTMLImageElement[]>([]);

  const [realIndex, setRealIndex] = useState(0);
  const [mouseEnterIndex, setMouseEnterIndex] = useState(0);

  // modal 좌표
  const [isX, setIsX] = useState(0);
  const [isY, setIsY] = useState(0);

  // modal 넓이
  const [imgW, setImgW] = useState(0);

  useEffect(() => {
    if (!navigationPrevRef.current) return;

    if (realIndex === 0) {
      navigationPrevRef.current.style.display = 'none';
    } else {
      navigationPrevRef.current.style.display = 'flex';
    }
  }, [realIndex]);

  // 좌표
  const getPosition = (index: number) => {
    if (imgRef.current) {
      const x = imgRef.current[index].getBoundingClientRect().top;
      setIsX(x);

      const y = imgRef.current[index].getBoundingClientRect().left;
      setIsY(y);

      const w = imgRef.current[index].offsetWidth;
      setImgW(w);
    }
  };

  // 이미지 마우스 이벤트 => 좌표값, 넓이값 return
  const onMouseEnter = (index: number) => {
    getPosition(index);
  };

  const customModalStyles: ReactModal.Styles = {
    overlay: {
      top: isX,
      left: isY,
      width: '100vw',
      maxWidth: imgW + 80,
      height: 'auto',
      background: 'transparent',
      transform: 'translate(-10%, -10%)',
      zIndex: '100',
      overflow: 'hidden',
    },

    content: {
      position: 'relative',
      inset: 0,
      padding: 0,
      background: 'transparent',
      border: 0,
      borderRadius: '10px',
      boxShadow: '4px 12px 12px rgba(0, 0, 0, 0.25)',
    },
  };

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

          {data.map((item: CarouselType, index: number) => {
            const [modalIsOpen, setModalIsOpen] = useState(false);

            return (
              <SwiperSlide
                id={`${index}`}
                style={{
                  cursor: 'pointer',
                }}
                onMouseOver={() => {
                  setTimeout(() => {
                    setModalIsOpen(true);
                  }, 500);
                }}
                onMouseLeave={(e: any) => {
                  setTimeout(() => {
                    setModalIsOpen(false);
                  }, 100);
                }}
              >
                <div>
                  <img
                    onMouseEnter={() => {
                      onMouseEnter(index), setMouseEnterIndex(index);
                    }}
                    ref={(itself: any) => (imgRef.current[index] = itself)}
                    id="modalImg"
                    key={`itemBox` + index}
                    src={item.imgSrc}
                    alt={item.title}
                  />

                  <Modal isOpen={modalIsOpen} style={customModalStyles}>
                    <div className={CarouselStyle.modalWrap}>
                      <div className={CarouselStyle.modalImgWrap}>
                        <img
                          className={CarouselStyle.modalImg}
                          src={item.imgSrc}
                          alt="scale"
                        />
                      </div>
                      <div className={CarouselStyle.modalInner}>
                        <div className={CarouselStyle.utilArea}>
                          <button
                            className={`${CarouselStyle.btnUtil} ${CarouselStyle.Play}`}
                          >
                            <ImPlay3 />
                          </button>
                          <button
                            className={`${CarouselStyle.btnUtil} ${CarouselStyle.Favorite}`}
                          >
                            <BsPlusLg />
                          </button>
                          <button
                            className={`${CarouselStyle.btnUtil} ${CarouselStyle.Grade}`}
                          >
                            <BsHandThumbsUp />
                          </button>
                          <button
                            className={`${CarouselStyle.btnUtil} ${CarouselStyle.More}`}
                          >
                            <MdKeyboardArrowDown />
                          </button>
                        </div>
                        <div className={CarouselStyle.mediaInfo}>
                          <strong className={CarouselStyle.title}>
                            무인도의 디바
                          </strong>
                          <div className={CarouselStyle.currentInfo}>
                            <div className={CarouselStyle.progress}>
                              <span
                                className={CarouselStyle.progressActive}
                                style={{
                                  width: '55%',
                                }}
                              ></span>
                            </div>
                            <span className={CarouselStyle.playInfo}>
                              총 90분 중 51분
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Modal>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default CarouselComponent;
