"use client";
import Link from "next/link";
import { Fragment, useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import "./megamenu.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchMenu } from "../utility/slice/GetcategorymenuSlice";
import basecatagories from "@/utility/config";
import { base_url, resturantId } from "@/utility/config";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Cookies from "js-cookie";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/utility/firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Modal, Button } from "react-bootstrap";

const Header = ({ header }) => {
  switch (header) {
    case 1:
      return <Header1 />;
    case 2:
      return <Header2 />;

    default:
      return <Header1 />;
  }
};
export default Header;

const Menus = () => {
  const [show, setShow] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();

  const handeltrack = async () => {
    const result = await dispatch(fetchMenu()).unwrap();
  };
  useEffect(() => {
    handeltrack();
    getCartData();
  }, []);
  const getCartData = async () => {
    try {
      let uuid = Cookies.get("uuid");
      let id_token = localStorage.getItem("id_token");
      const res = await axios.post(`${base_url}/api/GetCartItem`, {
        resturantId: resturantId,
        user_uuid: uuid,
        idToken: id_token,
      });

      const data = res?.data?.data;
      if (Array.isArray(data)) {
        setCartItems(data);
      } else {
        setCartItems([]); // fallback if API returns weird data
      }
    } catch (error) {
      console.error("Add to cart failed:", error);
      setCartItems([]);
    }
  };
  const categories = useSelector((state) => state.menu.menuItems);
  const setCategoryId = (id) => {
    localStorage.setItem("categoryId", id);
  };
  return (
    <ul>
      <li className="has-dropdown active">
        <Link href="/">
          Home
          {/* <i className="fas fa-angle-down" /> */}
        </Link>
      </li>

      {/* Mega Menu */}
      {/* Bootstrap Dropdown for Mega Menu */}
      <li>
        <Dropdown
          show={show}
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
        >
          {/* <Dropdown.Toggle as="a" className="dropdown-toggle">
            <Link href="/shop-right-sidebar">Menu</Link>
          </Dropdown.Toggle> */}

          <Link href="/shop-right-sidebar" passHref legacyBehavior>
            <Dropdown.Toggle as="a" className="dropdown-toggle">
              <a
                onClick={() => {
                  localStorage.removeItem("categoryId");
                }}
              >
                Menu
              </a>
            </Dropdown.Toggle>
          </Link>

          <Dropdown.Menu className="mega-menu">
            <div className="container">
              <div className="row gy-4">
                {categories.length === 0 ? (
                  <p>Loading categories...</p>
                ) : (
                  categories.map((category, index) => {
                    const imageUrl = `${basecatagories}category/${encodeURIComponent(
                      category.image
                    )}`;

                    return (
                      <div key={index} className="col-md-4 mega-card">
                        {" "}
                        {/* 3 per row */}
                        <Link
                          href={{
                            pathname: "/shop-right-sidebar",
                            query: { categoryId: category.categoryId },
                          }}
                        >
                          <div
                            className="mega-item"
                            onClick={() => {
                              localStorage.setItem(
                                "categoryId",
                                category.categoryId
                              );
                              window.dispatchEvent(new Event("storageUpdate"));
                            }}
                          >
                            <div className="mega-img">
                              <img
                                src={imageUrl}
                                alt={category.categoryName}
                                width={80}
                                height={80}
                              />
                            </div>
                            <div className="mega-content">
                              <h6 className="mega-title">
                                {category.categoryName}
                              </h6>
                              <p className="mega-desc">
                                {category.description
                                  ? category.description
                                      .split(" ")
                                      .slice(0, 7)
                                      .join(" ") +
                                    (category.description.split(" ").length > 7
                                      ? "..."
                                      : "")
                                  : ""}
                              </p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="d-flex justify-content-center mt-3">
                <Link href="/shop-right-sidebar">
                  <button className="btn-view-all">VIEW ALL MENU</button>
                </Link>
              </div>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </li>
      <li>
        <Link href="/delivery-partner">Delivery</Link>
      </li>

      <li>
        <Link href="/gallery">Gallery</Link>
      </li>

      <li>
        <Link href="/reservation">Catering</Link>
      </li>

      {/* <li>
        <Link href="/about">About</Link>
      </li> */}

      {/*     
    <li className="has-dropdown">
        <Link href="shop">
          Shop
          <i className="fas fa-angle-down" />
        </Link>
        <ul className="submenu">
          <li>
            <Link href="shop">Shop Grid</Link>
          </li>
          <li>
            <Link href="shop-list">Shop List</Link>
          </li>
          <li>
            <Link href="shop-left-sidebar">Shop Left SideBar</Link>
          </li>
          <li>
            <Link href="shop-right-sidebar">Shop Right SideBar</Link>
          </li>
          <li>
            <Link href="shop-single">Shop Single</Link>
          </li>
          <li>
            <Link href="shop-cart">Shop Cart</Link>
          </li>
          <li>
            <Link href="checkout">checkout</Link>
          </li>
        </ul>
    </li> */}
      {/*     
      <li>
        <Link href="news">
          Blog
          <i className="fas fa-angle-down" />
        </Link>
        <ul className="submenu">
          <li>
            <Link href="news">Blog</Link>
          </li>
          <li>
            <Link href="news-details">Blog Details</Link>
          </li>
        </ul>
      </li> */}

      {/* <li className="has-dropdown">
    <Link href="news">
     Pages
    <i className="fas fa-angle-down" />
    </Link>

      <ul className="submenu">
          <li>
      <Link href="about">About Us</Link>
          </li>
          <li className="has-dropdown">
            <Link href="team">
              Chef Page
              <i className="fas fa-angle-down" />
            </Link>
            <ul className="submenu">
              <li>
                <Link href="team">Chef</Link>
              </li>
              <li>
                <Link href="team-details">Chef Details</Link>
              </li>
            </ul>
          </li>
          <li className="has-dropdown">
            <Link href="food-menu">
              Food Menu
              <i className="fas fa-angle-down" />
            </Link>
            <ul className="submenu">
              <li>
                <Link href="food-menu">Food Menu 01</Link>
              </li>
              <li>
                <Link href="food-menu-2">Food Menu 02</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link href="gallery">Gallery</Link>
          </li>
          <li>
            <Link href="testimonial">testimonial</Link>
          </li>
          <li>
            <Link href="reservation">Reservation</Link>
          </li>
          <li>
            <Link href="faq">Faq's</Link>
          </li>
          <li>
            <Link href="404">404 Page</Link>
          </li>
        </ul>
      </li> */}

      <li>
        <Link href="contact">Contact</Link>
      </li>
    </ul>
  );
};

const Header1 = () => {
  const [toggle, setToggle] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    getCartData();
  }, []);
  const getCartData = async () => {
    try {
      let uuid = Cookies.get("uuid");
      let id_token = localStorage.getItem("id_token");
      const res = await axios.post(`${base_url}/api/GetCartItem`, {
        resturantId: resturantId,
        user_uuid: uuid,
        idToken: id_token,
      });

      const data = res?.data?.data;
      if (Array.isArray(data)) {
        setCartItems(data);
      } else {
        setCartItems([]); // fallback if API returns weird data
      }
    } catch (error) {
      console.error("Add to cart failed:", error);
      setCartItems([]);
    }
  };

  const calculateCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.menuPrice || item.price) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return total + price * quantity;
    }, 0);
  };
  const calculateTaxTotal = () => {
    let subtotal = cartItems.reduce((total, item) => {
      const price = parseFloat(item.menuPrice || item.price) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return total + price * quantity;
    }, 0);
    let taxAmount = (6 / 100) * subtotal;
    // let total = subtotal + taxAmount;
    return taxAmount;
  };
  return (
    <Fragment>
      <header className="section-bg">
        {/* <div className="header-top">
          <div className="container">
            <div className="header-top-wrapper">
              <ul>
                <li>
                  <span>100%</span> Secure delivery without contacting the
                  courier
                </li>
                <li>
                  <i className="fas fa-truck" />
                  Track Your Order
                </li>
              </ul>
              <div className="top-right">
                <div className="search-wrp">
                  <button>
                    <i className="far fa-search" />
                  </button>
                  <input placeholder="Search" aria-label="Search" />
                </div>
                <div className="social-icon d-flex align-items-center">
                  <a href="#">
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a href="#">
                    <i className="fab fa-twitter" />
                  </a>
                  <a href="#">
                    <i className="fab fa-vimeo-v" />
                  </a>
                  <a href="#">
                    <i className="fab fa-pinterest-p" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div id="header-sticky" className="header-1">
          <div className="container">
            <div className="mega-menu-wrapper">
              <div className="header-main">
                <div className="logo">
                  <Link href="/" className="header-logo">
                    <img
                      src="assets/img/logo/output-onlinepngtools.png"
                      alt="logo-img" width={100} height={100}
                    />
                  </Link>
                </div>
                <div className="header-left">
                  <div className="mean__menu-wrapper d-none d-lg-block">
                    <div className="main-menu">
                      <nav id="mobile-menu">
                        <Menus />
                      </nav>
                      {/* for wp */}
                    </div>
                  </div>
                </div>
                <div className="header-right d-flex justify-content-end align-items-center">
                  <div className="menu-cart d-xl-block">
                    <div className="cart-box">
                      {cartItems.map((item, i) => (
                        <ul key={i}>
                          <li>
                            <img
                              src={`${basecatagories}menu/${encodeURIComponent(
                                item.image
                              )}`}
                              alt="image"
                            />
                            <div className="cart-product">
                              <a href="#0">{item.menuName}</a>
                              <span>
                                {(
                                  (parseFloat(item.menuPrice) || 0) *
                                  (parseInt(item.quantity) || 0)
                                ).toFixed(2)}
                                $
                              </span>
                            </div>
                          </li>
                        </ul>
                      ))}
                      <div className="shopping-items d-flex align-items-center justify-content-between">
                        <span>&nbsp;</span>
                        <span>
                          Total : $
                          {(calculateCartTotal() + calculateTaxTotal()).toFixed(
                            2
                          )}
                        </span>
                      </div>
                      <div className="cart-button d-flex justify-content-between mb-4">
                        <Link href="shop-cart" className="theme-btn">
                          View Cart
                        </Link>
                        <Link href="checkout" className="theme-btn bg-red-2">
                          Checkout
                        </Link>
                      </div>
                    </div>
                    <Link href="shop-cart" className="cart-icon">
                      <i className="far fa-shopping-basket" />
                      {cartItems.length > 0 && (
                        <span
                          style={{
                            position: "absolute",
                            top: "-7px",
                            right: "-8px",
                            width: "16px",
                            height: "16px",
                            lineHeight: "16px",
                            borderRadius: "50%",
                            backgroundColor: "var(--header)", // fallback to '#ff0000' or any color
                            color: "var(--white)", // fallback to '#ffffff'
                            fontSize: "12px",
                            textAlign: "center",
                            fontWeight: 500,
                          }}
                        >
                          {cartItems.length}
                        </span>
                      )}
                    </Link>
                  </div>
                  <div className="header-button">
                    <Link href="contact" className="theme-btn bg-red-2">
                      contact us
                    </Link>
                  </div>
                  <div className="header__hamburger d-xl-block my-auto">
                    <div className="sidebar__toggle">
                      <div
                        className="header-bar"
                        onClick={() => setToggle(true)}
                      >
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="search-wrap">
        <div className="search-inner">
          <i className="fas fa-times search-close" id="search-close" />
          <div className="search-cell">
            <form method="get">
              <div className="search-field-holder">
                <input
                  type="search"
                  className="main-search-input"
                  placeholder="Search..."
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <Sidebar toggle={toggle} setToggle={setToggle} />
    </Fragment>
  );
};

