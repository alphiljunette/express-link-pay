import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import Pricing from "@/components/Pricing";
import QuoteForm from "@/components/QuoteForm";
import AboutUs from "@/components/AboutUs";
import FAQ from "@/components/FAQ";
import PaymentMethods from "@/components/PaymentMethods";
import TermsAndConditions from "@/components/TermsAndConditions";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <NavBar />
      <Hero />
      <Services />
      <HowItWorks />
      <Pricing />
      <QuoteForm />
      <AboutUs />
      <FAQ />
      <PaymentMethods />
      <TermsAndConditions />
      <Footer />
    </div>
  );
};

export default Index;
