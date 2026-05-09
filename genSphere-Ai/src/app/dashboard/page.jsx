import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import HeroSection from "../../components/home/HeroSection";
import CapabilitiesSection from "../../components/home/Capabilities";
export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#f4f8f5]">
      <Navbar />

      <HeroSection />
	  <CapabilitiesSection/>

     

      
    </div>
  );
}