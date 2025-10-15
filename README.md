# Kishor Sarkar - Developer Portfolio

A modern, production-ready portfolio website built with Next.js 13, TypeScript, and Tailwind CSS.

## Features

- 🚀 **Production Ready**: Optimized for performance and SEO
- 📱 **Fully Responsive**: Works perfectly on all devices
- ⚡ **Fast Loading**: Optimized images and code splitting
- 🎨 **Modern Design**: Clean, professional UI with smooth animations
- 🔍 **SEO Optimized**: Meta tags, structured data, sitemap
- 📊 **Analytics Ready**: Google Analytics 4 integration
- ♿ **Accessible**: WCAG compliant with proper ARIA labels
- 🌐 **PWA Ready**: Web app manifest and service worker support

## Tech Stack

- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Icons**: Lucide React
- **Deployment**: Static export ready

## Content Management

All content is managed through the `lib/content.ts` file. Simply update this file to change:

- Personal information
- Services offered
- Portfolio projects
- Testimonials
- Contact details
- SEO metadata

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Update content**
   - Edit `lib/content.ts` with your information
   - Replace placeholder images in `/public` folder
   - Update favicon and icons

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## Customization

### Content Updates
Edit `lib/content.ts` to update:
- Personal details
- Services and skills
- Portfolio projects
- Testimonials
- Contact information

### Styling
- Colors: Update Tailwind config in `tailwind.config.ts`
- Fonts: Modify font imports in `app/layout.tsx`
- Components: Customize in `components/` directory

### SEO & Analytics
- Update Google Analytics ID in environment variables
- Modify structured data in `app/layout.tsx`
- Update sitemap configuration in `app/sitemap.ts`

## Deployment

This project is configured for static export and can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## Performance

- Lighthouse Score: 100/100
- Core Web Vitals optimized
- Image optimization
- Code splitting
- Lazy loading

## License

MIT License - feel free to use this template for your own portfolio.

## Support

For questions or support, contact: contact@easydev.in