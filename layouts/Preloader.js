"use client";
import { foodkingUtility } from "@/utility";
import { useEffect } from "react";

const Preloader = () => {
  useEffect(() => {
    foodkingUtility.preloader();
  }, []);

  return (
    <div id="preloader" className="preloader">
      <div className="animation-preloader">
        <div className="spinner"></div>
        <div className="txt-loading">
          <span data-text-preloader="S" className="letters-loading">
            S
          </span>
          <span data-text-preloader="A" className="letters-loading">
            A
          </span>
          <span data-text-preloader="F" className="letters-loading">
            F
          </span>
          <span data-text-preloader="A" className="letters-loading">
            A
          </span>
          <span data-text-preloader="H" className="letters-loading">
            H
          </span>
          <span data-text-preloader="A" className="letters-loading">
            A
          </span>
          <span data-text-preloader="L" className="letters-loading">
            L
          </span>
          <span data-text-preloader="A" className="letters-loading">
            A
          </span>
          <span data-text-preloader="L" className="letters-loading">
            L
          </span>
        </div>
        <p className="text-center">Loading</p>
      </div>
      <div className="loader">
        <div className="row">
          <div className="col-3 loader-section section-left">
            <div className="bg" />
          </div>
          <div className="col-3 loader-section section-left">
            <div className="bg" />
          </div>
          <div className="col-3 loader-section section-right">
            <div className="bg" />
          </div>
          <div className="col-3 loader-section section-right">
            <div className="bg" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Preloader;
