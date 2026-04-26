"use client";
import { sliderProps } from "@/utility/sliderProps";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";

const NextSaleBanner = () => {
  return (
    <section className="today-best-sale fix">
      <div className="today-best-sale-wrapper">
        <div className="row g-0">
          <div className="col-xl-8 col-lg-7">
            <Swiper
              {...sliderProps.todayBestSaleImageSlider}
              className="swiper today-best-sale-image-slider"
            >
              <div className="array-button">
                <button className="array-next">
                  <i className="far fa-long-arrow-right" />
                </button>
                <button className="array-prev">
                  <i className="far fa-long-arrow-left" />
                </button>
              </div>
              <div className="swiper-wrapper">
                <SwiperSlide className="swiper-slide">
                  <div
                    className="today-best-sale-image bg-cover"
                    style={{
                      backgroundImage: 'url("assets/img/banner/Image-1.jpg")',
                    }}
                  />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div
                    className="today-best-sale-image bg-cover"
                    style={{
                      backgroundImage:
                        'url("assets/img/banner/Image-2.jpg")',
                    }}
                  />
                </SwiperSlide>
                <SwiperSlide className="swiper-slide">
                  <div
                    className="today-best-sale-image bg-cover"
                    style={{
                      backgroundImage:
                        'url("assets/img/banner/Image-3.jpg")',
                    }}
                  />
                </SwiperSlide>
              </div>
            </Swiper>
          </div>
          <div className="col-xl-4 col-lg-5">
            <div
              className="best-sale-content bg-cover"
              style={{ backgroundImage: 'url("assets/img/shape.png")' }}
            >
              <div className="burger-shape">
                <img src="assets/img/shape/fry-shape-4.png" alt="shape-img" />
              </div>
              <div className="fry-shape">
                <img
                  src="assets/img/shape/burger-shape-4.png"
                  alt="shape-img"
                />
              </div>
              <h4 className="wow fadeInUp">Deal Of The Day</h4>
              <h2 className="wow fadeInUp" data-wow-delay=".3s">
                Crispy Perfection in Every Bite
              </h2>
              {/* <h3 className="wow fadeInUp" data-wow-delay=".5s">
                <span>Special Price</span> $55
              </h3> */}
              <p className="wow fadeInUp" data-wow-delay=".7s">
                Treat yourself to our signature fried chicken, expertly cooked for a golden crunch and mouthwatering flavor that hits the spot fast.
              </p>
              <div className="button-area wow fadeInUp" data-wow-delay=".9s">
                <Link href="/shop-right-sidebar" className="theme-btn bg-transparent">
                  <span className="button-content-wrapper d-flex align-items-center">
                    <span className="button-icon">
                      <i className="flaticon-delivery" />
                    </span>
                    <span className="button-text">order now</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default NextSaleBanner;
export const NextSaleBanner2 = () => {
  return (
    <Swiper
      {...sliderProps.todayBestSaleImageSlider}
      className="today-best-sale-image-slider"
    >
      <div className="array-button">
        <button className="array-next">
          <i className="far fa-long-arrow-right" />
        </button>
        <button className="array-prev">
          <i className="far fa-long-arrow-left" />
        </button>
      </div>
      <SwiperSlide>
        <div
          className="today-best-sale-image bg-cover"
          style={{
            backgroundImage: 'url("assets/img/banner/Image-1.jpg")',
          }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <div
          className="today-best-sale-image bg-cover"
          style={{
            backgroundImage: 'url("assets/img/banner/Image-2.jpg")',
          }}
        />
      </SwiperSlide>
      <SwiperSlide>
        <div
          className="today-best-sale-image bg-cover"
          style={{
            backgroundImage: 'url("assets/img/banner/Image-3.jpg")',
          }}
        />
      </SwiperSlide>
    </Swiper>
  );
};
