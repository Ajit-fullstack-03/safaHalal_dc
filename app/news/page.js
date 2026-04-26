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
  const [blog, setBlog] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchBlog();
  }, []);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${base_url}/api/GetBlog`,
        {
          resturantId: resturantId,
        }
      );
      setBlog(response.data?.data || {});
      console.log('blog',response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching menu details:", error);
    }
  };
  return (
    <FoodKingLayout>
      {/* {loading && <Loader />} */}
      <PageBanner pageName={"blog page"} pageKey={"Blog"}/>
      <section className="blog-wrapper news-wrapper section-padding section-bg">
        <div className="container">
          <div className="news-area">
            <div className="row">
              <div className="col-12 col-lg-8">
                <div className="blog-posts">
                  {blog.map((blog) => {
                    const imageUrl = `${basecatagories}blog/${encodeURIComponent(blog.image)}`;
                    const stripHtml = (html, wordLimit = null) => {
                    const temp = document.createElement("div");
                    temp.innerHTML = html;
                    const text = temp.textContent || temp.innerText || "";
                    if (wordLimit) {
                      const words = text.split(/\s+/);
                      return words.slice(0, wordLimit).join(" ") + (words.length > wordLimit ? "..." : "");
                    }
                    return text;
                  };
                  const description = stripHtml(blog.description, 30);
                    return (
                      <div className="single-blog-post" key={blog.blogId}>
                        {/* Blog Image */}
                        <div
                          className="post-featured-thumb bg-cover"
                          style={{
                            backgroundImage: `url(${imageUrl})`,
                          }}
                        />

                        {/* Blog Content */}
                        <div className="post-content">
                          <div className="post-meta">
                            <span>
                              <i className="fal fa-user" /> Admin
                            </span>
                            <span>
                              <i className="fal fa-comments" /> 0 Comments
                            </span>
                            <span>
                              <i className="fal fa-calendar-alt" />{" "}
                              {new Date(blog.createdOn).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                          </div>

                          <h2>
                            <Link href={{ pathname: "/news-details", query: { blogId: blog.blogId },}}>{blog.title}</Link>
                          </h2>
                              {description}
                          <div className="d-flex justify-content-between align-items-center mt-4">
                            <div className="post-link">
                              <Link href={{ pathname: "/news-details", query: { blogId: blog.blogId },}}>
                                <i className="fas fa-arrow-right" /> Read More
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div className="single-blog-post quote-post format-quote">
                    <div className="post-content text-white bg-cover">
                      <div className="quote-content">
                        <div className="icon">
                          <i className="fas fa-quote-left" />
                        </div>
                        <div className="quote-text">
                          <h2>
                            Good food is the foundation of genuine happiness.
                            Cooking is love made visible
                          </h2>
                          <div className="post-meta pt-40 d-inline-block">
                            <span>
                              <i className="fal fa-comments" />
                              35 Comments
                            </span>
                            <span>
                              <i className="fal fa-calendar-alt" />
                              24th March 2024
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="page-nav-wrap mt-5 text-center">
                  <ul>
                    <li>
                      <Link href="#" className="page-numbers">
                        <i className="fal fa-long-arrow-left" />
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="page-numbers">
                        01
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="page-numbers">
                        02
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="page-numbers">
                        ..
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="page-numbers">
                        10
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="page-numbers">
                        11
                      </Link>
                    </li>
                    <li>
                      <Link href="#" className="page-numbers">
                        <i className="fal fa-long-arrow-right" />
                      </Link>
                    </li>
                  </ul>
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