const Header2 = () => {
  return (
    <Fragment>
      <header>
        <div id="header-sticky" className="header-2">
          <div className="container-fluid">
            <div className="mega-menu-wrapper">
              <div className="header-main">
                <div className="header-left">
                  <div className="logo">
                    <Link href="/" className="header-logo">
                      <img src="assets/img/logo/logo-3.svg" alt="logo-img" />
                    </Link>
                  </div>
                  <div className="logo-2">
                    <Link href="/" className="header-logo">
                      <img src="assets/img/logo/logo.svg" alt="logo-img" />
                    </Link>
                  </div>
                </div>
                <div className="header-right d-flex justify-content-end align-items-center">
                  <div className="mean__menu-wrapper d-none d-lg-block">
                    <div className="main-menu">
                      <nav id="mobile-menu">
                        <Menus />
                      </nav>
                      {/* for wp */}
                    </div>
                  </div>
                  <a href="#0" className="search-trigger search-icon">
                    <i className="fal fa-search" />
                  </a>
                  <div className="menu-cart">
                    <div className="cart-box">
                      <ul>
                        <li>
                          <img src="assets/img/shop-food/s2.png" alt="image" />
                          <div className="cart-product">
                            <a href="#0">grilled chiken</a>
                            <span>168$</span>
                          </div>
                        </li>
                      </ul>
                      <ul>
                        <li className="border-none">
                          <img src="assets/img/shop-food/s3.png" alt="image" />
                          <div className="cart-product">
                            <a href="#0">grilled chiken</a>
                            <span>168$</span>
                          </div>
                        </li>
                      </ul>
                      <div className="shopping-items d-flex align-items-center justify-content-between">
                        <span>Shopping : $20.00</span>
                        <span>Total : $168.00</span>
                      </div>
                      <div className="cart-button d-flex justify-content-between mb-4">
                        <Link href="shop-cart" className="theme-btn">
                          View Cart
                        </Link>
                        <Link href="checkout" className="theme-btn bg-red-2">
                          Checkout
                        </Link>
                      </div>
                    </div>
                    <Link href="shop-cart" className="cart-icon">
                      <i className="far fa-shopping-cart" />
                    </Link>
                  </div>
                  <div className="header-button">
                    <a
                      hLinkef="shop-single"
                      className="theme-btn bg-transparent"
                    >
                      <span className="button-content-wrapper d-flex align-items-center">
                        <span className="button-icon">
                          <i className="flaticon-delivery" />
                        </span>
                        <span className="button-text">order now</span>
                      </span>
                    </a>
                  </div>
                  <div className="header__hamburger d-xl-block my-auto">
                    <div className="sidebar__toggle">
                      <img
                        src="assets/img/logo/bar.svg"
                        alt="bar-icon"
                        className="bar-1"
                      />
                      <img
                        src="assets/img/logo/bar-2.svg"
                        alt="bar-icon"
                        className="bar-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Sidebar />
    </Fragment>
  );
};

