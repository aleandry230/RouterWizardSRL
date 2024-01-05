import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import { Button } from "@nextui-org/react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { API_URL } from "../../API/API";

export default function Carousel({ data }) {
  return (
    <div className="flex flex-row justify-center items-center md:h-full gap-5">
      <Button
        isIconOnly
        radius="lg"
        color="primary"
        size="sm"
        className="arrow-left arrow"
      >
        <ArrowBackIosNewIcon sx={{ fontSize: 20 }} />
      </Button>

      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={{
          nextEl: ".arrow-right",
          prevEl: ".arrow-left",
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay, Navigation]}
        className="w-full h-full max-h-"
        loop={true}
        autoHeight={true}
      >
        {data.map((data) => (
          <SwiperSlide
            className="w-full h-full flex justify-center"
            key={data.path}
          >
            <img
              src={API_URL + "/uploads/" + data.path}
              alt=""
              className="w-full h-full object-contain max-h-screen"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div>
        <Button
          isIconOnly
          radius="lg"
          color="primary"
          size="sm"
          className="arrow-right arrow"
        >
          <ArrowForwardIosIcon sx={{ fontSize: 20 }} />
        </Button>
      </div>
    </div>
  );
}
