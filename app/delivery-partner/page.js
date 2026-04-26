"use client";
import Cta from "@/components/Cta";
import PageBanner from "@/components/PageBanner";
import FoodKingLayout from "@/layouts/FoodKingLayout";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { partner } from "../../utility/slice/GetDeliveryPartner";
import basecatagories from "@/utility/config";
import Link from "next/link";
import Loader from "@/components/Loader";

const Page = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(partner());
  }, [dispatch]);

  const { deliveryPartner, loading, error } = useSelector(
    (state) => state.deliveryPartner
  );

  return (
    <FoodKingLayout>
      {/* {loading && <Loader />} */}
      <PageBanner pageName={"Delivery Partners"} pageKey={"Delivery"}/>

      <div className="gallery-section fix section-bg section-padding">
        <div className="container">
          <div className="row g-4">
            {loading && <p>Loading delivery partners...</p>}
            {error && <p className="text-danger">Error: {error}</p>}
            {!loading && deliveryPartner?.length === 0 && (
              <p>No partners found.</p>
            )}

            {deliveryPartner?.map((partner,i) => {
              const imageUrl = `${basecatagories}deleverypartner/${encodeURIComponent(
                partner.image
              )}`;
              
              return (
                <div
                  className="col-lg-4 wow fadeInUp"
                  key={partner.deleverypartnerId}
                >
                  <div
                    className="galler-image-2 bg-cover"
                    style={{
                      backgroundImage: `url("${imageUrl}")`, // ✅ dynamically loaded image
                      height: "250px",
                      borderRadius: "12px",
                      backgroundSize: "contain",
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                    }}
                  >
                    <a
                      href={partner.link}
                      className="icon"
                      target="_blank"
                      rel="noopener noreferrer"
                      title={partner.title}
                      style={{
                        display: "block",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      <span className="sr-only">{partner.title}</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Cta />
    </FoodKingLayout>
  );
};

export default Page;
