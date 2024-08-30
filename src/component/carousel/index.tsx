import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./index.scss";
// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import { handleGET } from "../../utils/api";
type CarouselProps = {
  apiURI: string;
};
export default function Carousel({ apiURI }: CarouselProps) {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await handleGET(apiURI);
      setData(response);
    };
    fetchData();
  }, [apiURI]);
  const sliderItems = [
    {
      imageURL:
        "https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/BanhMi.jpg?v=Lnl1lg",
      href: "/",
    },
    {
      imageURL:
        "https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/DzutDealHuHon.webp?v=Lnl1lg",
      href: "/",
    },
    {
      imageURL:
        "https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/RiceMilk.webp?v=Lnl1lg",
      href: "/",
    },
    {
      imageURL:
        "https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/OtXiemXanh.webp?v=Lnl1lg",
      href: "/",
    },
    {
      imageURL:
        "https://static.kfcvietnam.com.vn/images/content/home/carousel/lg/DinnerP2.webp?v=Lnl1lg",
      href: "/",
    },
  ];
  return (
    <>
      <Swiper
        pagination={true}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
        autoplay={{ delay: 5000 }}
      >
        {sliderItems.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item?.imageURL} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
