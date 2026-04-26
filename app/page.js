"use client";
import React, { useState, useEffect } from "react";
import { AboutFoodItems2 } from "@/components/AboutFoodItems";
import BrandSlider from "@/components/BrandSlider";
import FoodSlider from "@/components/FoodSlider";
import HomeSlider from "@/components/HomeSlider";
import InstagramBannerSlider from "@/components/InstagramBannerSlider";
import Marque from "@/components/Marque";
import NextSaleBanner from "@/components/NextSaleBanner";
import ReservationForm from "@/components/ReservationForm";
import TestimonialSlider from "@/components/TestimonialSlider";
import FoodKingLayout from "@/layouts/FoodKingLayout";
import Link from "next/link";
import axios from "axios";
// import React,{ useEffect } from "react";
import Cookies from 'js-cookie';
// import ClientOnly from "@/components/ClientOnly";

const page = () => {
  // const generateUUID = async () => {
  //   try {
  //     const responce =await axios.get("https://admin.foodstek.com/api/generateUUID");
  //       if(responce){
  //       // // Set a cookie
  //       Cookies.set('uuid', responce?.data, {
  //         expires: 30, // expires in 7 days
  //         secure: true, // only set on HTTPS
  //         sameSite: 'Strict', // or 'Lax' if needed
  //       });              
  //     }
  //   } catch (error) {
  //     console.error("Add to cart failed:", error);
  //   }
  // };
  const generateUUID = async () => {
    const existingUUID = Cookies.get('uuid');
  
    if (!existingUUID) {
      try {
        const response = await axios.get("https://admin.foodstek.com/api/generateUUID");
        
        if (response?.data) {
          // Set the cookie if not already present
          Cookies.set('uuid', response.data, {
            expires: 30, // expires in 30 days
            secure: true,
            sameSite: 'Strict',
          });
        }
      } catch (error) {
        console.error("UUID generation failed:", error);
      }
    } else {
    }
  };
  useEffect(()=>{
    generateUUID(); 
  },[])
  return (
    <FoodKingLayout>
      {/* <ClientOnly /> */}
      {/* Hero Section Start */}
      <HomeSlider />
      {/* Food Catagory Section Start */}
      <FoodSlider />
      {/* Food Banner Section Start */}

      {/* Today Nest Sale Banner Start */}
      <NextSaleBanner />

      <AboutFoodItems2 />
      {/* Video Banner Section Start */}
      <div
        className="video-section section-padding bg-cover"
        style={{ backgroundImage: 'url("assets/img/banner/videoSectionBanner.png")' }}
      >
        <div className="container">
          <div className="video-icon center">
            <div
              href="https://www.youtube.com/watch?v=Cn4G2lZ_g2I"
              className="video-popup"
            >
              <i className="fas fa-play" />
            </div>
          </div>
        </div>
      </div>

      {/* Food Comboo Section Start */}
      <section
        className="food-comboo-section fix bg-cover section-padding"
        style={{ backgroundImage: 'url("assets/img/bg-image/bg.jpg")' }}
      >
        <div className="drinks-shape">
          <img src="assets/img/shape/drinks.png" alt="shape-img" />
        </div>
        <div className="container">
          <div className="comboo-wrapper">
            <div className="row align-items-center">
              <div className="col-xl-6">
                <div className="food-comboo-content">
                  <div className="section-title">
                    <span className="wow fadeInUp">
                      crispy, every bite taste
                    </span>
                    <h2 className="wow fadeInUp" data-wow-delay=".3s">
                      Trending Wings Combo <span>Save 20%</span>
                    </h2>
                  </div>
                  <p className="wow fadeInUp" data-wow-delay=".5s">
                    Fresh, juicy & halal — the perfect flavor combo!
                  </p>
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button
                      className="nav-link wow fadeInUp"
                      data-wow-delay=".3s"
                      id="nav-home-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-home"
                      type="button"
                      role="tab"
                      aria-controls="nav-home"
                      aria-selected="true"
                    >
                      <span className="food-comboo-list">
                        <span className="offer-image">
                          <img src="assets/img/offer/com.png" alt="img" />
                        </span>
                        <span className="comboo-title">
                          2 PCS FISH AND 5 PCS WHOLE WINGS COMBO <br/> ONLY $19.99.
                        </span>
                      </span>
                    </button>
                    <button
                      className="nav-link active wow fadeInUp"
                      data-wow-delay=".5s"
                      id="nav-profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-profile"
                      type="button"
                      role="tab"
                      aria-controls="nav-profile"
                      aria-selected="false"
                    >
                      <span className="food-comboo-list">
                        <span className="offer-image">
                          <img src="assets/img/offer/Burger-Com.png" alt="img" />
                        </span>
                        <span className="comboo-title">
                          BURGER AND 5 PCS WINGS COMBO <br/> ONLY $16.99
                        </span>
                      </span>
                    </button>
                    <button
                      className="nav-link wow fadeInUp"
                      data-wow-delay=".7s"
                      id="nav-contact-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-contact"
                      type="button"
                      role="tab"
                      aria-controls="nav-contact"
                      aria-selected="false"
                    >
                      <span className="food-comboo-list">
                        <span className="offer-image">
                          <img src="assets/img/offer/4-pcs-tender-com.png" alt="img" />
                        </span>
                        <span className="comboo-title">
                           4 PCS TENDERS COMBO <br/> ONLY $10.99
                        </span>
                      </span>
                    </button>
                    <button
                      className="nav-link wow fadeInUp"
                      data-wow-delay=".7s"
                      id="nav-contact-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-contact"
                      type="button"
                      role="tab"
                      aria-controls="nav-contact"
                      aria-selected="false"
                    >
                      <span className="food-comboo-list">
                        <span className="offer-image">
                          <img src="assets/img/offer/10-pcs-wing-com.png" alt="img" />
                        </span>
                        <span className="comboo-title">
                           10 PCS WINGS COMBO <br/> ONLY $16.99
                        </span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-xl-6">
                <div className="tab-content" id="nav-tab-Content">
                  <div
                    className="tab-pane fade show active"
                    id="nav-home"
                    role="tabpanel"
                    aria-labelledby="nav-home-tab"
                  >
                    <div
                      className="comboo-image bg-cover"
                      style={{
                        backgroundImage:
                          'url("assets/img/banner/comboo-bg.jpg")',
                      }}>
                      <div className="pizza-text">
                        <img
                          src="assets/img/shape/Burger-name.png"
                          alt="shape-img"
                        />
                      </div>
                      <div className="pizza-image">
                        <img
                          src="assets/img/food/Buger.png"
                          alt="food-img"
                        />
                      </div>
                      <div className="offer-shape">
                        <img
                          src="assets/img/offer/50percent-off-2.png"
                          alt="shape-img"
                        />
                      </div>
                      <div className="vegetable-shape">
                        {/* <img
                          src="assets/img/shape/vegetable.png"
                          alt="shape-img"
                        /> */}
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-profile"
                    role="tabpanel"
                    aria-labelledby="nav-profile-tab"
                  >
                    <div
                      className="comboo-image bg-cover"
                      style={{
                        backgroundImage:
                          'url("assets/img/banner/comboo-bg.jpg")',
                      }}
                    >
                      <div className="pizza-text">
                        <img
                          src="assets/img/shape/combo-pizza-text.png"
                          alt="shape-img"
                        />
                      </div>
                      <div className="pizza-image">
                        <img
                          src="assets/img/food/big-pizza.png"
                          alt="food-img"
                        />
                      </div>
                      <div className="offer-shape">
                        <img
                          src="assets/img/offer/50percent-off-2.png"
                          alt="shape-img"
                        />
                      </div>
                      <div className="vegetable-shape">
                        <img
                          src="assets/img/shape/vegetable.png"
                          alt="shape-img"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-contact"
                    role="tabpanel"
                    aria-labelledby="nav-contact-tab"
                  >
                    <div
                      className="comboo-image bg-cover"
                      style={{
                        backgroundImage:
                          'url("assets/img/banner/comboo-bg.jpg")',
                      }}
                    >
                      <div className="pizza-text">
                        <img
                          src="assets/img/shape/combo-pizza-text.png"
                          alt="shape-img"
                        />
                      </div>
                      <div className="pizza-image">
                        <img
                          src="assets/img/food/big-pizza.png"
                          alt="food-img"
                        />
                      </div>
                      <div className="offer-shape">
                        <img
                          src="assets/img/offer/50percent-off-2.png"
                          alt="shape-img"
                        />
                      </div>
                      <div className="vegetable-shape">
                        <img
                          src="assets/img/shape/vegetable.png"
                          alt="shape-img"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Food Banner Section Start */}
      <section className="food-banner-section section-padding fix">
        <div className="burger-shape-2">
          <img src="assets/img/shape/burger-shape-2.png" alt="shape-img" />
        </div>
        <div className="container">
          <div className="row g-4">
            <div
              className="col-xl-4 col-lg-6 wow fadeInUp"
              data-wow-delay=".3s"
            >
              <div
                className="single-offer-items bg-cover style-3"
                style={{
                  backgroundImage: 'url("assets/img/banner/pepsi-bg-new.png")',
                }}
              >
                <div className="offer-content">
                  <h5>Every bite tastes</h5>
                  <h3>
                    Delicious &<br />
                    Hot Wings
                  </h3>
                  <Link href={{pathname: "/shop-right-sidebar",query: { categoryId: 25 },}} className="link-btn">
                    order now <i className="fas fa-arrow-right" />
                  </Link>
                </div>
                <div className="offer-image-2">
                  <img
                    src="assets/img/offer/50percent-off-2.png"
                    alt="offer-img"
                  />
                </div>
                <div className="small-pizza">
                  <img src="assets/img/food/Wings.png" alt="pizza-img" />
                </div>
              </div>
            </div>
            <div
              className="col-xl-4 col-lg-6 wow fadeInUp"
              data-wow-delay=".5s"
            >
              <div
                className="single-offer-items bg-cover style-3"
                style={{
                  backgroundImage: 'url("assets/img/banner/pepsi-bg2.png")',
                }}
              >
                <div className="french-content">
                  <h4>
                    <span>Todays</span>Delicious
                  </h4>
                  <h3>Rice Bowl</h3>
                  <h5>This Weekend only</h5>
                  <Link href={{pathname: "/shop-right-sidebar",query: { categoryId: 24 },}} className="theme-btn bg-yellow">
                    <span className="button-content-wrapper d-flex align-items-center">
                      <span className="button-icon">
                        <i className="flaticon-delivery" />
                      </span>
                      <span className="button-text">order now</span>
                    </span>
                  </Link>
                </div>
                <div className="french-image">
                  <img src="assets/img/food/Rice-Bowl.png" alt="food-img" />
                </div>
              </div>
            </div>
            <div
              className="col-xl-4 col-lg-6 wow fadeInUp"
              data-wow-delay=".7s"
            >
              <div
                className="single-offer-items bg-cover style-3"
                style={{
                  backgroundImage: 'url("assets/img/banner/pepsi-bg3.png")',
                }}
              >
                <div className="offer-content">
                  <h5>Crispy, every bite full of flavor.</h5>
                  <h3>
                    Chicken Tenders &amp; <br />
                    Fries
                  </h3>
                  <Link href={{pathname: "/shop-right-sidebar",query: { categoryId: 30 },}} className="link-btn">
                    order now <i className="fas fa-arrow-right" />
                  </Link>
                </div>
                <div className="offer-shape-3">
                  <img
                    src="assets/img/offer/50percent-off-4.png"
                    alt="shape-img"
                  />
                </div>
                <div className="main-food-3">
                  <img src="assets/img/food/Chicken-Tender.png" alt="pizza-img" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Grilled Banner Section Start */}
      <section
        className="grilled-banner fix section-padding bg-cover"
        style={{ backgroundImage: 'url("assets/img/banner/main-bg-new.jpg")' }}
      >
        <div className="patato-shape">
          <img src="assets/img/shape/Wrap.png" alt="shape-img" />
        </div>
        <div className="offer-shape float-bob-y">
          <img src="assets/img/offer/50percent-off-2.png" alt="shape-img" />
        </div>
        <div className="text-shape">
          <img src="assets/img/shape/pizza-text-2.png" alt="shape-img" />
        </div>
        <div className="spicy-shape">
          <img src="assets/img/shape/spicy.png" alt="shape-img" />
        </div>
        <div className="tomato-shape">
          <img src="assets/img/shape/tomato-shape-2.png" alt="shape-img" />
        </div>
        <div className="container">
          <div className="grilled-wrapper">
            <div className="row align-items-center">
              <div className="col-xl-6 col-lg-6">
                <div className="grilled-content">
                  <h4 className="wow fadeInUp"></h4>
                  <h2 className="wow fadeInUp" data-wow-delay=".3s">
                    {/* tODAY'S <span>ASTACKIN</span> DAY */}
                    Grilled <span>Goodness,Wrapped</span> Your Way
                  </h2>
                  <h3 className="wow fadeInUp" data-wow-delay=".5s">
                    <Link href="/shop">
                      Savor the taste of our Grilled Chicken Sub or Wrap — perfectly seasoned,<br/>
                      <span style={{ fontSize: "28px" }}> freshly prepared, and full of flavor in every bite.
