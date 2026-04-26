"use client";
import { sliderProps } from "@/utility/sliderProps";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";

const InstagramBannerSlider = () => {
  const [popupImage, setPopupImage] = useState(null);

  const imgarray = [
    "Burger.png","burrito.png","Chicken-Salad.png","Fish-Shrimp.png","Fried-Chicken.png","Pasta.png","quesadilla.png","Rice-Bowl.png",
    "Teco.png","Tender.png","Wings.png"
  ];
  const basecatagories = "/assets/img/";

  return (
    <div className="instagram-banner fix">
      <Swiper
        {...sliderProps.instagramBannerSlider}
        className="swiper instagram-banner-slider"
      >
        <div className="swiper-wrapper">
          {imgarray?.map((item, index) => {
            const imageUrl = `${basecatagories}gallery/${item}`;
            return (
              <SwiperSlide className="swiper-slide" key={index}>
                <div className="instagram-banner-items">
                  <div className="banner-image">
                    <img src={imageUrl} alt="food-img" />
                    <button
                      className="icon img-popup"
                      onClick={() => setPopupImage(imageUrl)}
                    >
                      <i className="fal fa-plus" />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </div>
      </Swiper>

      {/* ✅ Global popup rendered once */}
      {popupImage && (
        <div className="image-popup-overlay" onClick={() => setPopupImage(null)}>
          <div
            className="image-popup-content"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <img src={popupImage} alt="popup" />
            <span className="close-btn" onClick={() => setPopupImage(null)}>
              &times;
            </span>
          </div>
        </div>
      )}

      <style jsx>{`
        .image-popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        .image-popup-content {
          position: relative;
          max-width: 90%;
          max-height: 90%;
        }
        .image-popup-content img {
          width: 100%;
          height: auto;
          border-radius: 10px;
        }
        .close-btn {
          position: absolute;
          top: 10px;
          right: 20px;
          font-size: 30px;
          color: #fff;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};
export default InstagramBannerSlider;
