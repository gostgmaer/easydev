'use client';

import { Code, Github, Linkedin, Mail, Twitter, Heart } from 'lucide-react';
import { useState } from 'react';
import { subscribeToNewsletter, trackEvent } from '@/lib/api';
import { siteContent } from '@/lib/content';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' }
  ];

  const services = [
    { name: 'Web Development', href: '#services' },
    { name: 'Mobile Apps', href: '#services' },
    { name: 'E-commerce', href: '#services' },
    { name: 'API Development', href: '#services' }
  ];

  const socialLinks = [
    { icon: Github, href: siteContent.social.github, label: 'GitHub' },
    { icon: Linkedin, href: siteContent.social.linkedin, label: 'LinkedIn' },
    { icon: Twitter, href: siteContent.social.twitter, label: 'Twitter' },
    { icon: Mail, href: siteContent.social.email, label: 'Email' }
  ];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubscribing(true);
    try {
      await subscribeToNewsletter(email);
      setEmail('');
      alert('Thank you for subscribing to our newsletter!');
      
      // Track successful subscription
      await trackEvent({
        event: 'newsletter_subscribe',
        category: 'Newsletter',
        label: 'footer_form',
      });
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      alert('Sorry, there was an error subscribing. Please try again.');
      
      // Track subscription error
      await trackEvent({
        event: 'newsletter_error',
        category: 'Newsletter',
        label: 'subscription_failed',
      });
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Code className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">{siteContent.personal.name}</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              {siteContent.personal.bio}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-300 hover:bg-blue-600 hover:text-white transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-blue-400 transition-colors text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Services</h4>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <button
                    onClick={() => scrollToSection(service.href)}
                    className="text-gray-300 hover:text-blue-400 transition-colors text-left"
                  >
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-lg font-semibold mb-2">Stay Updated</h4>
            <p className="text-gray-300 mb-4 text-sm">
              Get the latest insights on web development and tech trends.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button 
                type="submit"
                disabled={isSubscribing}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg font-semibold transition-colors whitespace-nowrap"
              >
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>© {currentYear} {siteContent.personal.name}. All rights reserved.</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="/privacy" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-blue-400 transition-colors">
                Terms of Service
              </a>
              {/* <div className="flex items-center space-x-1">
                <span>Made with</span>
                <Heart className="w-4 h-4 text-red-500 fill-current" />
                <span>using Next.js</span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}