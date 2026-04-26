"use client";
import axios from "axios";
import Cta from "@/components/Cta";
import PageBanner from "@/components/PageBanner";
import FoodKingLayout from "@/layouts/FoodKingLayout";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Nav, Tab, Tabs } from "react-bootstrap";
import basecatagories from "@/utility/config";
import { base_url, resturantId } from "@/utility/config";
import AddToCartModal from "../shop-right-sidebar/AddToCartModal";
const page = () => {
  const [quantity, setQuantity] = useState(0);
  const [menuId, setMenuId] = useState("");
  const [menu, setMenu] = useState("");
  const [relatedMenu, setRelatedMenu] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
    const [popupImage, setPopupImage] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const catId = params.get("menuId");
      setMenuId(catId);
    }
  }, []);

  useEffect(() => {
    if (menuId) {
      fetchMenuDetails();
    }
  }, [menuId, relatedMenu]);

  const fetchMenuDetails = async () => {
    try {
      const response = await axios.post(`${base_url}/api/getMenuDetails`, {
        resturantId: resturantId,
        menuId: menuId,
      });
      setMenu(response.data?.menu || {});
      const res = await axios.post(`${base_url}/api/GetMenubyCategory`, {
        resturantId: resturantId,
        categoryId: response.data?.menu.categoryId,
      });
      const filteredData = res.data?.data.filter(
        (item) => item.menuId != menuId
      );
      setRelatedMenu(filteredData);
    } catch (error) {
      console.error("Error fetching menu details:", error);
    }
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

  const imageUrl = `${basecatagories}menu/${encodeURIComponent(menu.image)}`;
  let priceDisplay = "";
  if (menu.price) {
    priceDisplay = `$${menu.price}`;
  } else {
    try {
      const priceArray = menu.customeType;
      if (priceArray?.length) {
        priceDisplay = `$${priceArray[0].cprice} - $${
          priceArray[priceArray.length - 1].cprice
        }`;
      }
    } catch (err) {
      priceDisplay = "Price not available";
    }
  }

  return (
    <FoodKingLayout>
      <PageBanner pageName={"product single"} pageKey={"productSingle"} />
      <section className="product-details-section section-padding">
        <div className="container">
          <div className="product-details-wrapper">
            <div className="row">
              <div className="col-lg-5">
                <div className="product-image-items">
                  <Tab.Container defaultActiveKey={"nav-home"}>
                    <Tab.Content
                      className="tab-content"
                      eventKey="nav-tab-Content"
                    >
                      <Tab.Pane className="tab-pane fade" eventKey="nav-home">
                        <div className="product-image">
                          <img src={imageUrl} alt="img" />
                          <button
                            onClick={() => setPopupImage(imageUrl)}
                            className="icon img-popup"
                          >
                            <i className="far fa-search" />
                          </button>
                        </div>
                        {popupImage && (
                          <div
                            className="image-popup-overlay"
                            onClick={() => setPopupImage(null)}
                          >
                            <div className="image-popup-content">
                              <img src={popupImage} alt="popup" />
                              <span
                                className="close-btn"
                                onClick={() => setPopupImage(null)}
                              >
                                &times;
                              </span>
                            </div>
                          </div>
                        )}
                      </Tab.Pane>
                      <Tab.Pane
                        className="tab-pane fade"
                        eventKey="nav-profile"
                      >
                        <div className="product-image">
                          <img src={imageUrl} alt="img" />
                          <a href={imageUrl} className="icon img-popup">
                            <i className="far fa-search" />
                          </a>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane
                        className="tab-pane fade"
                        eventKey="nav-contact"
                      >
                        <div className="product-image">
                          <img src={imageUrl} alt="img" />
                          <a href={imageUrl} className="icon img-popup">
                            <i className="far fa-search" />
                          </a>
                        </div>
                      </Tab.Pane>
                      {/* <Tab.Pane
                        className="tab-pane fade"
                        eventKey="nav-contact2"
                      >
                        <div className="product-image">
                          <img
                            src="assets/img/shop-food/details-1.png"
                            alt="img"
                          />
                          <a
                            href="assets/img/shop-food/details-1.png"
                            className="icon img-popup"
                          >
                            <i className="far fa-search" />
                          </a>
                        </div>
                      </Tab.Pane> */}
                    </Tab.Content>
                    <Nav
                      as={"ul"}
                      className="nav nav-tabs wow"
                      id="nav-tab"
                      role="tablist"
                    >
                      <Nav.Link
                        as={"button"}
                        className="nav-link"
                        id="nav-home-tab"
                        eventKey="nav-home"
                      >
                        <img
                          src="assets/img/shop-food/s1.png"
                          alt="img"
                          className="image-tab"
                        />
                      </Nav.Link>
                      <Nav.Link
                        as={"button"}
                        className="nav-link"
                        id="nav-home-tab"
                        eventKey="nav-profile"
                      >
                        <img
                          src="assets/img/shop-food/s2.png"
                          alt="img"
                          className="image-tab"
                        />
                      </Nav.Link>
                      <Nav.Link
                        as={"button"}
                        className="nav-link"
                        id="nav-home-tab"
                        eventKey="nav-contact"
                      >
                        <img
                          src="assets/img/shop-food/s3.png"
                          alt="img"
                          className="image-tab"
                        />
                      </Nav.Link>
                      <Nav.Link
                        as={"button"}
                        className="nav-link"
                        id="nav-home-tab"
                        eventKey="nav-contact2"
                      >
                        <img
                          src="assets/img/shop-food/s4.png"
                          alt="img"
                          className="image-tab"
                        />
                      </Nav.Link>
                    </Nav>
                  </Tab.Container>
                </div>
              </div>
              <div className="col-lg-7 mt-5 mt-lg-0">
                <div className="product-details-content">
                  <div className="star pb-3">
                    <span>-5%</span>
                    <a href="#">
                      {" "}
                      <i className="fas fa-star" />
                    </a>
                    <a href="#">
                      <i className="fas fa-star" />
                    </a>
                    <a href="#">
                      {" "}
                      <i className="fas fa-star" />
                    </a>
                    <a href="#">
                      <i className="fas fa-star" />
                    </a>
                    <a href="#" className="color-bg">
                      {" "}
                      <i className="fas fa-star" />
                    </a>
                    <a href="#" className="text-color">
                      ( 2 Reviews )
                    </a>
                  </div>
                  <h3 className="pb-3">{menu.menuName}</h3>
                  <p className="mb-4">{menu.description}</p>
                  <div className="price-list d-flex align-items-center">
                    <span>{priceDisplay}</span>
                    {/* <del>$4,600.00</del> */}
                  </div>
                  <div className="cart-wrp">
                    {/* <div className="cart-quantity">
                      <h5>QUANTITY:</h5>
                      <div className="quantity align-items-center d-flex">
                        <button
                          onClick={() => setQuantity(Math.max(0, quantity - 1))}
                          className="qtyminus minus"
                        >
                          -
                        </button>
                        <input
                          type="text"
                          value={quantity}
                          onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (!isNaN(value) && value >= 0) {
                              setQuantity(value);
                            }
                          }}
                          className="qty"
                        />
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="qtyplus plus"
                        >
                          +
                        </button>
                      </div>
                    </div> */}

                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCartClick(menu);
                      }}
                    >
                      <div className="shop-button d-flex align-items-center">
                        <Link href="shop-single" className="theme-btn">
                          <span className="button-content-wrapper d-flex align-items-center justify-content-center">
                            <span className="button-icon">
                              <i className="flaticon-shopping-cart" />
                            </span>
                            <span className="button-text">Add To Cart</span>
                          </span>
                        </Link>
                        <Link href="shop-single" className="star-icon">
                          <i className="fal fa-star" />
                        </Link>
                      </div>
                    </a>
                  </div>
                  {/* <h6 className="shop-text">
                    GROUND DELIVERY SURCHARGE: <span>$180.00</span>
                  </h6>
                  <h6 className="details-info">
                    <Link href={"#"}>SKU:</Link> <a href="shop-single">N/A</a>
                  </h6> */}
                  <h6 className="details-info">
                    <span>Categories:</span>{" "}
                    <Link
                      href={{
                        pathname: "/shop-right-sidebar",
                        query: { categoryId: menu.categoryId },
                      }}
                    >
                      {menu.categoryName}
                    </Link>
                  </h6>
                  {/* <h6 className="details-info">
                    <span>Tags:</span>{" "}
                    <Link href="shop-single">Burgers, Tacos</Link>
                  </h6> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="food-category-section fix section-padding section-bg">
        <div className="container">
          <div className="section-title text-center">
            <span className="wow fadeInUp">crispy, every bite taste</span>
            <h2 className="wow fadeInUp" data-wow-delay=".3s">
              RELATED PRODUCTS
            </h2>
          </div>
          <div className="row">
            {relatedMenu.map((item) => {
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
                            <h6>${parseFloat(item.price).toFixed(2)}</h6>
                            <span>
                              $
                              {(
                                parseFloat(item.price) -
                                (parseFloat(item.price) * item.offer) / 100
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
                                  priceDisplay = `$${priceArray[0].cprice} - $${
                                    priceArray[priceArray.length - 1].cprice
                                  }`;
                                }
                              } catch (err) {
                                priceDisplay = "Price not available";
                              }
                            }
                            return <h6>{priceDisplay}</h6>;
                          })()
                        )}
                      </div>
                      <h4>
                        <Link
                          href={{
                            pathname: "/shop-right-sidebar",
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
        </div>
      </section>
      <Cta />
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
export default page;
