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
import basecatagories, { base_url, resturantId } from "@/utility/config";
import AddToCartModal from "./shop-right-sidebar/AddToCartModal";
// import ClientOnly from "@/components/ClientOnly";

const page = () => {
  const [displayMenu, setDisplayMenu] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const getDisplayMenu = async () => {
    try {
      const res = await axios.get(`${base_url}/api/getDisplayMenu/` + resturantId);
      setDisplayMenu(res.data?.data ?? []);
      console.log(res.data?.data ?? []);

    } catch (error) {
      console.error("Failed to fetch banner:", error);
    }
  };
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
  useEffect(() => {
    generateUUID();
    getDisplayMenu();
  }, []);

  const handleAddToCartClick = (product) => {
    const imageUrl = `${basecatagories}menu/${encodeURIComponent(
      product.image
    )}`;
    setSelectedProduct({ ...product, image: imageUrl });
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <FoodKingLayout>
      {/* <ClientOnly /> */}
      {/* Hero Section Start */}
      <HomeSlider />
      {/* Food Catagory Section Start */}
      <FoodSlider />
      {/* Food Banner Section Start */}
      <section className="food-banner-section section-padding fix section-bg pt-0">
        <div className="chili-shape">
          <img src="assets/img/shape/chili-shape.png" alt="shape-img" />
        </div>
        <div className="fry-shape">
          <img src="assets/img/shape/fry-shape.png" alt="shape-img" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xl-5 wow fadeInUp" data-wow-delay=".3s">
              <div
                className="single-offer-items bg-cover"
                style={{
                  backgroundImage: 'url("assets/img/banner/pepsi-bg-new.png")',
                }}
              >
                <div className="offer-content">
                  <h5>crispy, every bite taste</h5>
                  <h3>
                    SUPER <br />
                    DELICIOUS
                  </h3>
                </div>
                <div className="offer-image">
                  <img
                    src="assets/img/offer/50percent-off.png"
                    alt="offer-img"
                  />
                </div>
                <div className="burger-text">
                  <img src="assets/img/shape/burger-text.png" alt="shape-img" />
                </div>
                <div className="main-food">
                  <img src="assets/img/food/main-food.png" alt="food-img" />
                </div>
              </div>
            </div>
            <div
              className="col-xl-7 mt-5 mt-xl-0 wow fadeInUp"
              data-wow-delay=".5s"
            >
              <div
                className="pizza-banner-items bg-cover"
                style={{
                  backgroundImage: "url(assets/img/banner/pizza-bg.png)",
                }}
              >
                <div className="pizza-text">
                  <img src="assets/img/shape/pizza-text.png" alt="shape-img" />
                </div>
                <div className="pizza-text-2">
                  <img
                    src="assets/img/shape/pizza-text-2.png"
                    alt="shape-img"
                  />
                </div>
                <div className="pizza-image">
                  <img src="assets/img/food/pizza-2.png" alt="pizza-img" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Brand Section Start */}
      <section className="brand-shape section-padding fix section-bg pt-0">
        <div className="container">
          <div className="brand-wrapper">
            <div className="brand-title">
              <h4>
                Our Categorys
              </h4>
            </div>
            <BrandSlider />
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
                      Savor the taste of our Grilled Chicken Sub or Wrap — perfectly seasoned,<br />
                      <span style={{ fontSize: "28px" }}> freshly prepared, and full of flavor in every bite.
                      </span> <br />
                    </Link>
                    <span className="text-2"> 100% halal!</span>
                  </h3>
                  <div
                    className="grilled-button wow fadeInUp"
                    data-wow-delay=".7s"
                  >
                    <Link href={{ pathname: "/shop-right-sidebar", query: { categoryId: 28 }, }} className="theme-btn">
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
      {/* Food Catagory Section Start */}
      <section className="food-category-section fix section-padding section-bg">
        <div className="container">
          <div className="section-title text-center">
            <span className="wow fadeInUp">crispy, every bite taste</span>
            <h2 className="wow fadeInUp" data-wow-delay=".3s">
              Popular Food Items
            </h2>
          </div>
          <div className="row">
            {displayMenu.map((item) => {
              const imageUrl = `${basecatagories}menu/${encodeURIComponent(
                item.image
              )}`;
              return (
                <div
                  className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp"
                  data-wow-delay=".5s" key={item.menuId}
                >
                  <div className="catagory-product-card-2 active text-center">
                    <div className="catagory-product-image">
                      <img src={imageUrl} alt={item.menuName} height={"100%"}
                        width={"100%"} />
                    </div>
                    <div className="catagory-product-content">
                      <div className="catagory-button">
                        <a href="#" className="theme-btn-2" onClick={(e) => {
                          e.preventDefault();
                          handleAddToCartClick(item);
                        }}>
                          <i className="far fa-shopping-basket" />
                          Add To Cart
                        </a>
                      </div>
                      <div className="info-price d-flex align-items-center justify-content-center">
                        {item.offer ? (
                          <>
                            <p>-{item.offer}%</p>
                            <h6>
                              ${parseFloat(item.price).toFixed(2)}
                            </h6>
                            <span>
                              $
                              {(
                                parseFloat(item.price) -
                                (parseFloat(item.price) * item.offer) /
                                100
                              ).toFixed(2)}
                            </span>
                          </>
                        ) : (
                          (() => {
                            let priceDisplay = "Price not available";
                            if (item.price) {
                              priceDisplay = `$${item?.price}`;
                            } else {
                              try {
                                const priceArray = JSON.parse(item?.customeType);
                                if (priceArray?.length > 0) {
                                  console.log(priceArray?.length);
                                  
                                  priceDisplay = `$${priceArray[0]?.cprice} - $${priceArray[priceArray.length - 1].cprice}`;
                                  console.log(priceArray[0]?.cprice, priceArray[priceArray.length - 1].cprice,'>>>>>');
                                  
                                }
                              } catch (err) {
                                priceDisplay =
                                  "Price not available";
                              }
                            }
                            return <h6 style={{ fontSize: "22px" }}>{priceDisplay}</h6>;
                          })()
                        )}
                      </div>
                      <h4>
                        <Link href={{
                          pathname: "/shop-single",
                          query: { menuId: item.menuId },
                        }}>{item.menuName}</Link>
                      </h4>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            className="catagory-button text-center pt-4 wow fadeInUp"
            data-wow-delay=".3s"
          >
            <Link href="/shop-right-sidebar" className="theme-btn">
              <span className="button-content-wrapper d-flex align-items-center">
                <span className="button-icon">
                  <i className="flaticon-delivery" />
                </span>
                <span className="button-text">view more</span>
              </span>
            </Link>
          </div>
          {showModal && (
            <AddToCartModal
              show={showModal}
              handleClose={handleCloseModal}
              product={selectedProduct}
            />
          )}
        </div>
      </section>
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
                          2 PCS FISH AND 5 PCS WHOLE WINGS COMBO <br /> ONLY $19.99.
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
                          BURGER AND 5 PCS WINGS COMBO <br /> ONLY $16.99
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
                          4 PCS TENDERS COMBO <br /> ONLY $10.99
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
                          10 PCS WINGS COMBO <br /> ONLY $16.99
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
      {/* Marque Section Start */}
      <Marque />
      {/* Choose Us Section Start */}
      <section className="choose-us fix section-padding pt-0 section-bg">
        <div className="container">
          <div
            className="food-icon-wrapper bg-cover"
            style={{
              backgroundImage: 'url("assets/img/shape/food-shape-2.png")',
            }}
          >
            <div className="row g-4">
              <div
                className="col-lg-3 col-md-6 wow fadeInUp"
                data-wow-delay=".3s"
              >
                <div className="single-food-icon">
                  <div className="icon">
                    <i className="flaticon-quality" />
                  </div>
                  <div className="content">
                    <h4>super quality food</h4>
                    <p>
                      A team of dreamers and doers building unique interactive
                      music and art
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 wow fadeInUp"
                data-wow-delay=".5s"
              >
                <div className="single-food-icon">
                  <div className="icon">
                    <i className="flaticon-cooking" />
                  </div>
                  <div className="content">
                    <h4>original recipes</h4>
                    <p>
                      A team of dreamers and doers building unique interactive
                      music and art
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 wow fadeInUp"
                data-wow-delay=".7s"
              >
                <div className="single-food-icon">
                  <div className="icon">
                    <i className="flaticon-fast-delivery" />
                  </div>
                  <div className="content">
                    <h4>quick fast delivery</h4>
                    <p>
                      A team of dreamers and doers building unique interactive
                      music and art
                    </p>
                  </div>
                </div>
              </div>
              <div
                className="col-lg-3 col-md-6 wow fadeInUp"
                data-wow-delay=".9s"
              >
                <div className="single-food-icon">
                  <div className="icon">
                    <i className="flaticon-quality" />
                  </div>
                  <div className="content">
                    <h4>100% fresh foods</h4>
                    <p>
                      A team of dreamers and doers building unique interactive
                      music and art
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* About Section Start */}
      <section className="about-section fix section-padding pt-0 section-bg">
        <div className="container">
          <div className="about-wrapper">
            <div className="row align-items-center">
              <div
                className="col-xl-6 col-lg-6 wow fadeInUp"
                data-wow-delay=".3s"
              >
                <div className="about-image">
                  <img src="assets/img/about/burger.png" alt="about-img" />
                  <div className="burger-text">
                    <img
                      src="assets/img/about/burger-text.png"
                      alt="shape-img"
                    />
                  </div>
                  <div className="price">
                    <h2>
                      $<span className="count">4,99</span>
                    </h2>
                  </div>
                  <div
                    className="since-text bg-cover"
                    style={{
                      backgroundImage: 'url("assets/img/shape/food-shape.png")',
                    }}
                  >
                    <h3>since /1985</h3>
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 mt-5 mt-lg-0">
                <div className="about-content">
                  <div className="section-title">
                    <span className="wow fadeInUp">about our food</span>
                    <h2 className="wow fadeInUp" data-wow-delay=".3s">
                      Where Quality Meet Excellent <span>Service.</span>
                    </h2>
                  </div>
                  <p className="wow fadeInUp" data-wow-delay=".5s">
                    It's the perfect dining experience where every dish is
                    crafted with fresh, high-quality Experience quick and
                    efficient service that ensures your food is servead fresh
                    It's the dining experience where every dish is crafted with
                    fresh, high-quality ingredients
                  </p>
                  <div className="icon-area">
                    <div
                      className="icon-items d-flex wow fadeInUp"
                      data-wow-delay=".3s"
                    >
                      <div className="icon">
                        <i className="flaticon-quality" />
                      </div>
                      <div className="content">
                        <h4>super quality food</h4>
                        <p>
                          A team of dreamers and doers build unique interactive
                          music and art
                        </p>
                      </div>
                    </div>
                    <div
                      className="icon-items d-flex wow fadeInUp"
                      data-wow-delay=".5s"
                    >
                      <div className="icon">
                        <i className="flaticon-reputation" />
                      </div>
                      <div className="content">
                        <h4>well reputation</h4>
                        <p>
                          A team of dreamers and doers build unique interactive
                          music and art
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="info-area d-flex align-items-center">
                    <Link
                      href="/about"
                      className="theme-btn wow style-line-height fadeInUp"
                      data-wow-delay=".3s"
                    >
                      more about us
                    </Link>
                    <div
                      className="info-content wow fadeInUp"
                      data-wow-delay=".5s"
                    >
                      <span>BRENDON GARREY</span>
                      <h6>Customer’s experience is our highest priority.</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Food Banner Section Start */}
      <section className="food-banner-section fix section-padding section-bg pt-0">
        <div className="container">
          <div className="row justify-content-center">
            <div
              className="col-xl-7 col-lg-9 wow fadeInUp"
              data-wow-delay=".3s"
            >
              <div
                className="burger-banner-items bg-cover"
                style={{
                  backgroundImage: "url(assets/img/banner/burger-bg.png)",
                }}
              >
                <div className="burger-content text-center">
                  <h3>today</h3>
                  <h2>special</h2>
                  <h4>
                    <Link href="/shop" className="text-white">
                      beef <span>burger</span>
                    </Link>
                  </h4>
                  <Link href="/shop-right-sidebar" className="theme-btn mt-4">
                    <span className="button-content-wrapper d-flex align-items-center">
                      <span className="button-icon">
                        <i className="flaticon-delivery" />
                      </span>
                      <span className="button-text">order now</span>
                    </span>
                  </Link>
                </div>
                <div className="burger-image">
                  <img src="assets/img/food/big-burger.png" alt="food-img" />
                </div>
                <div className="text-shape">
                  <img
                    src="assets/img/shape/pizza-text-2.png"
                    alt="shape-img"
                  />
                </div>
                <div className="burger-text">
                  <img src="assets/img/shape/burger-text.png" alt="shape-img" />
                </div>
              </div>
            </div>
            <div
              className="col-xl-5 col-lg-9 mt-5 mt-xl-0 wow fadeInUp"
              data-wow-delay=".5s"
            >
              <div
                className="single-offer-items style-2 bg-cover"
                style={{
                  backgroundImage: 'url("assets/img/banner/pepsi-bg-dc.png")',
                }}
              >
                <div className="offer-content">
                  <h5>crispy, every bite taste</h5>
                  <h3>
                    FASH FOOD <br />
                    MEAL
                  </h3>
                  <p>
                    The mouth-watering aroma of <br />
                    sizzling burgers
                  </p>
                  <Link href="/shop-right-sidebar" className="theme-btn mt-4">
                    <span className="button-content-wrapper d-flex align-items-center">
                      <span className="button-icon">
                        <i className="flaticon-delivery" />
                      </span>
                      <span className="button-text">order now</span>
                    </span>
                  </Link>
                </div>
                <div className="offer-img">
                  <img
                    src="assets/img/offer/50percent-off-3.png"
                    alt="shape-img"
                  />
                </div>
                <div className="roller-box">
                  <img src="assets/img/food/roller-box.png" alt="food-img" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* KFC Banner Section Start */}
      <section
        className="kfc-banner fix bg-cover section-padding"
        style={{ backgroundImage: 'url("assets/img/bg-image/bg.jpg")' }}
      >
        <div className="kfc-wrapper">
          <div className="container-fluid">
            <div className="row justify-content-between">
              <div className="col-lg-5">
                <div
                  className="kfc-image-items bg-cover"
                  style={{
                    backgroundImage: 'url("assets/img/banner/kfc-bg.png")',
                  }}
                >
                  <div className="kfc-image">
                    <img src="assets/img/food/kfc.png" alt="food-img" />
                  </div>
                  <div className="offer-shape">
                    <img
                      src="assets/img/offer/50percent-off-2.png"
                      alt="shape-img"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="kfc-content text-center">
                  <div className="section-title">
                    <span className="wow fadeInUp">
                      crispy, every bite taste
                    </span>
                    <h2 className="wow fadeInUp" data-wow-delay=".3s">
                      kfc chiken hot <br />
                      wing &amp; french fries
                    </h2>
                  </div>
                  <p className="mt-3 mt-lg-0 wow fadeInUp" data-wow-delay=".5s">
                    Wheat tortilla with spicy chicken bites, cheese sauce <br />
                    tomatoes and soft cheese
                  </p>
                  <ul
                    className="countdown-items wow fadeInUp"
                    data-wow-delay=".7s"
                  >
                    <li>
                      <span id="day">30</span>
                      <p>Days</p>
                    </li>
                    <li>
                      <span id="Hours">22</span>
                      <p className="cont">hours</p>
                    </li>
                    <li>
                      <span id="Minutes">48</span>
                      <p>Min</p>
                    </li>
                    <li>
                      <span id="Seconds">22</span>
                      <p>Sec</p>
                    </li>
                  </ul>
                  <Link
                    href="/shop-right-sidebar"
                    className="theme-btn mt-5 wow fadeInUp"
                    data-wow-delay=".8s"
                  >
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
              <img src="assets/img/delivery-man.png" alt="img" />
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
                        <a href="tel:+1 202-885-9430">+1 202-885-9430</a>
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
