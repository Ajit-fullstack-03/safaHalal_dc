"use client";
import PageBanner from "@/components/PageBanner";
import ProductSidebar from "@/components/ProductSidebar";
import ProductTopBar from "@/components/ProductTopBar";
import ReservationForm from "@/components/ReservationForm";
import FoodKingLayout from "@/layouts/FoodKingLayout";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { mainmenu } from "../../utility/slice/GetCategoryMenumain";
import basecatagories from "@/utility/config";
import AddToCartModal from "./AddToCartModal";
import TopCategoryBar from "@/components/TopCategoryBar";
import Loader from "@/components/Loader";

const Page = ({ searchParams }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [item, setItem] = useState([]); // now stores categories with menu
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const dispatch = useDispatch();

  // get categoryId from localStorage
  useEffect(() => {
    const handleUpdate = () => {
      const catId = localStorage.getItem("categoryId");
      setCategoryId(catId);
    };

    window.addEventListener("storageUpdate", handleUpdate);
    handleUpdate(); // run once on mount

    return () => {
      window.removeEventListener("storageUpdate", handleUpdate);
    };
  }, []);

  // Get query params from URL safely on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const catId = params.get("categoryId");
      setCategoryId(catId);
    }
  }, []);

  useEffect(() => {
    dispatch(mainmenu());
  }, [dispatch]);

  const { itemCategorymenu,loading } = useSelector((state) => state.itemCategorymenu);

  useEffect(() => {
    if (categoryId && itemCategorymenu.length > 0) {
      handleCategorySelect(categoryId);
    } else if (itemCategorymenu.length > 0) {
      allProductShow();
    }
  }, [categoryId, itemCategorymenu]);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
    const menudata = itemCategorymenu.find(
      (item) => item.categoryId == categoryId
    );

    if (menudata) {
      setSelectedCategory(menudata);
      setItem([
        {
          categoryName: menudata.categoryName,
          menu: menudata.menu || [],
        },
      ]);
    }
  };

  const allProductShow = () => {
    setSelectedCategory(null);
    const allCategories = itemCategorymenu.map((cat) => ({
      categoryName: cat.categoryName,
      menu: cat.menu || [],
    }));
    setItem(allCategories);
  };

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
      {/* {loading && <Loader />} */}
      <section className="food-category-section fix section-padding">
        <div className="container">
          {/* ===== Page Title ===== */}
          <div className="text-center-menupage mb-4">
            {/* <h2>{selectedCategory?.categoryName || "All Products"}</h2> */}
          </div>

          {/* MOBILE: sticky, scrollable categories under header */}
          <TopCategoryBar
            data={itemCategorymenu}
            selectedCategoryId={selectedCategoryId}
            onCategorySelect={handleCategorySelect}
          />

          <div className="row g-5">
            <div className="col-xl-9 col-lg-8">
              {/* Loop over categories */}
              {item.map((cat) => (
                <React.Fragment key={cat.categoryName}>
                  <h2 className="mt-4" style={{ textAlign: "center" }}>{cat.categoryName}</h2>
                  <div className="row">
                    {cat.menu.map((item) => {
                      const imageUrl = `${basecatagories}menu/${encodeURIComponent(
                        item.image
                      )}`;
                      return (
                        <div
                          key={item.menuId}
                          className="col-xl-3 col-sm-3 col-md-6 col-sm-12"
                        >
                          <div className="catagory-product-card-2 shadow-style text-center">
                            <div className="icon">
                              <Link href="/shop-cart">
                                <i className="far fa-heart" />
                              </Link>
                            </div>
                            <div className="catagory-product-image">
                              <img
                                src={imageUrl}
                                alt={item.menuName}
                                height={"100%"}
                                width={"100%"}
                              />
                            </div>
                            <div className="catagory-product-content">
                              <div className="catagory-button">
                                <a
                                  href="#"
                                  className="theme-btn-2"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleAddToCartClick(item);
                                  }}
                                >
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
                                      priceDisplay = `$${item.price}`;
                                    } else {
                                      try {
                                        const priceArray = item.customeType;
                                        if (priceArray?.length) {
                                          priceDisplay = `$${priceArray[0].cprice} - $${priceArray[priceArray.length - 1].cprice}`;
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
                              <h4 style={{fontSize : "22px"}}>
                                <Link
                                  href={{
                                    pathname: "/shop-single",
                                    query: { menuId: item.menuId },
                                  }}
                                >
                                  {item.menuName}
                                </Link>
                              </h4>
                              <div className="star">
                                <span className="fas fa-star" />
                                <span className="fas fa-star" />
                                <span className="fas fa-star" />
                                <span className="fas fa-star" />
                                <span className="fas fa-star color-bg" />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </React.Fragment>
              ))}
            </div>

            <ProductSidebar
              data={itemCategorymenu}
              className="col-xl-3 col-lg-4"
              style="style-2"
              onCategorySelect={handleCategorySelect}
              selectedCategoryId={selectedCategoryId}
            />
          </div>
        </div>
      </section>

      {/* Booking Section Start */}
      <section
        className="booking-section_menu fix section-padding bg-cover"
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

      {showModal && (
        <AddToCartModal
          show={showModal}
          handleClose={handleCloseModal}
          product={selectedProduct}
        />
      )}
    </FoodKingLayout>
  );
};

export default Page;
