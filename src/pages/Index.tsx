import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/home/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import BestSellersSection from "@/components/home/BestSellersSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import ReviewsSection from "@/components/home/ReviewsSection";
import FAQSection from "@/components/home/FAQSection";
import NewsletterSection from "@/components/home/NewsletterSection";

const Index = () => (
  <div className="min-h-screen bg-background">
    <SEOHead />
    <Header />
    <main>
      <HeroSection />
      <CategoriesSection />
      <BestSellersSection />
      <FeaturesSection />
      <ReviewsSection />
      <FAQSection />
      <NewsletterSection />
    </main>
    <Footer />
  </div>
);

export default Index;
