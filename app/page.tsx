import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import Header from "@/components/layout/Header";
import CommingSoon from "@/components/comingsoon";

export default function Home() {
  return (
		<div className='min-h-screen bg-white'>
			{process.env.IS_MAINTENANCE == "true" ?
				<main>
					<CommingSoon />
				</main>
			:	<>
					{" "}
					<Header />
					<main>
						<Hero />
						<About />
						<Services />
						<Portfolio />
						<Pricing />
						<Testimonials />

						<Contact />
						<FAQ />
					</main>
					<Footer />
				</>
			}
		</div>
	);
}
