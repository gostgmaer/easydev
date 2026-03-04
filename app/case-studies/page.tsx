import CaseStudies from "@/components/sections/CaseStudies";
import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";
import { siteContent } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: `Case Studies | ${siteContent.personal.name}`,
    description:
        "Explore in-depth case studies showcasing real projects, challenges overcome, and measurable results delivered.",
};

export default function CaseStudiesPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main className="pt-20">
                <CaseStudies />
            </main>
            <Footer />
        </div>
    );
}
