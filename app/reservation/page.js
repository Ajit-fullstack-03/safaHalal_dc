"use client";
import Cta from "@/components/Cta";
import Marque from "@/components/Marque";
import PageBanner from "@/components/PageBanner";
import TestimonialSlider from "@/components/TestimonialSlider";
import FoodKingLayout from "@/layouts/FoodKingLayout";
import { useState } from "react";
import { base_url,resturantId } from "@/utility/config";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

const Page = () => {
  const router = useRouter();
  const [reservationForm, setReservationForm] = useState({
    customerName: "",
    noOfPerson: "",
    phoneNumber: "",
    date: "",
    email: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservationForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // stop page reload
      // --- Validation ---
      const errors = [];
      if (!reservationForm.customerName?.trim()) errors.push("Customer name is required.");
      if (!reservationForm.noOfPerson || isNaN(reservationForm.noOfPerson)) errors.push("Number of persons must be a number.");
      if (!reservationForm.phoneNumber?.trim()) errors.push("Phone number is required.");
      else if (!/^[0-9]{10}$/.test(reservationForm.phoneNumber)) errors.push("Phone number must be 10 digits.");
      if (!reservationForm.date) errors.push("Date is required.");
      if (!reservationForm.email?.trim()) errors.push("Email is required.");
      else if (!/\S+@\S+\.\S+/.test(reservationForm.email)) errors.push("Enter a valid email address.");

      if (errors.length > 0) {
        Swal.fire({
          icon: "warning",
          title: "Validation Error",
          html: errors.join("<br/>"), // show multiple errors in alert
        });
        return; // ❌ stop API call if validation fails
      }
    reservationForm['resturantId'] = resturantId;
    console.log("Reservation Data:", reservationForm);
    // 👉 here you can call API with reservationForm
    try {
      setLoading(true);
      const response = await axios.post(`${base_url}/api/reservation`,reservationForm);
      setLoading(false);
      if(response.data?.status){
        Swal.fire({
          icon: "success",
          title: "Confirmed",
          text: response.data?.message ?? "Somthing Went Wrong.",
          confirmButtonText: "Ok.",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/");
          }
        });
      }else{
        Swal.fire({
          icon: "error",
          title: "Opps...",
          text: "Somthing Went Wrong.",
          confirmButtonText: "Ok.",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/");
          }
        });
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching Blog details:", error);
      Swal.fire({
        icon: "error",
        title: "Opps...",
        text: "Somthing Went Wrong.",
        confirmButtonText: "Ok.",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/");
        }
      });
    }      
  }
  return (
    <FoodKingLayout>
      {loading && <Loader />}
      <PageBanner pageName={"Catering"} pageKey={"catering"} />

      <section className="booking-section fix section-bg section-padding mt-0">
        <div className="container">
          <div className="booking-wrapper">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <form
                  className="booking-contact mb-0 style-2 bg-cover"
                  style={{
                    backgroundImage: 'url("assets/img/shape/booking-shape.png")',
                  }}
                  onSubmit={handleSubmit}
                >
                  <h3 className="text-center mb-4 text-white wow fadeInUp">
                    Order your Catering
                  </h3>
                  <div className="booking-items">
                    <div className="row g-4">
                      <div className="col-lg-6">
                        <div className="form-clt">
                          <input
                            type="text"
                            name="customerName"
                            placeholder="Customer Name"
                            value={reservationForm.customerName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-clt">
                          <input
                            type="text"
                            name="noOfPerson"
                            placeholder="No of Person"
                            value={reservationForm.noOfPerson}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-clt">
                          <input
                            type="text"
                            name="phoneNumber"
                            placeholder="Phone Number"
                            value={reservationForm.phoneNumber}
                            onChange={handleChange}
                          />
                          <div className="icon">
                            <i className="fas fa-phone" />
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-clt">
                          <input
                            type="date"
                            name="date"
                            value={reservationForm.date}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="form-clt">
                          <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={reservationForm.email}
                            onChange={handleChange}
                          />
                          <div className="icon">
                            <i className="fal fa-envelope" />
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-clt">
                          <textarea
                            name="description"
                            placeholder="Special Request / Message"
                            value={reservationForm.description}
                            rows={5}
                            className="custom-textarea"
                            onChange={handleChange}
                          />
                          {/* <textarea
                            name="description"
                            placeholder="Special Request / Message"
                            value={reservationForm.description}
                            style={{ backgroundColor: "transparent", 
                              color: "white" , paddingLeft:'20px', border:'0.5px solid #898987ff', 
                              borderRadius:'5px', width:"100%",height: "120px"}}
                            onChange={handleChange}
                          /> */}
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="form-clt">
                          <button type="submit" className="theme-btn bg-yellow">
                            Send
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TestimonialSlider sectionBg={false} />
      <Marque pt={10} />
      <Cta />
    </FoodKingLayout>
  );
};

export default Page;
