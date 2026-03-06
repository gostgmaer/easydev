"use client";

import { useState, useEffect } from "react";
import { fetchTestimonials } from "@/lib/api";
import { useErrorModal } from "@/components/ui/error-modal";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { siteContent } from "@/lib/content";
import Image from "next/image";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { showError } = useErrorModal();

  const [testimonials, setTestimonials] = useState(siteContent.testimonials.list);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const remote = await fetchTestimonials();
        if (mounted && Array.isArray(remote) && remote.length > 0) setTestimonials(remote as any);
      } catch (err) {
        console.error("Failed to load testimonials:", err);
        if (showError) showError("Failed to load testimonials", (err as Error)?.message || "Please try again later.");
      }
    })();
    return () => {
      mounted = false;
    };
  }, [showError]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const goToPrevious = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {siteContent.testimonials.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {siteContent.testimonials.subtitle}
          </p>
        </div>

        {/* Main Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto mb-12">
          <Card className="border-none shadow-xl bg-gradient-to-br from-primary/5 to-white">
            <CardContent className="p-8 md:p-12">
              <Quote className="w-12 h-12 text-primary/30 mb-6" />
              <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
                &quot;{testimonials[currentIndex].content}&quot;
              </blockquote>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Image
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].name}
                    width={800}
                    height={500}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-gray-600">
                      {testimonials[currentIndex].role}
                    </p>
                    <p className="text-primary font-medium">
                      {testimonials[currentIndex].company}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons — absolute on sm+, static below on mobile */}
          <div className="flex justify-center gap-4 mt-4 sm:hidden">
            <button onClick={goToPrevious} className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-primary hover:shadow-xl transition-all" aria-label="Previous testimonial">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button onClick={goToNext} className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-primary hover:shadow-xl transition-all" aria-label="Next testimonial">
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          <button
            onClick={goToPrevious}
            className="hidden sm:flex absolute left-0 sm:-left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center text-gray-600 hover:text-primary hover:shadow-xl transition-all"
            aria-label="Previous testimonial">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="hidden sm:flex absolute right-0 sm:-right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg items-center justify-center text-gray-600 hover:text-primary hover:shadow-xl transition-all"
            aria-label="Next testimonial">
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${index === currentIndex ? "bg-primary" : "bg-gray-300"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <Card
              key={index}
              className="border-none shadow-md hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 text-sm leading-relaxed line-clamp-4">
                  &quot;{testimonial.content}&quot;
                </p>
                <div className="flex items-center space-x-3">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={800}
                    height={500}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-xs ">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-gray-50 rounded-2xl p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                {siteContent.hero.stats.clients}
              </div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                {siteContent.hero.stats.projects}
              </div>
              <div className="text-gray-600">Projects Delivered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">
                {siteContent.hero.stats.experience}
              </div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
