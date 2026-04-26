"use client";
import axios from "axios";
import BlogSidebar from "@/components/BlogSidebar";
import Cta from "@/components/Cta";
import PageBanner from "@/components/PageBanner";
import FoodKingLayout from "@/layouts/FoodKingLayout";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import basecatagories from "@/utility/config";
import { base_url,resturantId } from "@/utility/config";
import Loader from "@/components/Loader";

const page = () => {
  const [blogId, setBlogId] = useState("");
  const [blogDetails, setBlogDetails] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const blog = params.get("blogId");
      setBlogId(blog);
    }
  }, []);

  useEffect(() => {
    if (blogId) {
      fetchBlogDetails();
    }
  }, [blogId]);

  const fetchBlogDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${base_url}/api/GetBlogDetails`,
        {
          resturantId: resturantId,
          blogId: blogId,
        }
      );
      setBlogDetails(response.data?.data || {});
      console.log('blog details',response.data?.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Blog details:", error);
    }
  };
  const imageUrl = `${basecatagories}blog/${encodeURIComponent(blogDetails.image)}`;
  const stripHtml = (html) => {
    if (typeof window === "undefined") return html; // SSR safe
    const temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || "";
  };
  const description = stripHtml(blogDetails.description);
  return (
    <FoodKingLayout>
      {/* {loading && <Loader />} */}
      <PageBanner pageName={"blog single"} pageKey={"Blog"}/>
      <section className="blog-wrapper news-wrapper section-padding section-bg">
        <div className="container">
          <div className="news-area">
            <div className="row">
              <div className="col-12 col-lg-8">
                <div className="blog-post-details border-wrap mt-0">
                  <div className="single-blog-post post-details mt-0">
                    <div className="post-content pt-0">
                      <h2 className="mt-0">
                        {blogDetails.title}
                      </h2>
                      <div className="post-meta mt-3">
                        <span>
                          <i className="fal fa-user" />
                          Safa Halal
                        </span>
                        {/* <span>
                          <i className="fal fa-comments" />
                          15 Comments
                        </span> */}
                        <span>
                          <i className="fal fa-calendar-alt" />
                          {new Date(blogDetails.createdOn).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                        </span>
                      </div>
                      <img
                        src={imageUrl}
                        alt="blog__img"
                        className="single-post-image"
                      />
                      <p>{description}</p>
                      {/* <p dangerouslySetInnerHTML={{__html: blogDetails.description,}}
                      /> */}
                    </div>
                  </div>
                </div>
              </div>
              <BlogSidebar />
            </div>
          </div>
        </div>
      </section>
      <Cta />
    </FoodKingLayout>
  );
};
export default page;
