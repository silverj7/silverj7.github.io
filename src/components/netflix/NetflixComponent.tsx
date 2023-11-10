import React, { useEffect, useState } from 'react';
import * as NetflixStyle from './NetflixStyle.module.scss';
import CarouselComponent from './view/carousel/CarouselComponent';
import GnbComponent from './view/gnbmenu/GnbComponent';
import MainMediaComponent from './view/mainMedia/MainMediaComponent';

type Props = {};

const NetFlixComponent = (props: Props) => {
  // scroll 감지 state (GnbComponent용)
  const [isScroll, setIsScroll] = useState(false);

  // scroll 관련 함수  (GnbComponent용)
  const handleScroll = () => {
    // 스크롤이 1px 이상 내려갔을때
    if (window.scrollY > 0) {
      setIsScroll(true);
    } else {
      setIsScroll(false);
    }
  };

  // scroll 관련 hook (GnbComponent용)
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      // dom unMount시 스크롤감지 이벤트 제거
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={NetflixStyle.wrapper}>
      <GnbComponent isScroll={isScroll} />
      <MainMediaComponent />
      <CarouselComponent title="한국이 만든 콘텐츠" />
      <CarouselComponent title="지금 뜨는 콘텐츠" />
      <CarouselComponent title="해외 영화" />
      <CarouselComponent title="애니" />
    </div>
  );
};

export default NetFlixComponent;
