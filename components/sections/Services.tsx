'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Code, 
  Database, 
  Server,
  Settings,
  Shield,
  Zap
} from 'lucide-react';
import { siteContent } from '@/lib/content';

export default function Services() {
  const iconMap = {
    'Express.js Development': Code,
    'Database Design & Optimization': Database,
    'API Development': Server,
    'Authentication & Security': Shield,
    'Database Migration': Settings,
    'Performance Optimization': Zap
  };

  const services = siteContent.services.list.map(service => ({
    ...service,
    icon: iconMap[service.title] || Code
  }));

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {siteContent.services.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {siteContent.services.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="border-none shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
                  <service.icon className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                </div>
                <CardTitle className="text-lg font-bold text-gray-900">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-xs text-gray-500 flex items-center">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-emerald-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Backend Project?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Let's discuss how I can help build robust backend solutions with Express.js and database expertise 
              tailored to your specific requirements.
            </p>
            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}