const Sidebar = ({ toggle, setToggle }) => {
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [routepath, setRoutepath] = useState("");
  const [userMode, setUserMode] = useState(null); // Guest or LoginUser

  const OrderHistory = async () => {
    setRoutepath("/orderhistory");
    const auth = getAuth();
    const user = await new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        unsubscribe();
        resolve(firebaseUser);
      });
    });
    if (!user) {
      setShowLoginModal(true);
      return;
    } else {
      router.push("/orderhistory");
    }
  };

  const MyProfile = async () => {
    setRoutepath("/orderhistory");
    const auth = getAuth();
    const user = await new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        unsubscribe();
        resolve(firebaseUser);
      });
    });
    if (!user) {
      setShowLoginModal(true);
      return;
    } else {
      router.push("/orderhistory");
    }
  };

  const handleFirebaseLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      localStorage.setItem("userLog", "LoginUser");
      setUserMode("LoginUser");
      router.push(routepath);
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  return (
    <Fragment>
      <div className="fix-area">
        <div className={`offcanvas__info ${toggle ? "info-open" : ""}`}>
          <div className="offcanvas__wrapper">
            <div className="offcanvas__content">
              <div className="offcanvas__top mb-5 d-flex justify-content-between align-items-center">
                <div className="offcanvas__logo">
                  <Link href="/">
                    <img src="assets/img/logo/logo.svg" alt="logo-img" />
                  </Link>
                </div>
                <div className="offcanvas__close">
                  <button onClick={() => setToggle(false)}>
                    <i className="fas fa-times" />
                  </button>
                </div>
              </div>
              <MobileMenu />

              <div className="offcanvas__contact">
                <h4>Contact Info</h4>
                <ul>
                  <li className="d-flex align-items-center">
                    <div className="offcanvas__contact-icon">
                      <i className="fal fa-map-marker-alt" />
                    </div>
                    <div className="offcanvas__contact-text">
                      <a target="_blank" href="#">
                        4307 St Barnabas Rd, Marlow Heights, MD 20748
                      </a>
                    </div>
                  </li>
                  <li className="d-flex align-items-center">
                    <div className="offcanvas__contact-icon mr-15">
                      <i className="fal fa-envelope" />
                    </div>
                    <div className="offcanvas__contact-text">
                      <a href="tel:+013-003-003-9993">
                        <span className="mailto:info@enofik.com">
                          safahalalmd@gmail.com
                        </span>
                      </a>
                    </div>
                  </li>
                  <li className="d-flex align-items-center">
                    <div className="offcanvas__contact-icon mr-15">
                      <i className="fal fa-clock" />
                    </div>
                    <div className="offcanvas__contact-text">
                      <a target="_blank" href="#">
                        Mod-friday, 09am -05pm
                      </a>
                    </div>
                  </li>
                  <li className="d-flex align-items-center">
                    <div className="offcanvas__contact-icon mr-15">
                      <i className="far fa-phone" />
                    </div>
                    <div className="offcanvas__contact-text">
                      <a href="tel:+1 (240) 455-7998">+1 (240) 455-7998</a>
                    </div>
                  </li>
                </ul>
                <div className="header-button mt-4" style={{ cursor: "pointer" }}>
                  <div onClick={MyProfile} className="theme-btn">
                    <span className="button-content-wrapper d-flex align-items-center justify-content-center">
                      <span className="button-icon">
                        <i className="flaticon-delivery" />
                      </span>
                      <span className="button-text">My Profile</span>
                    </span>
                  </div>
                </div>
                <div className="header-button mt-4">
                  <Link href="shop-right-sidebar" className="theme-btn">
                    <span className="button-content-wrapper d-flex align-items-center justify-content-center">
                      <span className="button-icon">
                        <i className="flaticon-delivery" />
                      </span>
                      <span className="button-text">order now</span>
                    </span>
                  </Link>
                </div>

                <div className="header-button mt-4" style={{ cursor: "pointer" }}>
                  <div onClick={OrderHistory} className="theme-btn">
                    <span className="button-content-wrapper d-flex align-items-center justify-content-center">
                      <span className="button-icon">
                        <i className="flaticon-delivery" />
                      </span>
                      <span className="button-text">Order History</span>
                    </span>
                  </div>
                </div>
                <div className="social-icon d-flex align-items-center">
                  <a
                    href="https://www.facebook.com/profile.php?id=61569094628655"
                    target="_blank"
                  >
                    <i className="fab fa-facebook-f" />
                  </a>
                  <a href="#">
                    <i className="fab fa-twitter" />
                  </a>
                  <a
                    href="https://youtube.com/@safahalal-d7w?si=pP2T3B6xXzzIbVYD"
                    target="_blank"
                  >
                    <i className="fab fa-youtube" />
                  </a>
                  <a href="#">
                    <i className="fab fa-linkedin-in" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`offcanvas__overlay ${toggle ? "overlay-open" : ""}`}
        onClick={() => setToggle(false)}
      />
      {/* Modal */}
      <Modal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        centered
      >
        <Modal.Body className="login-modal-body text-center">
          <img
            src="https://i.ibb.co/mFPTyM16/Chat-GPT-Image-Jul-3-2025-01-29-11-PM-Photoroom.jpg"
            alt="Login Illustration"
            height={200}
            width={200}
          />
          <h5 className="modal-title-text">Do you want to login ?</h5>
          <p className="modal-subtext">
            If you log in, you will able to see your Transaction.
          </p>
          <div className="modal-button-group">
            {/* <Button variant="success" className="modal-btn guest" onClick={ContinueAsGuest}>
              Guest
            </Button> */}
            <Button
              variant="success"
              className="modal-btn login"
              onClick={handleFirebaseLogin}
            >
              Login
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

