"use client";
import Link from "next/link";
// import { Swiper, SwiperSlide } from "swiper/react";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { mainmenu } from "../utility/slice/GetCategoryMenumain";
import basecatagories from "@/utility/config";

import { sliderProps } from "@/utility/sliderProps";
import { Swiper, SwiperSlide } from "swiper/react";

const BrandSlider = () => { 
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(mainmenu());
  }, [dispatch]);

  const { itemCategorymenu, loading, error } = useSelector(
    (state) => state.itemCategorymenu
  );
  return (
    <Swiper {...sliderProps.brandSlider} className="swiper brand-slider">
      <div className="swiper-wrapper">
        {itemCategorymenu.map((item, index) => {
          const imageUrl = `${basecatagories}category/${encodeURIComponent(
            item.icon
          )}`;
          return (
            <SwiperSlide className="swiper-slide">
              <div className="brand-image">
                <img src={imageUrl} alt={item.categoryName} height={100} width={100}/>
              </div>
            </SwiperSlide>
          );
        })}
        {/* <SwiperSlide className="swiper-slide">
          <div className="brand-image">
            <img src="assets/img/brand/02.svg" alt="brand-img" />
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <div className="brand-image">
            <img src="assets/img/brand/03.svg" alt="brand-img" />
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <div className="brand-image">
            <img src="assets/img/brand/04.svg" alt="brand-img" />
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <div className="brand-image">
            <img src="assets/img/brand/05.svg" alt="brand-img" />
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <div className="brand-image">
            <img src="assets/img/brand/06.svg" alt="brand-img" />
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <div className="brand-image">
            <img src="assets/img/brand/01.svg" alt="brand-img" />
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <div className="brand-image">
            <img src="assets/img/brand/02.svg" alt="brand-img" />
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <div className="brand-image">
            <img src="assets/img/brand/03.svg" alt="brand-img" />
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <div className="brand-image">
            <img src="assets/img/brand/04.svg" alt="brand-img" />
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <div className="brand-image">
            <img src="assets/img/brand/05.svg" alt="brand-img" />
          </div>
        </SwiperSlide>
        <SwiperSlide className="swiper-slide">
          <div className="brand-image">
            <img src="assets/img/brand/06.svg" alt="brand-img" />
          </div>
        </SwiperSlide> */}
      </div>
    </Swiper>
  );
};
export default BrandSlider;
