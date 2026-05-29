import Topbar from "../components/layout/Topbar";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/HeroSection";
import StatsSection from "../components/home/StatsSection";
import ProductsSection from "../components/home/ProductsSection";
import WhoWeAre from "../components/home/WhoWeAre";
import ExperienceSection from "../components/home/ExperienceSection";
import WhyTrusted from "../components/home/WhyTrusted";
import GlobalVision from "../components/home/GlobalVision";
import Testimonials from "../components/home/Testimonials";
import NewsSection from "../components/home/NewsSection";
import Footer from "../components/layout/Footer";

function Home() {
  return (
    <>
      <Topbar />
      <Navbar />
      <Hero />
      <ProductsSection />
      <WhoWeAre />
      <StatsSection />
      <ExperienceSection />
      <WhyTrusted />
      <GlobalVision />
      <Testimonials />
      <NewsSection />
      <Footer />
    </>
  );
}

export default Home;