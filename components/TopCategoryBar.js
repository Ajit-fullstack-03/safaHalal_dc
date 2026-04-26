"use client";
import basecatagories from "@/utility/config";

export default function TopCategoryBar({
  data = [],
  onCategorySelect,
  selectedCategoryId,
}) {
  return (
    // Visible only on < lg screens
    <div className="categories-bar d-lg-none">
      <div className="categories-scroll">
        {data.map((item) => {
          const imageUrl = `${basecatagories}category/${encodeURIComponent(
            item.icon
          )}`;
          const isActive =
            String(selectedCategoryId) === String(item.categoryId);

          return (
            <button
              key={item.categoryId}
              className={`cat-chip ${isActive ? "is-active" : ""}`}
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
