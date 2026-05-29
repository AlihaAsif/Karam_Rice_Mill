import AboutNavbar from "../components/layout/AboutNavbar";
import CEOMessage from "../components/about/CEOMessage";
import WhyTrusted from "../components/home/WhyTrusted";
import GlobalVision from "../components/home/GlobalVision";
import Testimonials from "../components/home/Testimonials";
import NewsSection from "../components/home/NewsSection";
import Footer from "../components/layout/Footer";

function CEO() {
  return (
    <>
      <AboutNavbar />
      <CEOMessage />
      <WhyTrusted />
      <GlobalVision />
      <Testimonials />
      <NewsSection />
      <Footer />
    </>
  );
}

export default CEO;