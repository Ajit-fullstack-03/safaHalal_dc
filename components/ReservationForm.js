// import Link from "next/link";
// import NiceSelect from "./NiceSelect";

// const ReservationForm = () => {
//   return (
//     <div
//       className="booking-contact bg-cover"
//       style={{
//         backgroundImage: 'url("assets/img/shape/booking-shape.png")',
//       }}
//     >
//       <h4 className="text-center text-white">create an reservation</h4>
//       <div className="booking-items">
//         <div className="form-clt">
//           <NiceSelect
//             option={[
//               { id: 1, name: "1 People", value: "1-people" },
//               { id: 2, name: "2 People", value: "2-people" },
//               { id: 3, name: "3 People", value: "3-people" },
//             ]}
//             className="no-of-person"
//           />
//         </div>
//         <div className="form-clt">
//           <input
//             type="text"
//             name="number"
//             id="number"
//             placeholder="phone number"
//           />
//           <div className="icon">
//             <i className="fas fa-phone" />
//           </div>
//         </div>
//         <div className="form-clt">
//           <input type="date" id="date" name="date" />
//         </div>
//         <div className="form-clt">
//           <Link href="/reservation" className="theme-btn bg-yellow">
//             booking now
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default ReservationForm;

"use client";
import { useState } from "react";
import { base_url, resturantId } from "@/utility/config";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import NiceSelect from "./NiceSelect";
import Loader from "./Loader";

const ReservationForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phoneNumber: "",
    date: "",
    noOfPerson: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelect = (value) => {
    setForm((prev) => ({
      ...prev,
      noOfPerson: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // --- Validation ---
    const errors = [];
    if (!form.customerName.trim()) errors.push("Name is required.");
    if (!form.email.trim()) errors.push("Email is required.");
    else if (!/\S+@\S+\.\S+/.test(form.email)) errors.push("Invalid email format.");
    if (!form.phoneNumber.trim()) errors.push("Phone number is required.");
    else if (!/^[0-9]{10}$/.test(form.phoneNumber)) errors.push("Phone number must be 10 digits.");
    if (!form.date) errors.push("Date is required.");
    if (!form.noOfPerson) errors.push("Number of persons is required.");
    if (!form.description.trim()) errors.push("Description is required.");

    if (errors.length > 0) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        html: errors.join("<br/>"),
      });
      return;
    }

    const payload = { ...form, resturantId };

    try {
      setLoading(true);
      const response = await axios.post(`${base_url}/api/reservation`, payload);
      if (response.data?.status) {
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Reservation Confirmed",
          text: response.data?.message ?? "Your reservation is confirmed.",
        }).then((res) => {
          if (res.isConfirmed) {
            router.push("/"); // redirect after success
          }
        });
      } else {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: response.data?.message ?? "Something went wrong.",
        });
      }
    } catch (error) {
      console.error("Reservation error:", error);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while booking.",
      });
    }
  };

  return (
    <form
      className="booking-contact bg-cover"
      style={{ backgroundImage: 'url("assets/img/shape/booking-shape.png")' }}
      onSubmit={handleSubmit}
    >
      {loading && <Loader />}
      <h4 className="text-center text-white">Order A Catering</h4>
      <div className="booking-items">
        
        <div className="form-clt">
          <input
            type="text"
            name="customerName"
            placeholder="Your Name"
            value={form.customerName}
            onChange={handleChange}
          />
        </div>

        <div className="form-clt">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-clt">
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={form.phoneNumber}
            onChange={handleChange}
          />
          <div className="icon">
            <i className="fas fa-phone" />
          </div>
        </div>

        <div className="form-clt">
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
        </div>

        <div className="form-clt">
          <input
            type="text"
            name="noOfPerson"
            placeholder="No of Person"
            value={form.noOfPerson}
            onChange={handleChange}
          />
        </div>

        <div className="form-clt">
          <textarea
            name="description"
            placeholder="Special Request / Message"
            value={form.description}
            onChange={handleChange}
            className="custom-textarea"
          />
        </div>

        <div className="form-clt">
          <button type="submit" className="theme-btn bg-yellow">
            Book Now
          </button>
        </div>
      </div>
    </form>
  );
};

export default ReservationForm;
