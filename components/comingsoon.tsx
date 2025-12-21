import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Code,
  Smartphone,
  Globe,
  ArrowRight,
  CheckCircle,
  Bug,
} from "lucide-react";
import { ContactForm } from "./sections/contact/Form";
import Link from "next/link";

function CommingSoon() {
  const services = [
    {
      icon: <Code className="w-8 h-8" />,
      title: "Custom Development",
      description:
        "Tailored web and mobile solutions built with cutting-edge technologies",
    },
    {
        icon:<Bug className="w-8 h-8" />,
      title: "Bug Fixing & Maintenance",
      description:
        "Fix frontend/backend issues, optimize performance, and maintain applications",
      features: [
        "Code Debugging",
        "Performance Optimization",
        "Security Fixes",
        "Post-Launch Support",
      ],
      priceRange: "₹20,000 - ₹1,00,000",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Web Solutions",
      description:
        "Modern, responsive websites and web applications that drive results",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-lg flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">Easy Dev</span>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-gray-300">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <Link
                className="hover:text-blue-400 transition-colors"
                href="mailto:hello@easydev.in"
              >
                hello@easydev.in
              </Link>
            </div>
            {/* <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+1 (555) 123-4567</span>
            </div> */}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            We're Building
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              {" "}
              Something Amazing
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Easy Dev Service Provider is launching soon with cutting-edge
            development solutions that will transform your digital presence.
          </p>
          <div className="inline-flex items-center bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-6 py-3 text-blue-300">
            <div className="w-2 h-2 bg-emerald-400 rounded-full mr-3 animate-pulse"></div>
            Coming Soon - Q2 2026
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            What We'll Offer
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Professional development services designed to accelerate your
            business growth
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center group hover:bg-white/10 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="text-blue-400 mb-6 flex justify-center group-hover:text-emerald-400 transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                {service.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}

      <ContactForm />

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 border-t border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Easy Dev</span>
          </div>

          <div className="flex items-center space-x-6 text-gray-400 text-sm">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Mumbai, IN</span>
            </div>
           <span>© {new Date().getFullYear()} Easy Dev Service Provider</span>

          </div>
        </div>
      </footer>
    </div>
  );
}

export default CommingSoon;
