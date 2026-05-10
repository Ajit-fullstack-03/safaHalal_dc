"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Cta from "@/components/Cta";
import PageBanner from "@/components/PageBanner";
import FoodKingLayout from "@/layouts/FoodKingLayout";
import Link from "next/link";
import basecatagories, { storeId } from "@/utility/config";
import Swal from "sweetalert2";
import { base_url, resturantId } from "@/utility/config";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
const stripePromise = loadStripe(
  "pk_test_51QQqgXAxdNbSCuvgji1fjm36pgrF3a3Kxed1uKRdQKdt94NiomVbHcYVofEV6UwBsq8E6FTAUTKbdEm2Otb4G1P900sF8MmmaB",
);

const page = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getCartData();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const sessionId = params.get("sessionId");
      const name = params.get("name") || "";
      const email = params.get("email") || "";
      const phoneNo = params.get("phoneNo") || "";
      const address = params.get("address") || "";
      const totalqty = params.get("totalqty") || "";
      const total = params.get("total") || "";
      const taxAmount = params.get("taxAmount") || "";
      const subtotal = params.get("subtotal") || "";
      const orderType = params.get("orderType") || "";
      if (sessionId) {
        orderCreateApi(
          name,
          email,
          phoneNo,
          address,
          sessionId,
          totalqty,
          total,
          taxAmount,
          subtotal,
          orderType,
        );
      }
    }
  }, []);

  const calculateQuantity = () => {
    let count = 0;
    cartItems.forEach((element) => {
      count = count + parseInt(item.quantity);
    });
    return count;
  };

  const orderCreateApi = async (
    name,
    email,
    phoneNo,
    address,
    sessionId,
    totalqty,
    total,
    taxAmount,
    subtotal,
    orderType,
  ) => {
    try {
      // 1. Check session status
      setLoading(true);
      const sessionRes = await axios.post(
        `${base_url}/api/checkSessionStatus`,
        { sessionId, resturantId },
        {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
        },
      );

      if (sessionRes.data && sessionRes.data.payment_status === "paid") {
        const orderRes = await axios.post(
          `${base_url}/api/OrderCreate`,
          {
            resturantId: resturantId,
            name,
            email,
            phoneNo,
            address,
            totalqty,
            total,
            taxAmount,
            subtotal,
            user_uuid: Cookies.get("uuid"),
            orderType,
            idToken: localStorage.getItem("id_token"),
          },
          {
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
            },
          },
        );
        if (orderRes.data?.status) {
          setLoading(false);
          Swal.fire({
            icon: "success",
            title: "Confirmed",
            text: orderRes.data?.message,
            confirmButtonText: "Ok.",
          }).then((result) => {
            if (result.isConfirmed) {
              router.push("/");
            }
          });
        } else {
          setLoading(false);
          Swal.fire({
            icon: "error",
            title: "Failed",
            text: "Something went wrong. Please try again.",
          });
        }
      } else {
        setLoading(false);
        console.warn("Session is invalid or expired.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during session check or order creation:", error);
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

  const incrementQuantity = (index) => {
    const newCartItems = [...cartItems];
    newCartItems[index].quantity = parseInt(newCartItems[index].quantity) + 1;
    setCartItems(newCartItems);
    UpdateCartData(newCartItems[index].quantity, newCartItems[index].cartId);
  };

  const decrementQuantity = (index) => {
    const newCartItems = [...cartItems];
    const currentQty = parseInt(newCartItems[index].quantity);
    if (currentQty > 1) {
      newCartItems[index].quantity = currentQty - 1;
      setCartItems(newCartItems);
      UpdateCartData(newCartItems[index].quantity, newCartItems[index].cartId);
    }
  };

  const removeItem = async (index) => {
    const newCartItems = [...cartItems];
    let uuid = Cookies.get("uuid");
    let cartId = newCartItems[index].cartId;
    let id_token = localStorage.getItem("id_token");

    Swal.fire({
      icon: "question",
      title: "Are you Sure?",
      text: "You want to remove this item from Cart.",
      confirmButtonText: "Ok.",
      cancelButtonText: "Cancel.",
    }).then(async (result) => {
      // 👈 make this async
      if (result.isConfirmed) {
        try {
          setLoading(true);
          const res = await axios.post(`${base_url}/api/deleteCartItem`, {
            resturantId: resturantId,
            user_uuid: uuid,
            idToken: id_token,
            cartId,
          });
          setLoading(false);
          if (res.data?.status) {
            Swal.fire({
              icon: "success",
              title: "Item Removed.",
              text: res.data?.message,
              confirmButtonText: "Ok.",
            }).then(() => getCartData());
          } else {
            Swal.fire({
              icon: "error",
              title: "Failed",
              text: "Something went wrong. Please try again.",
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message || "Request failed",
          });
        }
      }
    });
  };

  const getCartData = async () => {
    try {
      let uuid = Cookies.get("uuid");
      let id_token = localStorage.getItem("id_token");
      // setLoading(true);
      const res = await axios.post(`${base_url}/api/GetCartItem`, {
        resturantId: resturantId,
        user_uuid: uuid,
        idToken: id_token,
      });

      const data = res?.data?.data;
      // setLoading(false);
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
  const UpdateCartData = async (quantity, cartId) => {
    try {
      let uuid = Cookies.get("uuid");
      let id_token = localStorage.getItem("id_token");
      const res = await axios.post(`${base_url}/api/updateCartItemQuantity`, {
        resturantId: resturantId,
        user_uuid: uuid,
        idToken: id_token,
        quantity,
        cartId,
      });
      if (res.data?.status) {
        getCartData();
        // Swal.fire({
        //   icon: "success",
        //   title: "Cart Updated.",
        //   text: "Cart Item updated successfully.",
        //   confirmButtonText: "Ok.",
        // }).then((result) => {
        //   if (result.isConfirmed) {
        //     getCartData();
        //   }
        // });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error("Add to cart failed:", error);
      setCartItems([]);
    }
  };

  const getNonEmptyDetails = (details, key = "normal") => {
    const output = [];
    details = JSON.parse(details);
    // Define categories
    const normalCategories = [
      "fish",
      "side",
      "soda",
      "sauce",
      "style",
      "chrust",
      "topping",
      "ingredient",
      "meatpreparation",
    ];

    const extraCategories = [
      "Extrafish",
      "Extraside",
      "Extrasoda",
      "Extrasauce",
      "Extrastyle",
      "Extrachrust",
      "Extratopping",
      "Extraingredient",
      "Extrameatpreparation",
      "Extracombotag",
      "Extraextra",
    ];

    // Choose categories based on 'key' (normal or extra)
    const categories = key === "normal" ? normalCategories : extraCategories;

    // Loop through the categories
    categories.forEach((category) => {
      const categoryData = details[category];
      // Check if data exists and is a non-empty array
      if (Array.isArray(categoryData) && categoryData.length > 0) {
        const categoryItems = categoryData.map((item) => {
          // Default item data
          const name =
            item.toppingName ||
            item.chrustName ||
            item.ingredientName ||
            item.styleName ||
            item.fishName ||
            item.meatpreparationName ||
            item.sideName ||
            item.extraName ||
            item.sodaName ||
            item.sauceName ||
            item.combotagName ||
            "Unnamed";
          const type = item.type || "";
          const price = item.price || "";
          let description = `${name}`;

          // Add type and price information if available
          if (type) description += ` - ${type}`;
          if (price) description += ` - $${price}`;
          return description;
        });

        if (key != "normal") {
          category = category.replace("Extra", "");
        }
        // Join category data into output with category name
        output.push(`${capitalize(category)} - ${categoryItems.join(", ")}`);
      }
    });
    return output;
  };
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const handleCheckout = async () => {
    try {
      const res = await axios.get(
        `${base_url}/api/GetResturantDetails/${resturantId}/${storeId}`,
      );
      // ✅ correct extraction
      const operatingHoursStr = res.data.data.operatingHours;
      const dateTime = res.data.dateTime;
      const hours = JSON.parse(operatingHoursStr);

      const isOpen = isRestaurantOpen(hours, dateTime);
      if (!isOpen) {
        Swal.fire({
          icon: "error",
          title: "Restaurant Closed",
          text: "Sorry, the Restaurant is Currently Closed.",
        });
        return;
      }
      // ✅ OPEN → redirect
      router.push("/checkout");
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };
  const DAY_KEYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  const toMinutes = (time) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };

  const isRestaurantOpen = (operatingHours, currentDateTime) => {
    const now = new Date(currentDateTime.replace(" ", "T"));
    const todayKey = DAY_KEYS[now.getDay()];
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const todaySchedule = operatingHours.find((d) => d.day === todayKey);
    if (!todaySchedule) return false;

    const openMinutes = toMinutes(todaySchedule.openTime);
    const closeMinutes = toMinutes(todaySchedule.closeTime);
    // ✅ Normal case (same day)
    if (openMinutes < closeMinutes) {
      return currentMinutes >= openMinutes && currentMinutes <= closeMinutes;
    }
    // ✅ Overnight case (06:00 → 02:00)
    return currentMinutes >= openMinutes || currentMinutes <= closeMinutes;
  };
  return (
    <FoodKingLayout>
      {loading && <Loader />}
      <PageBanner pageName={"Cart"} pageKey={"Cart"} />
      <section className="cart-section section-padding fix">
        <div className="container">
          <div className="main-cart-wrapper">
            <div className="row">
              <div className="col-12">
                <div className="cart-wrapper">
                  <div className="cart-items-wrapper">
                    <table>
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Subtotal</th>
                          <th>Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(cartItems) && cartItems.length > 0 ? (
                          cartItems.map((item, index) => {
                            const details =
                              typeof item.details === "string"
                                ? JSON.parse(item.details)
                                : item.details;

                            const normalDetails = getNonEmptyDetails(
                              details,
                              "normal",
                            );
                            const extraDetails = getNonEmptyDetails(
                              details,
                              "extra",
                            );

                            return (
                              <tr key={index} className="cart-item">
                                <td className="cart-item-info">
                                  <img
                                    src={`${basecatagories}menu/${encodeURIComponent(
                                      item.image,
                                    )}`}
                                    alt={item.menuName || "Product"}
                                    height={90}
                                    width={90}
                                  />
                                  <div className="txt_title">
                                    <p
                                      style={{
                                        fontSize: "20px",
                                        fontWeight: "700",
                                      }}
                                    >
                                      {item.menuName}{" "}
                                    </p>
                                  </div>
                                  <p style={{ fontSize: "15px" }}>
                                    Size:{" "}
                                    <sapn
                                      style={{
                                        fontSize: "15px",
                                        color: "red",
                                        fontWeight: "700",
                                      }}
                                    >
                                      {item.sizeDetails}
                                    </sapn>{" "}
                                  </p>
                                  <div>
                                    {normalDetails.length > 0 && (
                                      <p style={{ fontSize: "15px" }}>
                                        {normalDetails.join(", ")}
                                      </p>
                                    )}
                                  </div>

                                  <div>
                                    {extraDetails.length > 0 && (
                                      <p style={{ fontSize: "15px" }}>
                                        <b>Extra:</b> {extraDetails.join(", ")}
                                      </p>
                                    )}
                                  </div>
                                </td>

                                <td className="cart-item-price">
                                  ${" "}
                                  <span className="base-price">
                                    {(parseFloat(item.menuPrice) || 0).toFixed(
                                      2,
                                    )}
                                  </span>
                                </td>
                                <td>
                                  <div className="cart-item-quantity">
                                    <span className="cart-item-quantity-amount">
                                      {item.quantity}
                                    </span>
                                    <div className="cart-item-quantity-controller">
                                      <Link
                                        href="#"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          incrementQuantity(index);
                                        }}
                                      >
                                        <i className="far fa-caret-up" />
                                      </Link>
                                      <Link
                                        href="#"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          decrementQuantity(index);
                                        }}
                                      >
                                        <i className="far fa-caret-down" />
                                      </Link>
                                    </div>
                                  </div>
                                </td>
                                <td className="cart-item-price">
                                  ${" "}
                                  <span className="total-price">
                                    {(
                                      (parseFloat(item.menuPrice) || 0) *
                                      (parseInt(item.quantity) || 0)
                                    ).toFixed(2)}
                                  </span>
                                </td>
                                <td className="cart-item-remove">
                                  <Link
                                    href="#"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      removeItem(index);
                                    }}
                                  >
                                    <i className="fas fa-times" />
                                  </Link>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan="5" style={{ textAlign: "center" }}>
                              Your cart is empty.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="cart-wrapper-footer">
                    <form onSubmit={(e) => e.preventDefault()}>
                      <input
                        type="text"
                        name="promo-code"
                        id="promoCode"
                        placeholder="Promo code"
                      />
                      <Link
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          // Add your promo code logic here
                        }}
                        className="theme-btn border-radius-none"
                      >
                        Apply Code
                      </Link>
                    </form>
                    <Link
                      href="/shop-cart"
                      className="theme-btn border-radius-none"
                    >
                      Update Cart
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6" />
              <div className="col-xl-6">
                <div className="cart-pragh-box">
                  <div className="cart-graph">
                    <h4>Cart Total</h4>
                    <ul>
                      <li>
                        <span>Subtotal</span>
                        <span>${calculateCartTotal().toFixed(2)}</span>
                      </li>
                      <li>
                        <span>Tax</span>
                        <span>${calculateTaxTotal().toFixed(2)}</span>
                      </li>
                      <li>
                        <span>Total</span>
                        <span>
                          {" "}
                          $
                          {(calculateCartTotal() + calculateTaxTotal()).toFixed(
                            2,
                          )}{" "}
                        </span>
                      </li>
                    </ul>
                    <div className="chck">
                      <div
                        onClick={handleCheckout}
                        className="theme-btn border-radius-none"
                      >
                        Checkout
                      </div>
                      {/* <Link
                        href="/checkout"
                        className="theme-btn border-radius-none"
                      >
                        Checkout
                      </Link> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Cta />
    </FoodKingLayout>
  );
};
export default page;