const MobileMenu = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const [multiMenu, setMultiMenu] = useState("");
  const activeMenuSet = (value) =>
      setActiveMenu(activeMenu === value ? "" : value),
    activeLi = (value) =>
      value === activeMenu ? { display: "block" } : { display: "none" };
  const multiMenuSet = (value) =>
      setMultiMenu(multiMenu === value ? "" : value),
    multiMenuActiveLi = (value) =>
      value === multiMenu ? { display: "block" } : { display: "none" };
  return (
    <div className="mobile-menu fix mb-3 mean-container d-block d-lg-none">
      <div className="mean-bar">
        <a href="#nav" className="meanmenu-reveal">
          <span>
            <span>
              <span />
            </span>
          </span>
        </a>
        <nav className="mean-nav">
          <ul>
            <li className="has-dropdown active">
              <Link href="/">
                Home Page
                <i className="fas fa-angle-down" />
              </Link>
            </li>
            <li className="has-dropdown">
              <Link href="/shop-right-sidebar">
                Menu
                <i className="fas fa-angle-down" />
              </Link>
            </li>
            <li className="has-dropdown">
              <Link href="/delivery-partner">
                Delivery
                <i className="fas fa-angle-down" />
              </Link>
            </li>
            <li className="has-dropdown">
              <Link href="/gallery">
                Gallery
                <i className="fas fa-angle-down" />
              </Link>
            </li>
            <li className="has-dropdown">
              <Link href="/reservation">
                Catering
                <i className="fas fa-angle-down" />
              </Link>
            </li>
            {/* <li className="has-dropdown">
              <Link href="/about">
                About
                <i className="fas fa-angle-down" />
              </Link>
            </li> */}
            <li className="has-dropdown">
              <Link href="/shop-cart">
                Cart
                <i className="fas fa-angle-down" />
              </Link>
            </li>
            <li className="mean-last">
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
