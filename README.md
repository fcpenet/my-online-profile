# Francis Penetrante - Online Profile

A professional portfolio website built with Next.js and TypeScript, showcasing 13+ years of software engineering experience.

## Project Structure

- `app/` - Next.js app directory containing pages and components
- `app/page.tsx` - Homepage
- `app/layout.tsx` - Root layout component
- `app/globals.css` - Global styles
- `app/page.module.css` - Homepage styles
- `next.config.ts` - Next.js configuration with static export enabled
- `out/` - Static export output directory (generated after build)

## Getting Started

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

Build the static website:

```bash
npm run build
```

The static files will be generated in the `out/` directory.

### Deploy

The `out/` directory contains all static files and can be deployed to any static hosting service:

- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Any web server

Simply upload the contents of the `out/` directory to your hosting provider.

## Features

- Built with Next.js 16 and React 19
- TypeScript for type safety
- Static export for easy deployment
- Responsive design
- CSS modules for scoped styling
- Modern and clean UI

## Customization

Edit the content in [app/page.tsx](app/page.tsx) to customize your profile information, skills, and projects.
