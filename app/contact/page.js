"use client";
import React, { useState, useEffect } from "react";
import Cta from "@/components/Cta";
import PageBanner from "@/components/PageBanner";
import FoodKingLayout from "@/layouts/FoodKingLayout";
import axios from "axios";
import Swal from "sweetalert2";
import { base_url, resturantId } from "@/utility/config";
import Loader from "@/components/Loader";

const page = () => {
  const contactInfo = [
    {
      icon: "location.svg",
      title: "address line",
      content: "1917 18th St NW, Washington, DC 20009, United States",
      delay: ".3s",
    },
    {
      icon: "phone.svg",
      title: "Phone Number",
      content: "+1 202-885-9430",
      delay: ".5s",
      active: true,
    },
    {
      icon: "email.svg",
      title: "Mail Adress",
      content: "safahalaldc@gmail.com",
      delay: ".7s",
    },
  ];
  const [loading, setLoading] = useState(false);
  const handleContactSubmit = async (e) => {
    e.preventDefault();

    // Get form values
    const formData = {
      name: e.target.name.value.trim(),
      email: e.target.email.value.trim(),
      message: e.target.message.value.trim(),
    };

    // --- Validation ---
    const errors = [];
    if (!formData.name) errors.push("Name is required.");
    if (!formData.email) errors.push("Email is required.");
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.push("Enter a valid email.");
    if (!formData.message) errors.push("Message is required.");

    if (errors.length > 0) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        html: errors.join("<br/>"),
      });
      return;
    }

    try {
      setLoading(true);
      formData['resturantId'] = resturantId;
      const response = await axios.post(`${base_url}/api/SendContact`, formData);
      setLoading(false);
      if (response.data?.status) {
        Swal.fire({
          icon: "success",
          title: "Message Sent",
          text: response.data?.message ?? "Your message has been sent successfully!",
        });
        e.target.reset(); // clear form after success
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.data?.message ?? "Something went wrong.",
        });
      }
    } catch (error) {
      setLoading(false);
      console.error("Error sending contact form:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to send your message. Try again later.",
      });
    }
  };

  return (
    <FoodKingLayout>
      {loading && <Loader />}
      <PageBanner pageName={"Contact us"} pageKey={"Contact"} />
      {/*<< Contact Info Section Start >>*/}
      <section className="contact-info-section fix section-padding section-bg">
        <div className="container">
          <div className="row g-4">
            {contactInfo.map((item, index) => (
              <div
                key={index}
                className={`col-lg-4 col-md-6 wow fadeInUp`}
                data-wow-delay={item.delay}
              >
                <div
                  className={`contact-info-items ${item.active ? "active" : ""
                    } text-center`}
                >
                  <div className="icon">
                    <img src={`assets/img/icon/${item.icon}`} alt="icon-img" />
                  </div>
                  <div className="content">
                    <h3>{item.title}</h3>
                    <p>{item.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/*<< Contact Section Start >>*/}
      <section className="contact-section section-padding pt-0 section-bg">
        <div className="container">
          <div className="contact-area">
            <div className="row justify-content-between">
              <div className="col-xl-6 col-lg-6">
                <div className="map-content-area">
                  <h3 className="wow fadeInUp" data-wow-delay=".3s">
                    {" "}
                    Get in touch
                  </h3>
                  <p className="wow fadeInUp" data-wow-delay=".5s">
                    Visit us at Safa Halal or drop us a message anytime. <br />
                    We’re located in Marlow Heights, MD, <br />
                    and always happy to serve you fresh and delicious food.
                  </p>
                  <div className="google-map wow fadeInUp" data-wow-delay=".7s">
                    {/* <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3108.0894116339473!2d-76.94225039999999!3d38.8304131!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7bb0015a075e7%3A0xfe404e3acac76fb0!2sSafa%20Halal!5e0!3m2!1sen!2sin!4v1755755506141!5m2!1sen!2sin" 
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                    /> */}
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2837.5653849025784!2d-77.0414102!3d38.9160884!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7b7191526301d%3A0xc6a089f5ba241c92!2sSafa%20Halal!5e1!3m2!1sen!2sin!4v1777311373576!5m2!1sen!2sin"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy">

                    </iframe>
                  </div>
                </div>
              </div>
              <div className="col-xl-5 col-lg-5 mt-5 mt-lg-0">
                <div className="contact-form-items">
                  <div className="contact-title">
                    <h3 className="wow fadeInUp" data-wow-delay=".3s">
                      Fill Up The Form
                    </h3>
                    <p className="wow fadeInUp" data-wow-delay=".5s">
                      Your email address will not be published. Required fields
                      are marked *
                    </p>
                  </div>
                  <form id="contact-form" onSubmit={handleContactSubmit}>
                    <div className="row g-4">
                      <div
                        className="col-lg-12 wow fadeInUp"
                        data-wow-delay=".3s"
                      >
                        <div className="form-clt">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Your Name*"
                          />
                          <div className="icon">
                            <i className="fal fa-user" />
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-lg-12 wow fadeInUp"
                        data-wow-delay=".5s"
                      >
                        <div className="form-clt">
                          <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Email Address*"
                          />
                          <div className="icon">
                            <i className="fal fa-envelope" />
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-lg-12 wow fadeInUp"
                        data-wow-delay=".7s"
                      >
                        <div className="form-clt-big form-clt">
                          <textarea
                            name="message"
                            id="message"
                            placeholder="Enter Your Messege here"
                            defaultValue={""}
                          />
                          <div className="icon">
                            <i className="fal fa-edit" />
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-lg-6 wow fadeInUp"
                        data-wow-delay=".8s"
                      >
                        <button type="submit" className="theme-btn">
                          <span className="button-content-wrapper d-flex align-items-center">
                            <span className="button-icon">
                              <i className="fal fa-paper-plane" />
                            </span>
                            <span className="button-text">Get In Touch</span>
                          </span>
                        </button>
                      </div>
                    </div>
                  </form>
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
