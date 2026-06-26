import AboutNavbar from "../components/layout/AboutNavbar";
import ManagingDirectorMessage from "../components/about/ManagingDirectorMessage";
import WhyTrusted from "../components/home/WhyTrusted";
import GlobalVision from "../components/home/GlobalVision";
import Testimonials from "../components/home/Testimonials";
import NewsSection from "../components/home/NewsSection";
import Footer from "../components/layout/Footer";

function ManagingDirector() {
  return (
    <>
      <AboutNavbar />
      <ManagingDirectorMessage />
      <WhyTrusted />
      <GlobalVision />
      <Testimonials />
      <NewsSection />
      <Footer />
    </>
  );
}

export default ManagingDirector;
