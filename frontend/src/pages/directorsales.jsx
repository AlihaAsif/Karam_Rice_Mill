import AboutNavbar from "../components/layout/AboutNavbar";
import DirectorSalesMessage from "../components/about/DirectorSalesMessage";
import WhyTrusted from "../components/home/WhyTrusted";
import GlobalVision from "../components/home/GlobalVision";
import Testimonials from "../components/home/Testimonials";
import NewsSection from "../components/home/NewsSection";
import Footer from "../components/layout/Footer";
function DirectorSales() {
  return (
    <>
      <AboutNavbar />
      <DirectorSalesMessage />
      <WhyTrusted />
      <GlobalVision />
      <Testimonials />
      <NewsSection />
      <Footer />
    </>
  );
}

export default DirectorSales;