</span> <br/>
                    </Link>
                    <span className="text-2"> 100% halal!</span>
                  </h3>
                  <div
                    className="grilled-button wow fadeInUp"
                    data-wow-delay=".7s"
                  >
                    <Link href={{pathname: "/shop-right-sidebar",query: { categoryId: 28 },}} className="theme-btn">
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
              <div
                className="col-xl-6 col-lg-6 mt-5 mt-lg-0 wow fadeInUp"
                data-wow-delay=".4s"
              >
                <div className="grilled-image">
                  <img src="assets/img/food/Sub.png" alt="grilled-img" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Testimonial Section Start */}
      <TestimonialSlider />
      
      {/* Food Catagory Section Start */}
      

      {/* Main Cta Banner Section Start */}
      <section className="main-cta-banner section-padding pt-0">
        <div className="container">
          <div
            className="main-cta-banner-wrapper bg-cover mt-10"
            style={{
              backgroundImage: 'url("assets/img/banner/main-cta-bg.jpg")',
               display:'none'
            }}
          >
            <div className="section-title">
              <span className="theme-color-3 wow fadeInUp">
                crispy, every bite taste
              </span>
              <h2 className="text-white wow fadeInUp" data-wow-delay=".3s">
                30 minutes fast <br />
                <span className="theme-color-3">delivery</span> challage
              </h2>
            </div>
            <Link
              href="/shop-right-sidebar"
              className="theme-btn bg-white mt-4 mt-md-0 wow fadeInUp"
              data-wow-delay=".5s"
            >
              <span className="button-content-wrapper d-flex align-items-center">
                <span className="button-icon">
                  <i className="flaticon-delivery" />
                </span>
                <span className="button-text">order now</span>
              </span>
            </Link>
            <div className="arrow-shape">
              <img src="assets/img/shape/arrow-shape.png" alt="shape-img" />
            </div>
            <div className="delivery-man">
              <img className="delivery-minute-img" src="assets/img/delivery-man-new.png" alt="img" />
            </div>
            <div className="frame-shape">
              <img src="assets/img/shape/frame.png" alt="shape-img" />
            </div>
          </div>
        </div>
      </section>
      {/* Booking Section Start */}
      <section
        className="booking-section fix section-padding bg-cover"
        style={{ backgroundImage: 'url("assets/img/banner/main-bg-new.jpg")' }}
      >
        <div className="container">
          <div className="booking-wrapper style-responsive section-padding pb-0">
            <div className="row justify-content-between align-items-center">
              <div className="col-lg-6">
                <div className="booking-content">
                  <div className="section-title">
                    <span className="wow fadeInUp">
                      crispy, every bite taste
                    </span>
                    <h2
                      className="text-white wow fadeInUp"
                      data-wow-delay=".3s"
                    >
                      Want to book a Catering? <br />
                      please fill-up this information.
                    </h2>
                  </div>
                  <div
                    className="icon-items d-flex align-items-center wow fadeInUp"
                    data-wow-delay=".5s"
                  >
                    <div className="icon">
                      <i className="flaticon-phone-call-2" />
                    </div>
                    <div className="content">
                      {/* <h5>24/7 Support center</h5> */}
                      <h3>
                        <a href="tel:+1 (240) 455-7998">+1 (240) 455-7998</a>
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-5 mt-5 mt-lg-0 wow fadeInUp"
                data-wow-delay=".4s"
              >
                <ReservationForm />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Instagram Banner Section Start */}
      <InstagramBannerSlider />
    </FoodKingLayout>
  );
};
export default page;
