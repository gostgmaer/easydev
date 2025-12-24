'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ExternalLink, 
  Users, 
  Clock, 
  TrendingUp, 
  Quote,
  ChevronRight,
  Target
} from 'lucide-react';
import { siteContent } from '@/lib/content';
import Image from 'next/image';

export default function CaseStudies() {
  const [selectedStudy, setSelectedStudy] = useState(0);
  const studies = siteContent.caseStudies.studies;

  return (
    <section id="case-studies" className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-6">
            <Target className="w-4 h-4 mr-2" />
            Case Studies
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            {siteContent.caseStudies.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-4">
            {siteContent.caseStudies.subtitle}
          </p>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            {siteContent.caseStudies.description}
          </p>
        </div>

        {/* Case Study Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {studies.map((study, index) => (
            <button
              key={index}
              onClick={() => setSelectedStudy(index)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedStudy === index
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md'
              }`}
            >
              {study.industry}
            </button>
          ))}
        </div>

        {/* Selected Case Study */}
        <div className="max-w-6xl mx-auto">
          <Card className="border-none shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image */}
              <div className="relative h-64 lg:h-auto">
                <Image
                  src={studies[selectedStudy].image}
                  alt={studies[selectedStudy].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <Badge className="bg-white/20 text-white border-white/30 mb-2">
                    {studies[selectedStudy].industry}
                  </Badge>
                  <h3 className="text-2xl font-bold">{studies[selectedStudy].title}</h3>
                </div>
              </div>

              {/* Content */}
              <CardContent className="p-8 lg:p-12">
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Project Overview</h4>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2 text-blue-600" />
                      {studies[selectedStudy].teamSize} team
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2 text-blue-600" />
                      {studies[selectedStudy].duration}
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {studies[selectedStudy].challenge}
                  </p>
                </div>

                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Our Solution</h4>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    {studies[selectedStudy].solution}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {studies[selectedStudy].technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                    Results Achieved
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {studies[selectedStudy].results.map((result, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        {result}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <Quote className="w-8 h-8 text-blue-300 mb-4" />
                  <blockquote className="text-gray-700 italic mb-4">
                    "{studies[selectedStudy].testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center">
                    <div>
                      <div className="font-semibold text-gray-900">
                        {studies[selectedStudy].testimonial.author}
                      </div>
                      <div className="text-sm text-gray-600">
                        {studies[selectedStudy].testimonial.position}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Create Your Success Story?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help you achieve similar results for your business.
          </p>
          <Button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg group"
          >
            Start Your Project
            <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}