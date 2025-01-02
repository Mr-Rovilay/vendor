import BestDeals from "@/components/best-deals/BestDeals";
import Categories from "@/components/categories/Categories";
import Events from "@/components/event/Events";
import FeaturedProduct from "@/components/featured-product/FeaturedProduct";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import Hero from "@/components/hero/Hero";
import Testimonial from "@/components/testimonial/Testimonial";



const HomePage = () => {
  return (
    <>
      <Header />
      <Hero />
      <Categories/>
      <BestDeals/>
      <Events/>
      <FeaturedProduct/>
      <Testimonial/>
      <Footer/>
    </>
  );
};

export default HomePage;