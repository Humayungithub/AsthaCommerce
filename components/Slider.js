import React from 'react';
import Image from 'next/image';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from 'swiper';
// Import Swiper styles
import 'swiper/css';

function Slider() {
  SwiperCore.use(Autoplay);

  return (
    <div className="container flex justify-center space-x-7 py-20 px-1">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={10}
        navigation={true}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 2000 }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <Image
            src="/images/slider-images/s-image1.png"
            alt="Master Card Icon"
            width={1600}
            height={412}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/slider-images/s-image2.png"
            alt="Master Card Icon"
            width={1600}
            height={412}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/slider-images/s-image3.png"
            alt="Master Card Icon"
            width={1600}
            height={412}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src="/images/slider-images/s-image4.png"
            alt="Master Card Icon"
            width={1600}
            height={412}
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Slider;
