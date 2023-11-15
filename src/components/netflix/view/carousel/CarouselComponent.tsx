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

  const [active, setActive] = useState(false);
  const [remove, setRemove] = useState(false);

  const [isX, setIsX] = useState(0);
  const [isY, setIsY] = useState(0);

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
      const x = imgRef.current[index].getBoundingClientRect().left;
      setIsX(x);

      const y = imgRef.current[index].getBoundingClientRect().top;
      setIsY(y);
    }
  };

  // 마우스이벤트
  const onMouseEnter = (index: number) => {
    getPosition(index);

    setTimeout(() => {
      setActive(true);
      setRemove(false);
    }, 1000);
  };

  const onMouseLeave = () => {
    setTimeout(() => {
      setActive(false);
    }, 1000);
  };

  const customModalStyles: ReactModal.Styles = {
    overlay: {
      backgroundColor: ' rgba(0, 0, 0, 0)',
      width: '30vw',
      height: '100%',
      zIndex: '100',
      position: 'fixed',
      top: '42%',
      left: '58%',
    },
    content: {
      width: '30vw',
      height: '100%',
      zIndex: '100',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      borderRadius: '10px',
      boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
      backgroundColor: 'white',
      justifyContent: 'center',
      overflow: 'auto',
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
                  // openModal(item.id);
                  setModalIsOpen(true);
                }}
                onMouseLeave={(e: any) => {
                  // setModalIsOpen(false);
                  // if (Number(e.target.id) === item.id) {
                  //   closeModal();
                  // }
                }}
              >
                <div>
                  <img
                    onMouseEnter={() => {
                      onMouseEnter(index), setMouseEnterIndex(index);
                    }}
                    onMouseLeave={onMouseLeave}
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
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '42px',
                            height: '42px',
                            margin: '0 auto',
                            padding: '0.3rem 0.2rem 0.3rem 0.4rem',
                            color: '#000',
                            backgroundColor: '#fff',
                            borderRadius: '50%',
                          }}
                        >
                          <ImPlay3
                            style={{
                              width: '30px',
                              height: '30px',
                              margin: '0 auto',
                              color: '#000',
                            }}
                          />
                        </div>
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '42px',
                            height: '42px',
                            margin: '0 auto',
                            padding: '0.3rem',
                            border: 'solid 2px #ddd',
                            borderRadius: '50%',
                          }}
                        >
                          <BsPlusLg
                            style={{
                              width: '26px',
                              height: '26px',
                              margin: '0 auto',
                              color: '#fff',
                            }}
                          />
                        </div>
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '42px',
                            height: '42px',
                            margin: '0 auto',
                            padding: '0.3rem',
                            border: 'solid 2px #ddd',
                            borderRadius: '50%',
                          }}
                        >
                          <BsHandThumbsUp
                            style={{
                              width: '26px',
                              height: '26px',
                              margin: '0 auto',
                              color: '#fff',
                            }}
                          />
                        </div>
                        <div
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '42px',
                            height: '42px',
                            margin: '0 auto',
                            padding: '0.3rem',
                            color: '#fff',
                            border: 'solid 2px #ddd',
                            borderRadius: '50%',
                          }}
                        >
                          <MdKeyboardArrowDown
                            style={{
                              width: '30px',
                              height: '30px',
                              margin: '0 auto',
                              color: '#fff',
                            }}
                          />
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
