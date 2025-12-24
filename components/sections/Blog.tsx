'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  BookOpen,
  Filter
} from 'lucide-react';
import { siteContent } from '@/lib/content';
import Image from 'next/image';

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const posts = siteContent.blog.posts;
  
  const categories = ['All', ...Array.from(new Set(posts.map(post => post.category)))];
  
  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <section id="blog" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4 mr-2" />
            Our Blog
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            {siteContent.blog.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-4">
            {siteContent.blog.subtitle}
          </p>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            {siteContent.blog.description}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <div className="flex items-center text-gray-600 mr-4">
            <Filter className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">Filter by:</span>
          </div>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Featured Articles</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden">
                  <div className="relative h-64">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <Badge className="absolute top-4 left-4 bg-white/90 text-gray-900">
                      {post.category}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(post.publishDate).toLocaleDateString()}
                      <Clock className="w-4 h-4 ml-4 mr-2" />
                      {post.readTime}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2 text-gray-400" />
                        <span className="text-sm text-gray-600">{post.author}</span>
                      </div>
                      <Button variant="ghost" className="text-blue-600 hover:text-blue-700 p-0">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts */}
        {regularPosts.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Latest Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <Card key={post.id} className="border-none shadow-md hover:shadow-lg transition-all duration-300 group">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-3 left-3 bg-white/90 text-gray-900 text-xs">
                      {post.category}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center text-xs text-gray-500 mb-3">
                      <Calendar className="w-3 h-3 mr-1" />
                      {new Date(post.publishDate).toLocaleDateString()}
                      <Clock className="w-3 h-3 ml-3 mr-1" />
                      {post.readTime}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <User className="w-3 h-3 mr-1 text-gray-400" />
                        <span className="text-xs text-gray-600">{post.author}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 p-0 text-xs">
                        Read More
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Stay Updated with Our Latest Insights</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter and never miss our latest articles, tutorials, and industry insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}