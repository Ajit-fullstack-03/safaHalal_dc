"use client";
import { isAvailable } from "@/utility/availability";
import basecatagories from "@/utility/config";

export default function TopCategoryBar({
  data = [],
  onCategorySelect,
  selectedCategoryId,
  currentDate,
}) {
  return (
    // Visible only on < lg screens
    <div className="categories-bar d-lg-none">
      <div className="categories-scroll">
        {data.map((item) => {
          const imageUrl = `${basecatagories}category/${encodeURIComponent(
            item.icon,
          )}`;
          const isActive =
            String(selectedCategoryId) === String(item.categoryId);
          const available = isAvailable({
            available_days: item.available_days,
            start_time: item.start_time,
            end_time: item.end_time,
            currentDate: currentDate,
            outofStock: item?.outofStock,
          });

          return (
            <button
              key={item.categoryId}
              className={`cat-chip
                  ${isActive && available ? "is-active" : ""}
                  ${!available ? "category-disabled" : ""}
                  ${isActive && !available ? "nav-disabled-active" : ""}
                `}
              onClick={() => onCategorySelect?.(item.categoryId)}
              type="button"
            >
              <img src={imageUrl} alt={item.categoryName} />
              <span>{item.categoryName}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
