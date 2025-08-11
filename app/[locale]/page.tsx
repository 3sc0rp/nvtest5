import Hero from "@/components/Hero";
import CulturalBlurbs from "@/components/CulturalBlurbs";
import DishCarousel from "@/components/DishCarousel";
import EmbroideryDivider from "@/components/EmbroideryDivider";
import Testimonials from "@/components/Testimonials";
import LocationStrip from "@/components/LocationStrip";
import NewsletterSignup from "@/components/NewsletterSignup";

export default function Home() {
  return (
    <div className="font-body bg-nv-paper">
      {/* Hero Section */}
      <Hero />

      {/* Cultural Introduction */}
      <CulturalBlurbs />

      {/* Featured Dishes Carousel */}
      <DishCarousel />

      {/* Culture Band with Embroidery Divider */}
      <EmbroideryDivider showContent={true} />

      {/* Testimonials Grid */}
      <Testimonials />

      {/* Location Strip */}
      <LocationStrip />

      {/* Newsletter Signup */}
      <NewsletterSignup />
    </div>
  );
}
