"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Nav, Tab } from "react-bootstrap";
import basecatagories from "@/utility/config";
import { base_url, resturantId } from "@/utility/config";

const AboutFoodItems = () => {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    axios
      .get(`${base_url}/api/getDisplayMenu/${resturantId}`)
      .then((res) => {
        setCategories(res.data.category || []);
        setMenuItems(res.data.data || []);
      })
      .catch((err) => console.error("API Error:", err));
  }, []);

  return (
    <section className="about-food-section section-bg section-padding">
      <div className="container">
        <div className="about-food-wrapper style-2">
          <div className="section-title text-center">
            <span className="wow fadeInUp">about our food</span>
            <h2 className="wow fadeInUp" data-wow-delay=".3s">
              hot delicious item
            </h2>
          </div>

          {categories.length > 0 && (
            <Tab.Container defaultActiveKey={categories[0]?.categoryId.toString()}>
              {/* Dynamic Nav Tabs */}
              <Nav as="ul" className="nav mb-4 justify-content-center">
                {categories.map((cat, index) => (
                  <Nav.Item
                    key={index}
                    as="li"
                    className="nav-item wow fadeInUp"
                    data-wow-delay={`.${(index + 1) * 2}s`}
                  >
                    {/* <Nav.Link
                      as="a"
                      eventKey={cat.categoryId.toString()}
                      href={`#${cat.categoryId}`}
                    >
                      {cat.categoryName}
                    </Nav.Link> */}

                    <Link href={`#${cat.categoryId}`} passHref legacyBehavior>
                      <Nav.Link eventKey={cat.categoryId.toString()}>
                        {cat.categoryName}
                      </Nav.Link>
                    </Link>
                  </Nav.Item>
                ))}
              </Nav>

              {/* Dynamic Tab Content */}
              <Tab.Content className="tab-content">
                {categories.map((cat,i) => (
                  <Tab.Pane
                    key={i}
                    eventKey={cat.categoryId.toString()}
                    className="tab-pane fade"
                  >
                    <div className="description-items">
                      <div className="row">
                        {menuItems
                          .filter((item) => item.categoryId === cat.categoryId)
                          .map((item, index) => (
                            <div
                              key={item.megamenuId}
                              className={`col-xl-3 col-lg-6 col-md-6 wow fadeInUp`}
                              data-wow-delay={`.${(index + 1) * 2}s`}
                            >
                              <div className="about-food-items center">
                                <div className="food-image">
                                  <img
                                    src={`${basecatagories}menu/${encodeURIComponent(
                                      item.image
                                    )}`}
                                    alt={item.menuName}
                                    style={{
                                      width: "100%",
                                      height: "200px",
                                      objectFit: "cover",
                                    }}
                                  />
                                </div>
                                <div className="food-content">
                                  <h3>
                                    <Link
                                      href={{
                                        pathname: "/shop-right-sidebar",
                                        query: { menuId: item.menuId },
                                      }}
                                    >
                                      {item.menuName}
                                    </Link>
                                  </h3>
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: item.description,
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Tab.Container>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutFoodItems;

// export const AboutFoodItems2 = () => {
//   return (
//     <section className="about-food-section">
//       <div className="container">
//         <div
//           className="about-food-wrapper bg-cover"
//           style={{
//             backgroundImage: 'url("assets/img/shape/about-food-bg.png")',
//           }}
//         >
//           <div className="section-title text-center">
//             <span className="wow fadeInUp">about our food</span>
//             <h2 className="wow fadeInUp" data-wow-delay=".3s">
//               hot delicious item
//             </h2>
//           </div>
//           <Tab.Container id="about-food-tabs" defaultActiveKey="chicken">
//             <Nav className="justify-content-center">
//               <Nav.Item className="wow fadeInUp" data-wow-delay=".3s">
//                 <Nav.Link eventKey="chicken">chicken fry</Nav.Link>
//               </Nav.Item>
//               <Nav.Item className="wow fadeInUp" data-wow-delay=".5s">
//                 <Nav.Link eventKey="pizza">pizza</Nav.Link>
//               </Nav.Item>
//               <Nav.Item className="wow fadeInUp" data-wow-delay=".7s">
//                 <Nav.Link eventKey="burger">burger</Nav.Link>
//               </Nav.Item>
//               <Nav.Item className="wow fadeInUp" data-wow-delay=".8s">
//                 <Nav.Link eventKey="deserts">deserts</Nav.Link>
//               </Nav.Item>
//             </Nav>
//             <Tab.Content>
//               {["chicken", "pizza", "burger", "deserts"].map((category) => (
//                 <Tab.Pane key={category} eventKey={category}>
//                   <div className="description-items">
//                     <div className="row">
//                       {[...Array(4)].map((_, index) => (
//                         <div
//                           key={index}
//                           className={`col-xl-3 col-lg-6 col-md-6 wow fadeInUp`}
//                           data-wow-delay={`.${(index + 1) * 2}s`}
//                         >
//                           <div className="about-food-items center">
//                             <div className="food-image">
//                               <img
//                                 src={`assets/img/about-food/${
//                                   [
//                                     "pizza",
//                                     "potato",
//                                     "chicken",
//                                     "cheeseburger",
//                                   ][index]
//                                 }.png`}
//                                 alt="food-img"
//                               />
//                             </div>
//                             <div className="food-content">
//                               <h3>
//                                 <Link href="shop-single">
//                                   Chicago Deep Pizza.
//                                 </Link>
//                               </h3>
//                               <p>
//                                 It's the perfect dining experience where
//                                 Experience quick and efficient
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </Tab.Pane>
//               ))}
//             </Tab.Content>
//           </Tab.Container>
//         </div>
//       </div>
//     </section>
//   );
// };

export const AboutFoodItems2 = () => {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    axios
      .get(`${base_url}/api/getDisplayMenu/${resturantId}`)
      .then((res) => {
        setCategories(res.data.category || []);
        setMenuItems(res.data.data || []);
      })
      .catch((err) => console.error("API Error:", err));
  }, []);

  return (
    <section className="about-food-section">
      <div className="container">
        <div
          className="about-food-wrapper bg-cover"
          style={{
            backgroundImage: 'url("assets/img/shape/about-food-bg.png")',
          }}
        >
          <div className="section-title text-center">
            {/* <span className="wow fadeInUp">about our food</span> */}
            <h2 className="wow fadeInUp" data-wow-delay=".3s">
              Best in Town
            </h2>
          </div>

          {categories.length > 0 && (
            <Tab.Container
              id="about-food-tabs"
              defaultActiveKey={categories[0]?.categoryId.toString()}
            >
              {/* Dynamic Category Tabs */}
              <Nav className="justify-content-center">
                {categories.map((cat, index) => (
                  <Nav.Item
                    key={index}
                    className="wow fadeInUp"
                    data-wow-delay={`.${(index + 1) * 2}s`}
                  >
                    <Nav.Link eventKey={cat.categoryId.toString()}>
                      {cat.categoryName}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>

              {/* Tab Content */}
              <Tab.Content>
                {categories.map((cat,i) => (
                  <Tab.Pane
                    key={i}
                    eventKey={cat.categoryId.toString()}
                  >
                    <div className="description-items">
                      <div className="row">
                        {menuItems
                          .filter((item) => item.categoryId === cat.categoryId)
                          .map((item, index) => (
                            <div
                              key={item.megamenuId}
                              className={`col-xl-3 col-lg-6 col-md-6 wow fadeInUp`}
                              data-wow-delay={`.${(index + 1) * 2}s`}
                            >
                              <div className="about-food-items center">
                                <div className="food-image">
                                  <img
                                    src={`${basecatagories}menu/${encodeURIComponent(
                                      item.image
                                    )}`}
                                    alt={item.menuName}
                                    style={{
                                      width: "100%",
                                      height: "200px",
                                      objectFit: "cover",
                                    }}
                                  />
                                </div>
                                <div className="food-content">
                                  <h3>
                                    <Link
                                      href={{
                                        pathname: "/shop-single",
                                        query: { menuId: item.menuId },
                                      }}
                                    >
                                      {item.menuName}
                                    </Link>
                                  </h3>
                                  <p
                                    dangerouslySetInnerHTML={{
                                      __html: item.description,
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Tab.Container>
          )}
        </div>
      </div>
    </section>
  );
};
