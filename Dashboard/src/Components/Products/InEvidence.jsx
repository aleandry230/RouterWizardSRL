import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import ProductCard from "./ProductCard";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Button,
} from "@nextui-org/react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import AddInEvidence from "./AddInEvidence";
import axios from "axios";
import { API_URL } from "../../API/API";

export default function InEvidence() {
  const [swiperPosition, setSwiperPosition] = useState("start");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(API_URL + "Products/GetAllInEvidence").then((res) => {
      setProducts(res.data);
    });
  }, []);

  const handleSlideChange = (swiper) => {
    if (swiper.activeIndex === 0) {
      setSwiperPosition("start");
    } else if (swiper.isEnd === true) {
      setSwiperPosition("end");
    } else {
      setSwiperPosition(swiper.activeIndex);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <h2 className=" text-4xl font-bold text-center sm:text-start">
        Prodotti in evidenza{" "}
        <div className="text-center py-5 sm:text-end">
          <AddInEvidence />
        </div>
      </h2>
      <div>
        {products.length > 4 && (
          <Button
            isIconOnly
            radius="lg"
            color="primary"
            size="sm"
            className={`arrow-left arrow hidden md:flex ${
              swiperPosition === 0 ? "disabled" : ""
            }`}
            onClick={() => setSwiperPosition(swiperPosition - 1)}
            isDisabled={swiperPosition === "start"}
          >
            <ArrowBackIosNewIcon sx={{ fontSize: 20 }} />
          </Button>
        )}
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
        navigation={{
          nextEl: ".arrow-right",
          prevEl: ".arrow-left",
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay, Navigation]}
        className="h-auto w-full"
        onSlideChange={(swiper) => handleSlideChange(swiper)}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="w-auto flex justify-center">
            <ProductCard data={product} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div>
        {products.length > 4 && (
          <Button
            isIconOnly
            radius="lg"
            color="primary"
            size="sm"
            className={`arrow-right arrow hidden md:flex ${
              swiperPosition === 4 ? "disabled" : ""
            }`}
            onClick={() => setSwiperPosition(swiperPosition + 1)}
            isDisabled={swiperPosition === "end"}
          >
            <ArrowForwardIosIcon sx={{ fontSize: 20 }} />
          </Button>
        )}
      </div>
    </div>
  );
}
