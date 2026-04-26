"use client";
import React, { useState, useEffect } from "react";
import Cta from "@/components/Cta";
import PageBanner from "@/components/PageBanner";
import FoodKingLayout from "@/layouts/FoodKingLayout";
import { base_url, resturantId } from "@/utility/config";
import { loadStripe } from "@stripe/stripe-js";
import Cookies from "js-cookie";
import axios from "axios";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../utility/firebase/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Modal, Button } from "react-bootstrap";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
import Swal from "sweetalert2";

const page = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [billingType, setBillingType] = useState("Pickup");
  const [loading, setLoading] = useState(false);

  const [userMode, setUserMode] = useState(null); // Guest or LoginUser
  const [user, setUser] = useState(null); // Guest or LoginUser

  // ✅ Check login mode from localStorage
  useEffect(() => {
    const mode = localStorage.getItem("userLog");
    setUserMode(mode);

    if (mode === "LoginUser") {
      fetchUserDetails();
    }
  }, []);

  // ✅ Fetch user details if logged in
  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const auth = getAuth();
      const user = await new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          unsubscribe();
          resolve(firebaseUser);
        });
      });
      const id_token = await user.getIdToken();
      localStorage.setItem('id_token', id_token)
      const res = await axios.post(`${base_url}/api/LoginUserDetails`, {
        idToken: id_token,
      });
      if (res.data?.status) {
        setUser(res.data?.data)
      }
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch user details", err);
    }
  };

  const calculateCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.menuPrice) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return total + price * quantity;
    }, 0);
  };

  const calculateTaxTotal = () => {
    const subtotal = calculateCartTotal();
    return (6 / 100) * subtotal;
  };

  const calculateQuantity = () => {
    let count = 0;
    cartItems.forEach((element) => {
      count = count + parseInt(element.quantity);
    });
    return count;
  };

  useEffect(() => {
    getCartData();
  }, []);

  const getCartData = async () => {
    try {
      const uuid = Cookies.get("uuid");
      const id_token = localStorage.getItem("id_token");
      const res = await axios.post(`${base_url}/api/GetCartItem`, {
        resturantId: resturantId,
        user_uuid: uuid,
        idToken: id_token,
      });

      const data = res?.data?.data;
      if (Array.isArray(data)) {
        setCartItems(data);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Add to cart failed:", error);
      setCartItems([]);
    }
  };

  const handleCheckout = async () => {
    const res = await axios.get(`${base_url}/api/checkKDSOnline/${resturantId}`);
    if (res?.data?.status) {
      const auth = getAuth();
      const user = await new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          unsubscribe();
          resolve(firebaseUser);
        });
      });
      console.log(user, userMode);
      if (!user && userMode !== "LoginUser") {
        setShowLoginModal(true);
        return;
      }
      await makeCheckout();
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: res.data?.message,
      });
    }
  };

  const handleFirebaseLogin = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      localStorage.setItem("userLog", "LoginUser");
      setUserMode("LoginUser");
      fetchUserDetails();
      await makeCheckout();
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const ContinueAsGuest = async () => {
    localStorage.setItem("userLog", "Guest");
    setUserMode("Guest");
    await makeCheckout();
    setShowLoginModal(false);
  };

  const makeCheckout = async () => {
    const Total_amount = parseFloat(calculateCartTotal() + calculateTaxTotal());

    const res = await fetch(`${base_url}/api/createSession`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        unit_amount: Total_amount.toFixed(2),
        quantity: 1,
        name: `${firstName} ${lastName}`,
        email,
        phoneNo: phone,
        address,
        orderType: billingType,
        totalqty: calculateQuantity(),
        total: calculateCartTotal().toFixed(2),
        taxAmount: calculateTaxTotal().toFixed(2),
        subtotal: parseFloat(calculateCartTotal().toFixed(2)) + parseFloat(calculateTaxTotal().toFixed(2)),
        resturantId: resturantId
      }),
    });

    const data = await res.json();
    if (!data.id) {
      alert("Failed to create Stripe session");
      return;
    }
    const stripePromise = loadStripe(data?.publicKey);
    const stripe = await stripePromise;
    const result = await stripe.redirectToCheckout({
      sessionId: data.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  const handleBillingChange = (e) => {
    const value = e.target.value;
    setBillingType(value);

    if (value === "Delivery") {
      router.push("/delivery-partner");
    }
  };

  return (
    <FoodKingLayout>
      {/* {loading && <Loader />} */}
      <PageBanner pageName={"CHECKOUT"} pageKey={"CHECKOUT"} />
      <section className="checkout-section fix section-padding border-bottom">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <form>
                <div className="row g-4">
                  <div className="col-md-7 col-lg-8 col-xl-12">
                    <div className="checkout-single-wrapper">
                      <div className="checkout-single boxshado-single">
                        {/* ✅ Dynamic title */}
                        <h4 className="d-flex align-items-center justify-content-between">
                          <div>
                            {user ? (
                              <p>Welcome, {user.customerName} ({user.customerEmail})</p>
                            ) : 'Login as Guest'}
                            <br />
                            <span>Billing address</span>
                          </div>
                          <span>
                            <label>
                              <input
                                type="radio"
                                name="billingType"
                                value="Pickup"
                                checked={billingType === "Pickup"}
                                onChange={handleBillingChange}
                              />{" "}
                              Pickup
                            </label>
                            <label style={{ marginRight: "15px" }}>
                              <input
                                type="radio"
                                name="billingType"
                                value="Delivery"
                                checked={billingType === "Delivery"}
                                onChange={handleBillingChange}
                              />{" "}
                              Delivery
                            </label>
                          </span>
                        </h4>

                        {/* Form */}
                        <div className="checkout-single-form">
                          <div className="row g-4">
                            <div className="col-lg-6">
                              <div className="input-single">
                                <input
                                  type="text"
                                  placeholder="First Name"
                                  value={firstName}
                                  onChange={(e) => setFirstName(e.target.value)}
                                  required
                                />
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="input-single">
                                <input
                                  type="text"
                                  placeholder="Last Name"
                                  value={lastName}
                                  onChange={(e) => setLastName(e.target.value)}
                                  required
                                />
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="input-single">
                                <input
                                  type="email"
                                  placeholder="Your Email"
                                  value={email}
                                  onChange={(e) => setEmail(e.target.value)}
                                  required
                                />
                              </div>
                            </div>

                            <div className="col-lg-6">
                              <div className="input-single">
                                <input
                                  type="tel"
                                  placeholder="Phone Number"
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                  required
                                />
                              </div>
                            </div>

                            <div className="col-lg-12">
                              <div className="input-single">
                                <textarea
                                  placeholder="Address"
                                  value={address}
                                  onChange={(e) => setAddress(e.target.value)}
                                  required
                                />
                              </div>
                            </div>
                          </div>

                          <div className="mt-4" style={{ textAlign: "center" }}>
                            <div
                              onClick={handleCheckout}
                              className="theme-btn border-radius-none"
                              style={{ cursor: "pointer" }}
                            >
                              Payment Now
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Cta />

      {/* Modal */}
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)} centered>
        <Modal.Body className="login-modal-body text-center">
          <img
            src="https://i.ibb.co/mFPTyM16/Chat-GPT-Image-Jul-3-2025-01-29-11-PM-Photoroom.jpg"
            alt="Login Illustration"
            height={200}
            width={200}
          />
          <h5 className="modal-title-text">Do you want to proceed you next process as a guest or Email Login?</h5>
          <p className="modal-subtext">

          </p>
          <div className="modal-button-group">
            <Button variant="success" className="modal-btn guest" onClick={ContinueAsGuest}>
              Guest
            </Button>
            <Button variant="outline-secondary" className="modal-btn login" onClick={handleFirebaseLogin}>
              Login
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </FoodKingLayout>
  );
};

export default page;
