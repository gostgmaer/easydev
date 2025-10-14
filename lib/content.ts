export const siteContent = {
  // Personal Information
  personal: {
    name: "Kishor Sarkar",
    title: "Full-Stack Developer",
    email: "kishor.sarkar.in@gmail.com",
    phone: "+91 98765 43210",
    location: "Mumbai, India",
    website: "https://me.easydev.in.dev",
    tagline: "Backend Specialist & Database Expert",
    bio: "Passionate full-stack developer with 4+ years of experience building scalable web applications using Express.js, MySQL, and MongoDB. I specialize in creating robust backend systems and efficient database architectures that power modern web applications.",
    availability: "Available for new projects",
    responseTime: "< 12 hours"
  },

  // Hero Section
  hero: {
    greeting: "Hi, I'm",
    name: "Kishor Sarkar",
    roles: [
      "Express.js Developer",
      "Database Architect", 
      "Backend Specialist",
      "API Developer",
      "Full-Stack Engineer"
    ],
    description: "I build powerful backend systems and APIs using Express.js, design efficient database schemas with MySQL and MongoDB, and create full-stack applications that scale. Specializing in server-side development with a focus on performance and reliability.",
    stats: {
      experience: "4+",
      projects: "75+",
      clients: "30+"
    }
  },

  // About Section
  about: {
    title: "About Me",
    subtitle: "Backend developer and database specialist with expertise in modern server technologies",
    journey: [
      "I began my development journey in 2020, focusing on backend technologies and database design. What started as curiosity about how web applications work behind the scenes quickly evolved into a passion for building robust, scalable server-side solutions.",
      "Over the years, I've specialized in Express.js for building RESTful APIs and web services, mastered both SQL and NoSQL databases (MySQL and MongoDB), and developed expertise in creating efficient data models and optimizing database performance.",
      "I believe in writing clean, maintainable code and following industry best practices. Whether it's designing a complex database schema, building a high-performance API, or integrating multiple services, I focus on creating solutions that are both powerful and reliable."
    ],
    skills: [
      "Express.js", "Node.js", "MySQL", "MongoDB", "JavaScript", "TypeScript",
      "REST APIs", "GraphQL", "JWT Authentication", "Mongoose", "Sequelize",
      "Redis", "Docker", "AWS", "Git", "Postman", "Database Design"
    ],
    achievements: [
      { title: "Certified Developer", desc: "MongoDB & MySQL Certified" },
      { title: "Performance Expert", desc: "API Response Time < 100ms" },
      { title: "Team Collaborator", desc: "Led 8+ Backend Projects" },
      { title: "Reliable Delivery", desc: "100% On-time Completion" }
    ],
    experience: [
      {
        period: "2022 - Present",
        role: "Senior Backend Developer",
        company: "TechSolutions India",
        description: "Leading backend development for enterprise applications using Express.js and database optimization. Managing MySQL and MongoDB databases for high-traffic applications.",
        achievements: [
          "Reduced API response time by 60%",
          "Designed scalable database architecture",
          "Implemented microservices with Express.js"
        ]
      },
      {
        period: "2021 - 2022", 
        role: "Full-Stack Developer",
        company: "StartupHub Mumbai",
        description: "Built complete web applications using Express.js backend with MySQL database. Developed RESTful APIs and integrated third-party services.",
        achievements: [
          "Delivered 15+ full-stack projects",
          "Optimized database queries by 45%",
          "Integrated 20+ third-party APIs"
        ]
      },
      {
        period: "2020 - 2021",
        role: "Junior Developer",
        company: "WebCraft Solutions",
        description: "Started career focusing on backend development with Express.js and database management. Gained expertise in MySQL and MongoDB.",
        achievements: [
          "Completed 25+ backend projects",
          "Mastered Express.js framework",
          "Learned database optimization"
        ]
      }
    ]
  },

  // Services Section
  services: {
    title: "Services I Offer",
    subtitle: "Comprehensive backend development services with expertise in Express.js and database technologies",
    list: [
      {
        title: "Express.js Development",
        description: "Custom backend applications and APIs built with Express.js. Focus on performance, security, and scalability with modern Node.js practices.",
        features: ["RESTful APIs", "Middleware Development", "Authentication Systems", "Real-time Applications"]
      },
      {
        title: "Database Design & Optimization",
        description: "Expert database architecture using MySQL and MongoDB. Schema design, query optimization, and performance tuning for high-traffic applications.",
        features: ["MySQL Database Design", "MongoDB Collections", "Query Optimization", "Database Migration"]
      },
      {
        title: "API Development",
        description: "Robust REST and GraphQL APIs with proper documentation, authentication, and rate limiting. Integration with third-party services and payment gateways.",
        features: ["REST APIs", "GraphQL Endpoints", "API Documentation", "Third-party Integration"]
      },
      {
        title: "Authentication & Security",
        description: "Secure authentication systems using JWT, OAuth, and session management. Implementation of security best practices and data protection.",
        features: ["JWT Authentication", "OAuth Integration", "Role-based Access", "Data Encryption"]
      },
      {
        title: "Database Migration",
        description: "Seamless database migrations and data transfer between different systems. MySQL to MongoDB migration and vice versa with data integrity.",
        features: ["Data Migration", "Schema Conversion", "Data Validation", "Backup Strategies"]
      },
      {
        title: "Performance Optimization",
        description: "Backend performance tuning, database optimization, and caching strategies. Monitoring and scaling solutions for growing applications.",
        features: ["Query Optimization", "Caching with Redis", "Performance Monitoring", "Load Balancing"]
      }
    ]
  },

  // Portfolio Section
  portfolio: {
    title: "Featured Projects",
    subtitle: "Showcase of backend systems and full-stack applications built with Express.js, MySQL, and MongoDB",
    projects: [
      {
        title: "E-commerce Backend API",
        category: "E-commerce",
        description: "Complete e-commerce backend system with Express.js and MySQL. Features include product management, order processing, payment integration, and admin dashboard APIs.",
        image: "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800",
        technologies: ["Express.js", "MySQL", "JWT", "Stripe API", "Multer"],
        featured: true,
        highlights: ["Payment Gateway Integration", "Order Management System", "Inventory Tracking", "Admin APIs"]
      },
      {
        title: "Social Media Platform Backend",
        category: "Social Platform",
        description: "Scalable social media backend using Express.js and MongoDB. Real-time messaging, post management, user authentication, and social features.",
        image: "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800",
        technologies: ["Express.js", "MongoDB", "Socket.io", "Cloudinary", "Redis"],
        featured: true,
        highlights: ["Real-time Messaging", "File Upload System", "Social Features", "Caching with Redis"]
      },
      {
        title: "Restaurant Management System",
        category: "Management System",
        description: "Complete restaurant management backend with Express.js and MySQL. POS system APIs, inventory management, staff scheduling, and analytics.",
        image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800",
        technologies: ["Express.js", "MySQL", "Sequelize", "Chart.js", "PDF Generation"],
        featured: false,
        highlights: ["POS System APIs", "Inventory Management", "Staff Management", "Sales Analytics"]
      },
      {
        title: "Learning Management System API",
        category: "Education",
        description: "Educational platform backend with Express.js and MongoDB. Course management, student progress tracking, quiz system, and video streaming APIs.",
        image: "https://images.pexels.com/photos/5965592/pexels-photo-5965592.jpeg?auto=compress&cs=tinysrgb&w=800",
        technologies: ["Express.js", "MongoDB", "Mongoose", "AWS S3", "Video Processing"],
        featured: false,
        highlights: ["Course Management", "Progress Tracking", "Quiz System", "Video Streaming"]
      },
      {
        title: "Healthcare Management Backend",
        category: "Healthcare",
        description: "Healthcare system backend with Express.js and MySQL. Patient management, appointment scheduling, medical records, and doctor portal APIs.",
        image: "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&cs=tinysrgb&w=800",
        technologies: ["Express.js", "MySQL", "JWT", "Nodemailer", "PDF Reports"],
        featured: false,
        highlights: ["Patient Management", "Appointment System", "Medical Records", "Report Generation"]
      },
      {
        title: "Real Estate Platform API",
        category: "Real Estate",
        description: "Property management backend using Express.js and MongoDB. Property listings, search functionality, user management, and booking system APIs.",
        image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=800",
        technologies: ["Express.js", "MongoDB", "Elasticsearch", "Image Processing", "Maps API"],
        featured: true,
        highlights: ["Property Search", "Advanced Filtering", "Booking System", "Location Services"]
      }
    ]
  },

  // Testimonials Section
  testimonials: {
    title: "What Clients Say",
    subtitle: "Feedback from clients who have worked with me on backend development and database projects",
    list: [
      {
        name: "Rajesh Kumar",
        role: "CTO, TechStart India",
        company: "TechStart India",
        content: "Kishor delivered an exceptional e-commerce backend system using Express.js and MySQL. His database design was flawless and the API performance exceeded our expectations. Highly recommended for backend development!",
        rating: 5,
        avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150"
      },
      {
        name: "Priya Sharma",
        role: "Product Manager, InnovateHub",
        company: "InnovateHub",
        content: "Working with Kishor was a game-changer for our project. His expertise in MongoDB and Express.js helped us build a scalable social platform. The real-time features work perfectly and the code is very well structured.",
        rating: 5,
        avatar: "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=150"
      },
      {
        name: "Amit Patel",
        role: "Founder, RestaurantTech",
        company: "RestaurantTech",
        content: "Kishor built our entire restaurant management backend from scratch. The MySQL database design is excellent and the Express.js APIs are fast and reliable. Our POS system runs smoothly thanks to his work.",
        rating: 5,
        avatar: "https://images.pexels.com/photos/2182969/pexels-photo-2182969.jpeg?auto=compress&cs=tinysrgb&w=150"
      },
      {
        name: "Sneha Gupta",
        role: "Tech Lead, EduPlatform",
        company: "EduPlatform",
        content: "The learning management system backend that Kishor developed is outstanding. His MongoDB expertise really showed in the efficient data modeling. The APIs are well-documented and perform excellently under load.",
        rating: 5,
        avatar: "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=150"
      },
      {
        name: "Vikram Singh",
        role: "CEO, HealthcarePlus",
        company: "HealthcarePlus",
        content: "Kishor's backend development skills are top-notch. He built our healthcare management system with Express.js and MySQL, ensuring HIPAA compliance and excellent performance. Professional and reliable developer.",
        rating: 5,
        avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150"
      }
    ]
  },

  // Contact Section
  contact: {
    title: "Let's Work Together",
    subtitle: "Have a backend project in mind? Let's discuss how I can help you build robust, scalable solutions with Express.js and database expertise.",
    info: [
      {
        title: "Email",
        value: "kishor.sarkar@developer.com",
        description: "Send me an email anytime!",
        href: "mailto:kishor.sarkar@developer.com"
      },
      {
        title: "Phone",
        value: "+91 98765 43210",
        description: "Mon-Fri from 10am to 7pm IST",
        href: "tel:+919876543210"
      },
      {
        title: "Location",
        value: "Mumbai, India",
        description: "Available for remote work globally",
        href: "#"
      },
      {
        title: "Response Time",
        value: "< 12 hours",
        description: "I reply to all inquiries quickly",
        href: "#"
      }
    ],
    services: [
      "Express.js Development",
      "Database Design (MySQL/MongoDB)",
      "API Development",
      "Backend Architecture",
      "Database Migration",
      "Performance Optimization",
      "Other"
    ],
    budgetRanges: [
      "Under ₹50,000",
      "₹50,000 - ₹1,00,000", 
      "₹1,00,000 - ₹2,50,000",
      "₹2,50,000 - ₹5,00,000",
      "₹5,00,000+",
      "Let's discuss"
    ],
    faqs: [
      {
        q: "What's your typical project timeline?",
        a: "Backend projects typically take 2-4 weeks depending on complexity. Simple APIs can be delivered in 1 week, while complex systems with multiple databases may take 6-8 weeks. I provide detailed timelines in my proposals."
      },
      {
        q: "Do you work with international clients?",
        a: "Yes! I work with clients globally and am flexible with time zones. I'm available for calls during IST business hours and can adjust for urgent international projects."
      },
      {
        q: "What's included in your backend development service?",
        a: "Complete backend development including database design, API development, authentication, testing, deployment, and 30 days of post-launch support. Documentation and code comments are always included."
      },
      {
        q: "Do you provide database migration services?",
        a: "Absolutely! I specialize in migrating data between MySQL and MongoDB, optimizing existing databases, and helping businesses scale their data infrastructure safely and efficiently."
      }
    ]
  },

  // Social Links
  social: {
    github: "https://github.com/kishorsarkar",
    linkedin: "https://linkedin.com/in/kishorsarkar",
    twitter: "https://twitter.com/kishorsarkar",
    email: "mailto:kishor.sarkar@developer.com"
  },

  // SEO & Meta
  seo: {
    title: "Kishor Sarkar - Express.js Developer | MySQL & MongoDB Expert",
    description: "Professional backend developer specializing in Express.js, MySQL, and MongoDB. I build scalable APIs, design efficient databases, and create robust server-side solutions for modern web applications.",
    keywords: "Express.js developer, MySQL expert, MongoDB specialist, backend developer, API development, database design, Node.js developer, India",
    author: "Kishor Sarkar",
    url: "https://kishorsarkar.dev"
  }
};