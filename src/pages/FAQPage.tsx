import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FAQSection from "@/components/home/FAQSection";

const FAQPage = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <main className="py-8">
      <FAQSection />
    </main>
    <Footer />
  </div>
);

export default FAQPage;
