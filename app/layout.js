import "./globals.css";
import "@css/bootstrap.min.css";
import "@css/font-awesome.css";
import "@css/animate.css";
import "@css/magnific-popup.css";
import "@css/meanmenu.css";
import "@css/swiper-bundle.min.css";
import "@css/nice-select.css";
import "@css/main.css";
import "rc-slider/assets/index.css";

import Preloader from "@/layouts/Preloader";
import Providers from "@/components/Providers";

export const metadata = {
  title: "Safa Halal - Where Quality Meet Excellent Service.",
  description: "At Safa Halal, we offer the perfect dining experience where every dish is crafted with fresh, high-quality ingredients. Enjoy quick and efficient service that ensures your food is served hot and fresh — just the way you like it. From the first bite to the last, we bring you flavors that satisfy and service that delights, making every visit memorable.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers> {/* Wrap Redux Provider here */}
          <Preloader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
