'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Palette, Database, Cloud, Target, Headphones as HeadphonesIcon } from 'lucide-react';
import { siteContent } from '@/lib/content';

export default function Services() {
  const iconMap:any = {
    'Custom Web Development': Code,
    'UI/UX Design & Strategy': Palette,
    'Backend & API Development': Database,
    'Cloud Infrastructure & DevOps': Cloud,
    'Digital Strategy & Consulting': Target,
    'Ongoing Support & Maintenance': HeadphonesIcon
  };

  const services = siteContent.services.list.map(service => ({
    ...service,
    icon: iconMap[service.title] || Code
  }));

  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-6">
            <Code className="w-4 h-4 mr-2" />
            Our Services
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            {siteContent.services.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-4">
            {siteContent.services.subtitle}
          </p>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            {siteContent.services.description}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="border-none shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <service.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="text-lg font-bold text-gray-900">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-3 mb-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-center">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="pt-4 border-t border-gray-100">
                  <span className="text-sm font-semibold text-blue-600">{service.priceRange}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Digital Presence?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Let's discuss how we can help you achieve your digital goals with our comprehensive suite of services 
              tailored to your specific business needs.
            </p>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
            >
              Start Your Project Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}