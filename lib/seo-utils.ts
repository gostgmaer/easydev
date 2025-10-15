import { siteContent } from './content';

// Generate dynamic meta tags for different sections
export const generateSectionMeta = (section: string) => {
  const baseTitle = siteContent.seo.title;
  const baseDescription = siteContent.seo.description;
  
  const sectionMeta = {
    about: {
      title: `About ${siteContent.personal.name} - ${siteContent.personal.title}`,
      description: `Learn about ${siteContent.personal.name}'s background, experience, and expertise in ${siteContent.about.skills.slice(0, 3).join(', ')}.`,
    },
    services: {
      title: `Services - ${siteContent.personal.name}`,
      description: `Professional ${siteContent.services.list.map(s => s.title).slice(0, 3).join(', ')} services by ${siteContent.personal.name}.`,
    },
    portfolio: {
      title: `Portfolio - ${siteContent.personal.name}`,
      description: `View ${siteContent.personal.name}'s latest projects and work in ${siteContent.portfolio.projects.map(p => p.category).slice(0, 3).join(', ')}.`,
    },
    contact: {
      title: `Contact ${siteContent.personal.name} - Get In Touch`,
      description: `Contact ${siteContent.personal.name} for professional development services. ${siteContent.personal.responseTime} response time.`,
    },
  };

  return sectionMeta[section as keyof typeof sectionMeta] || {
    title: baseTitle,
    description: baseDescription,
  };
};

// Generate structured data for projects
export const generateProjectStructuredData = (project: any) => {
  return {
    "@type": "CreativeWork",
    "name": project.title,
    "description": project.description,
    "image": project.image,
    "author": {
      "@type": "Person",
      "name": siteContent.personal.name,
    },
    "keywords": project.technologies,
    "applicationCategory": project.category,
    "programmingLanguage": project.technologies,
  };
};

// Generate breadcrumb structured data
export const generateBreadcrumbData = (currentPage: string) => {
  const breadcrumbs = [
    { name: "Home", url: siteContent.seo.url },
    { name: currentPage, url: `${siteContent.seo.url}#${currentPage.toLowerCase()}` },
  ];

  return {
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  };
};