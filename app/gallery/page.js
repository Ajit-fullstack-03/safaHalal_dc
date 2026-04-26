"use client";
import Cta from "@/components/Cta";
import PageBanner from "@/components/PageBanner";
import FoodKingLayout from "@/layouts/FoodKingLayout";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { gallery } from "../../utility/slice/getGallery";
import basecatagories from "@/utility/config";
import { useState } from "react";
import Loader from "@/components/Loader";

const Page = () => {
  const dispatch = useDispatch();
  const [popupImage, setPopupImage] = useState(null);

  useEffect(() => {
    dispatch(gallery());
  }, [dispatch]);

  const { imageGallery, loading, error } = useSelector(
    (state) => state.imageGallery
  );

  return (
    <FoodKingLayout>
      {/* {loading && <Loader />} */}
      <PageBanner pageName={"gallery"} pageKey={"Gallery"}/>
      <div className="gallery-section fix section-bg section-padding">
        <div className="container">
          <div className="row g-4">
            {loading && <p>Loading gallery...</p>}
            {error && <p className="text-danger">Error: {error}</p>}
            {!loading && imageGallery?.length === 0 && <p>No images found.</p>}

            {imageGallery?.map((item, index) => {
              const imageUrl = `${basecatagories}gallery/${encodeURIComponent(item.image)}`;

              // 6-step pattern
              const layoutPattern = [
                "col-lg-8", // 1st
                "col-lg-4", // 2nd
                "col-lg-4", // 3rd
                "col-lg-8", // 4th
                "col-lg-8", // 5th
                "col-lg-4", // 6th
              ];

              const columnClass = layoutPattern[index % layoutPattern.length];

              return (
                <div
                  className={`${columnClass} wow fadeInUp`}
                  data-wow-delay={index % 2 === 0 ? ".3s" : ".5s"}
                  key={item.galleryId}
                >
                  <div
                    className="galler-image-2 bg-cover"
                    style={{
                      backgroundImage: `url("${imageUrl}")`,
                    }}
                  >
                    {/* <a href={imageUrl} className="icon img-popup">
                      <i className="fal fa-plus" />
                    </a> */}
                      <button
                        className="icon img-popup"
                        onClick={() => setPopupImage(imageUrl)}
                      >
                        <i className="fal fa-plus" />
                      </button>
                      {popupImage && (
                        <div className="image-popup-overlay" onClick={() => setPopupImage(null)}>
                          <div className="image-popup-content">
                            <img src={popupImage} alt="popup" />
                            <span className="close-btn" onClick={() => setPopupImage(null)}>
                              &times;
                            </span>
                          </div>
                        </div>
                      )}
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
