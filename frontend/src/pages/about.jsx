import AboutNavbar from "../components/layout/AboutNavbar";
import AboutHero from "../components/about/AboutHero";
import GlobalVision from "../components/home/GlobalVision";
import TeamSection from "../components/about/TeamSection";
import WhoWeAre from "../components/home/WhoWeAre";
import ExperienceSection from "../components/home/ExperienceSection";
import WhyTrusted from "../components/home/WhyTrusted";
import Testimonials from "../components/home/Testimonials";
import NewsSection from "../components/home/NewsSection";
import Footer from "../components/layout/Footer";

function About() {
  return (
    <>
      <AboutNavbar />
      <AboutHero />
      <GlobalVision />
      <TeamSection />
      <WhoWeAre />
      <ExperienceSection />
      <WhyTrusted />
      <Testimonials />
      <NewsSection />
       <Footer />
    </>
  );
}

export default About;
