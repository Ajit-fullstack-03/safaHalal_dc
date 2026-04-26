"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import basecatagories from "@/utility/config";
import { base_url,resturantId } from "@/utility/config";
import Loader from "./Loader";

const PageBanner = ({ pageName ,pageKey}) => {
  const [bannerData, setBannerData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getBannerData();
  }, []);
  const getBannerData = async () => {
    setLoading(true);
    const res = await axios.post(`${base_url}/api/GetBanner`,
      {
        resturantId: resturantId,
        page: pageKey,
      }
    );
    setBannerData(res.data?.data);
    setLoading(false);
  };
  return (
    // <div
    //   className="breadcrumb-wrapper bg-cover"
    //   // style={{ backgroundImage: `url("${basecatagories}slider/${encodeURIComponent(bannerData[0].image)}")` }}
    //   style={{ backgroundImage: `url("${ bannerData
    //         ? `${basecatagories}menu/${encodeURIComponent(bannerData[0].image)}`
    //         : 'assets/img/banner/breadcrumb.jpg'
    //     }")`,
    //   }}
    // >
    <div
      className="breadcrumb-wrapper bg-cover"
      style={{
        backgroundImage: `url("${
          bannerData && bannerData[0]?.image
            ? `${basecatagories}slider/${encodeURIComponent(bannerData[0].image)}`
            : "assets/img/banner/breadcrumb.jpg"
        }")`,
      }}
    >
      {/* {loading && <Loader />} */}
      {/* {`${basecatagories}menu/${encodeURIComponent(item.image)}`} */}
      <div className="container">
        <div className="page-heading center">
          <h1>{pageName}</h1>
          <ul className="breadcrumb-items">
            <li>
              <Link href="/">Home Page</Link>
            </li>
            <li>
              <i className="far fa-chevron-right" />
            </li>
            <li>{pageName}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default PageBanner;
