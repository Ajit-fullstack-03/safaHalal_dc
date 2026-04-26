import Cta from "@/components/Cta";
import PageBanner from "@/components/PageBanner";
import FoodKingLayout from "@/layouts/FoodKingLayout";
const page = () => {
  return (
    <FoodKingLayout>
      <PageBanner pageName={"testimonial"} />
      {/*<< Testimonial Section Start >>*/}
      <section className="testimonial-section-4 fix section-bg section-padding">
        <div className="container">
          <div className="row g-4">
            <div
              className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
              data-wow-delay=".3s"
            >
              <div className="testimonial-card-items">
                <div
                  className="testimonial-image bg-cover"
                  style={{ backgroundImage: 'url("assets/img/client/08.jpg")' }}
                />
                <div className="testimonial-content">
                  <p>
                    The foods are really fresh and tasty….they serve various types of food..liked their bowl the most and the whole wings with Thai chili sauce…
                  </p>
                  <h4>●	Jahra Nuha</h4>
                  {/* <span>Developer</span> */}
                </div>
              </div>
            </div>
            <div
              className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
              data-wow-delay=".5s"
            >
              <div className="testimonial-card-items">
                <div
                  className="testimonial-image bg-cover"
                  style={{ backgroundImage: 'url("assets/img/client/09.jpg")' }}
                />
                <div className="testimonial-content">
                  <p>
                    I ordered two items: the chicken rice bowl and the two-piece tilapia with fries. The chicken rice bowl was light, and the fresh chicken was cooked perfectly.
                  </p>
                  <h4>●	Cherolynn Williams</h4>
                  {/* <span>Food Blogger</span> */}
                </div>
              </div>
            </div>
            <div
              className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
              data-wow-delay=".7s"
            >
              <div className="testimonial-card-items">
                <div
                  className="testimonial-image bg-cover"
                  style={{ backgroundImage: 'url("assets/img/client/10.jpg")' }}
                />
                <div className="testimonial-content">
                  <p>
                    great service, the food was good, especially some Bengali items like Biryani, rice bowls, they're delicious, must try their wings because they have lots of flavors, the other food like tacos and burritos is also delicious.
                  </p>
                  <h4>Atikur Rahman</h4>
                  {/* <span>Designer</span> */}
                </div>
              </div>
            </div>
            <div
              className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
              data-wow-delay=".3s"
            >
              <div className="testimonial-card-items">
                <div
                  className="testimonial-image bg-cover"
                  style={{ backgroundImage: 'url("assets/img/client/11.jpg")' }}
                />
                <div className="testimonial-content">
                  <p>
                    I love this place! The food is fresh and made to order
                  </p>
                  <h4>●	Toni H</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Main Cta Banner Section Start */}
      <Cta />
    </FoodKingLayout>
  );
};
export default page;
