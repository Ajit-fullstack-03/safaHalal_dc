"use client";
import { isAvailable } from "@/utility/availability";
import basecatagories from "@/utility/config";
import { useEffect, useState } from "react";

const ProductSidebar = ({
  data = [],
  onCategorySelect,
  selectedCategoryId,
  currentDate,
  className = "col-xl-3 col-lg-4 d-none d-lg-block",
  style = "style-1",
}) => {
  const [selectcategoryId, setselectcategoryId] = useState(null);

  useEffect(() => {
    if (selectedCategoryId) {
      setselectcategoryId(selectedCategoryId);
    } else if (data.length > 0) {
      setselectcategoryId(data[0].categoryId);
      onCategorySelect?.(data[0].categoryId);
    }
  }, [selectedCategoryId, data, onCategorySelect]);

  return (
    <div className={className}>
      <div className={`main-sidebar ${style}`}>
        <div className="single-sidebar-widget">
          <div className="wid-title">
            <h4>Categories</h4>
          </div>

          <div className="widget-categories">
            <ul>
              {data.map((item) => {
                const imageUrl = `${basecatagories}category/${encodeURIComponent(
                  item.icon,
                )}`;
                const isSelected =
                  String(selectcategoryId) === String(item.categoryId);
                const available = isAvailable({
                  available_days: item.available_days,
                  start_time: item.start_time,
                  end_time: item.end_time,
                  currentDate: currentDate,
                  outofStock: item?.outofStock,
                  categoryName: item?.categoryName
                });
                return (
                  <li
                    key={item.categoryId}
                    onClick={(e) => {
                      e.preventDefault();
                      setselectcategoryId(item.categoryId);
                      onCategorySelect?.(item.categoryId);
                    }}
                    className={`
                      ${isSelected && available ? "selected-category" : ""}
                      ${!available ? "category-disabled" : ""}
                      ${isSelected && !available ? "nav-disabled-active" : ""}
                    `}
                    style={{
                      cursor: "pointer",
                      fontWeight: isSelected ? "bold" : "normal",
                      backgroundColor: isSelected ? "#e74c3c" : "transparent",
                      borderRadius: "5px",
                      padding: "10px 10px",
                      color: isSelected ? "#f7f9f9" : "#2e4053",
                    }}
                  >
                    <img
                      src={imageUrl}
                      alt={item.categoryName}
                      style={{ width: 40, height: 40, marginRight: 8 }}
                    />
                    <span style={{ fontSize: "22px" }}>
                      {item.categoryName}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSidebar;
