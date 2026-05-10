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
import { formatTime12h, isDayValid } from "@/utility/availability";
import Swal from "sweetalert2";

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

  const { itemCategorymenu, loading, dateTime } = useSelector(
    (state) => state.itemCategorymenu,
  );

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
      (item) => item.categoryId == categoryId,
    );

    if (menudata) {
      setSelectedCategory(menudata);
      setItem([
        {
          categoryName: menudata.categoryName,
          menu: menudata.menu || [],
          start_time: menudata?.start_time,
          end_time: menudata?.end_time,
          available_days: menudata?.available_days,
          outofStock: menudata?.outofStock,
          name: menudata.categoryName,
        },
      ]);
    }
  };

  const allProductShow = () => {
    setSelectedCategory(null);
    const allCategories = itemCategorymenu.map((cat) => ({
      categoryName: cat.categoryName,
      menu: cat.menu || [],
      start_time: cat?.start_time,
      end_time: cat?.end_time,
      available_days: cat?.available_days,
      outofStock: cat?.outofStock,
      name: cat.categoryName,
    }));
    setItem(allCategories);
  };

  const handleAddToCartClick = (product) => {
    const imageUrl = `${basecatagories}menu/${encodeURIComponent(
      product.image,
    )}`;
    setSelectedProduct({ ...product, image: imageUrl });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  // Validation of item
  const DAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const isTimeWithinRange = (startTime, endTime, dateTimeTime) => {
    // ✅ If time restriction not set → allow
    if (!startTime || !endTime) {
      return true;
    }

    const toMinutes = (time) => {
      const [h, m] = time.split(":").map(Number);
      return h * 60 + m;
    };

    const currentTime = dateTimeTime.split(" ")[1].slice(0, 5); // HH:mm

    const startMinutes = toMinutes(startTime);
    const endMinutes = toMinutes(endTime);
    const currentMinutes = toMinutes(currentTime);

    // ✅ Normal range (example: 06:00 → 23:00)
    if (startMinutes <= endMinutes) {
      return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
    }
    console.log(
      startTime,
      endTime,
      dateTimeTime,
      ">>>>",
      currentMinutes >= startMinutes || currentMinutes <= endMinutes,
    );

    // ✅ Cross midnight (example: 10:00 → 01:00)
    return currentMinutes >= startMinutes || currentMinutes <= endMinutes;
  };

  const handleaddcartvalidation = (catValidation, item) => {
    /* ---------- CATEGORY DAY VALIDATION ---------- */
    if (catValidation?.outofStock == "Y") {
      Swal.fire({
        icon: "warning",
        title: `This Item is Currently Out of Stock`,
      });
      return;
    }

    const catday = isDayValid(catValidation?.available_days, dateTime, true);
    if (!catday) {
      return false;
    }

    /* ---------- Category Time VALIDATION ---------- */
    const iscatValid = isTimeWithinRange(
      catValidation.start_time,
      catValidation.end_time,
      dateTime,
    );

    if (!iscatValid) {
      Swal.fire({
        icon: "warning",
        title: `This Menu is available from ${formatTime12h(
          catValidation.start_time,
        )} to ${formatTime12h(catValidation.end_time)}`,
      });
      return;
    }

    /* ---------- ITEM DAY & TIME VALIDATION ---------- */
    const hours = JSON.parse(item?.available_days) ?? [];
    const ismenuValid = isItemAvailableCheck(hours, dateTime);
    // const itemday = isDayValid(item?.available_days, dateTime,true);

    // if (!itemday) {
    //   return false;
    // }

    // /* ---------- Menu Time VALIDATION ---------- */
    // const ismenuValid = isTimeWithinRange(
    //   item.start_time,
    //   item.end_time,
    //   dateTime
    // );
    if (hours.length > 0 && !ismenuValid) {
      Swal.fire({
        icon: "warning",
        // title: `This Menu is available from ${formatTime12h(item.start_time)} and ${formatTime12h(item.end_time)}`,
        title: `This Menu is not Available Right Now .`,
      });
      return;
    }

    if (item?.outofStock == "Y") {
      Swal.fire({
        icon: "warning",
        // title: `This Menu is available from ${formatTime12h(item.start_time)} and ${formatTime12h(item.end_time)}`,
        title: `This Item is Currently Out of Stock`,
      });
      return;
    }

    handleAddToCartClick(item);
    setShowModal(true);
  };

  const toMinutes = (time) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };

  const isItemAvailableCheck = (operatingHours, dateTimeTime) => {
    const now = new Date(dateTimeTime.replace(" ", "T"));
    const todayKey = DAY_KEYS[now.getDay()];
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const todaySchedule = operatingHours.find((d) => d.day === todayKey);
    if (!todaySchedule) return true;

    const openMinutes = toMinutes(todaySchedule.openTime);
    const closeMinutes = toMinutes(todaySchedule.closeTime);
    // ✅ Normal case (same day)
    if (openMinutes < closeMinutes) {
      return currentMinutes >= openMinutes && currentMinutes <= closeMinutes;
    }
    // ✅ Overnight case (06:00 → 02:00)
    return currentMinutes >= openMinutes || currentMinutes <= closeMinutes;
  };

  const itemavailablecheck = (catValidation,item) => {
    if (catValidation?.outofStock == "Y") {
      return false;
    }
    const catday = isDayValid(catValidation?.available_days, dateTime, false);
    if (!catday) return false;

    const iscatValid = isTimeWithinRange(
      catValidation.start_time,
      catValidation.end_time,
      dateTime,
    );
    if (!iscatValid) return false;
    console.log('>>>>',item?.available_days);
    
    const hours = JSON.parse(item?.available_days) ?? [];
    const ismenuValid = isItemAvailableCheck(hours, dateTime);
    // const itemday = isDayValid(item?.available_days, dateTime,false);
    // if (!itemday) return false;

    // const ismenuValid = isTimeWithinRange(
    //   item.start_time,
    //   item.end_time,
    //   dateTime
    // );
    if (hours.length > 0 && !ismenuValid) return false;
    if (item?.outofStock == "Y") {
      return false;
    }

    return true; // ✅ IMPORTANT
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
            currentDate={dateTime}
          />

          <div className="row g-5">
            <div className="col-xl-9 col-lg-8">
              {/* Loop over categories */}
              {item.map((cat) => {
                const categoryValidation = {
                  start_time: cat?.start_time,
                  end_time: cat?.end_time,
                  name: cat.categoryName,
                  available_days: cat?.available_days,
                  outofStock: cat?.outofStock,
                };
                return (
                  <React.Fragment key={cat.categoryName}>
                    <h2 className="mt-4" style={{ textAlign: "center" }}>
                      {cat.categoryName}
                    </h2>
                    <div className="row">
                      {cat.menu.map((item) => {
                        const imageUrl = `${basecatagories}menu/${encodeURIComponent(
                          item.image,
                        )}`;
                        return (
                          <div
                            key={item.menuId}
                            className="col-xl-3 col-sm-3 col-md-6 col-sm-12"
                          >
                            <div
                              className="catagory-product-card-2 shadow-style text-center"
                              style={{
                                border:
                                  itemavailablecheck(categoryValidation,item) ===
                                  false
                                    ? "2px solid red"
                                    : "none",
                              }}
                            >
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
                                      handleaddcartvalidation(
                                        categoryValidation,
                                        item,
                                      );
                                      // handleAddToCartClick(item);
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
                                          (parseFloat(item.price) *
                                            item.offer) /
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
                                          priceDisplay = "Price not available";
                                        }
                                      }
                                      return (
                                        <h6 style={{ fontSize: "22px" }}>
                                          {priceDisplay}
                                        </h6>
                                      );
                                    })()
                                  )}
                                </div>
                                <h4 style={{ fontSize: "22px" }}>
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
                );
              })}
            </div>

            <ProductSidebar
              data={itemCategorymenu}
              className="col-xl-3 col-lg-4"
              style="style-2"
              onCategorySelect={handleCategorySelect}
              selectedCategoryId={selectedCategoryId}
              currentDate={dateTime}
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
