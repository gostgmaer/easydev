"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Code, Github, Linkedin, Mail } from "lucide-react";
import { siteContent } from "@/lib/content";
import Link from "next/link";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const HEADER_OFFSET = 80;

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY;

    const offsetPosition = elementPosition - HEADER_OFFSET;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center space-x-2">
            <Code className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">
              {siteContent.personal.name}
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("about")}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("portfolio")}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Portfolio
            </button>
            <Link
              href="/case-studies"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Case Studies
            </Link>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Testimonials
            </button>
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
            >
              Contact
            </Button>
          </nav>

          {/* Social Links & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href={`mailto:${siteContent.personal.email}`}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("about")}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors font-medium px-4 py-2"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors font-medium px-4 py-2"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("portfolio")}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors font-medium px-4 py-2"
              >
                Portfolio
              </button>
              <Link
                href="/case-studies"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors font-medium px-4 py-2"
              >
                Case Studies
              </Link>
              <button
                onClick={() => scrollToSection("testimonials")}
                className="text-left text-gray-700 hover:text-blue-600 transition-colors font-medium px-4 py-2"
              >
                Testimonials
              </button>
              <div className="px-4">
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Contact
                </Button>
              </div>
              <div className="flex items-center justify-center space-x-6 pt-4 border-t border-gray-200">
                <a
                  href="https://github.com/gostgmaer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Github className="h-6 w-6" />
                </a>
                <a
                  href="https://www.linkedin.com/in/kishor-sarkar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
                <a
                  href={`mailto:${siteContent.personal.email}`}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Mail className="h-6 w-6" />
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
