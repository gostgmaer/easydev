import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import Header from "@/components/layout/Header";
import CommingSoon from "@/components/comingsoon";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {process.env.IS_MENTAINCE == "true" ? (
        <main>
          <CommingSoon />
        </main>
      ) : (
        <>
          {" "}
          <Header />
          <main>
            <Hero />
            <About />
            <Services />
            <Portfolio />
            <Testimonials />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}
