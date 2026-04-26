"use client";
import { sliderProps } from "@/utility/sliderProps";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { mainmenu } from "../utility/slice/GetCategoryMenumain";
import basecatagories from "@/utility/config";
import Loader from "./Loader";

const FoodSlider = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(mainmenu());
  }, [dispatch]);

  const { itemCategorymenu, loading, error } = useSelector(
    (state) => state.itemCategorymenu
  );
  return (
    <section className="food-category-section fix section-padding section-bg">
      {/* {loading && <Loader />} */}
      <div className="tomato-shape">
        <img src="assets/img/shape/tomato-shape.png" alt="shape-img" />
      </div>
      <div className="burger-shape-2">
        <img src="assets/img/shape/burger-shape-2.png" alt="shape-img" />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-7 col-9">
            <div className="section-title">
              <span className="wow fadeInUp">crispy, every bite taste</span>
              <h2 className="wow fadeInUp" data-wow-delay=".3s">
                Popular Food Categorys
              </h2>
            </div>
          </div>
          <div
            className="col-md-5 ps-0 col-3 text-end wow fadeInUp"
            data-wow-delay=".5s"
          >
            <div className="array-button">
              <button className="array-prev">
                <i className="far fa-long-arrow-left" />
              </button>
              <button className="array-next">
                <i className="far fa-long-arrow-right" />
              </button>
            </div>
          </div>
        </div>

        <Swiper
          {...sliderProps.foodCatagorySlider}
          className="swiper food-catagory-slider"
        >
          <div className="swiper-wrapper">
            {itemCategorymenu.map((item, index) => {
              const imageUrl = `${basecatagories}category/${encodeURIComponent(
                item.image
              )}`;
              return (
                <SwiperSlide className="swiper-slide">
                  <div
                    key={index}
                    className="catagory-product-card bg-cover"
                    style={{
                      backgroundImage:
                        'url("assets/img/shape/catagory-card-shape.jpg")',
                    }}
                  >
                    {/* <h5>{item.menu.length} products</h5> */}
                    <div className="catagory-product-image text-center">
                      <Link
                        href={{
                          pathname: "/shop-right-sidebar",
                          query: { categoryId: item.categoryId },
                        }}
                      >
                        <img src={imageUrl} alt="product-img" />
                        <div className="decor-leaf">
                          <img
                            src="assets/img/shape/decor-leaf.svg"
                            alt="shape-img"
                          />
                        </div>
                        <div className="decor-leaf-2">
                          <img
                            src="assets/img/shape/decor-leaf-2.svg"
                            alt="shape-img"
                          />
                        </div>
                        <div className="burger-shape">
                          <img
                            src="assets/img/shape/burger-shape.png"
                            alt="shape-img"
                          />
                        </div>
                      </Link>
                    </div>
                    <div className="catagory-product-content text-center">
                      <div className="catagory-product-icon">
                        {/* <img
                          src="assets/img/shape/food-shape.svg"
                          alt="shape-text"
                        /> */}
                      </div>
                      <h3>
                        <Link href="/shop-right-sidebar">
                          {item.categoryName}
                        </Link>
                      </h3>
                      {/* <h5>{item.categoryName}</h5> */}
                      <h5 className="burger-heading">{item.categoryName}</h5>
                      {/* <p>{item.menu.length} products</p> */}
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </div>
        </Swiper>
      </div>
    </section>
  );
};
export default FoodSlider;
