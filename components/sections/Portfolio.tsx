"use client";

import { useState, useEffect } from "react";
import { trackEvent, fetchProjects } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { siteContent } from "@/lib/content";
import Image from "next/image";

export default function Portfolio() {
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...Array.from(new Set(siteContent.portfolio.projects.map((p) => p.category)))];

  const [projects, setProjects] = useState(
    siteContent.portfolio.projects.map((p) => ({ ...p, liveUrl: "#", githubUrl: "#" })),
  );

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const remote = await fetchProjects();
        if (mounted && Array.isArray(remote) && remote.length > 0) setProjects(remote as any);
      } catch (e) {
        // fetchProjects already logs errors; leave projects as fallback
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredProjects = filter === "All" ? projects : projects.filter((project) => project.category === filter);

  const handleProjectView = async (projectTitle: string) => {
    await trackEvent({
      event: "project_view",
      category: "Portfolio",
      label: projectTitle,
    });
  };

  const handleFilterChange = async (category: string) => {
    setFilter(category);
    await trackEvent({
      event: "portfolio_filter",
      category: "Portfolio",
      label: category,
    });
  };

  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {siteContent.portfolio.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            {siteContent.portfolio.subtitle}
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleFilterChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {filteredProjects
            .filter((p) => p.featured)
            .map((project, index) => (
              <Card
                key={index}
                className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={500}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <Button
                      size="sm"
                      className="bg-white text-gray-900 hover:bg-gray-100"
                      onClick={() => handleProjectView(project.title)}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-gray-900"
                      onClick={() =>
                        handleProjectView(`${project.title} - Code`)
                      }
                    >
                      <Github className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">
                      {project.title}
                    </h3>
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary"
                    >
                      {project.category}
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  {project.highlights && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                        Key Features:
                      </h4>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {project.highlights.map((highlight, idx) => (
                          <li key={idx} className="flex items-center">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></div>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="flex items-center text-primary hover:text-primary/80 transition-colors cursor-pointer group">
                    <button
                      className="font-medium"
                      onClick={() => handleProjectView(project.title)}
                    >
                      View Project Details
                    </button>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* Regular Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects
            .filter((p) => !p.featured)
            .map((project, index) => (
              <Card
                key={index}
                className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={800}
                    height={500}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge
                      variant="secondary"
                      className="bg-black bg-opacity-50 text-white border-none"
                    >
                      {project.category}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-3 text-sm line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <button
                        className="text-gray-600 hover:text-primary transition-colors"
                        onClick={() => handleProjectView(project.title)}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button
                        className="text-gray-600 hover:text-primary transition-colors"
                        onClick={() =>
                          handleProjectView(`${project.title} - Code`)
                        }
                      >
                        <Github className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      className="text-sm text-primary hover:text-primary/80 transition-colors"
                      onClick={() => handleProjectView(project.title)}
                    >
                      Learn more →
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            className="px-8 py-3 text-lg border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            View All Projects
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
