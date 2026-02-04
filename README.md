# Francis Penetrante - Online Profile

A professional portfolio website built with Next.js and TypeScript, showcasing 13+ years of software engineering experience.

## Project Structure

- `app/` - Next.js app directory containing pages and components
- `app/page.tsx` - Homepage
- `app/layout.tsx` - Root layout component
- `app/globals.css` - Global styles
- `app/page.module.css` - Homepage styles

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Deployment to GitHub Pages

This site is configured to automatically deploy to GitHub Pages when you push to the main branch.

### Setup Instructions

1. **Enable GitHub Pages**
   - Go to your repository **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**

2. **Add Custom Domain (Optional)**
   - In **Settings** → **Pages** → **Custom domain**
   - Enter your domain (e.g., `www.yourname.com`)
   - Check **Enforce HTTPS**

3. **Configure DNS at Your Domain Registrar**

   For apex domain (yourname.com):
   ```
   A     185.199.108.153
   A     185.199.109.153
   A     185.199.110.153
   A     185.199.111.153
   ```

   For www subdomain:
   ```
   CNAME www your-username.github.io
   ```

4. **Push to Deploy**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

The GitHub Actions workflow will automatically build and deploy your site to GitHub Pages.

### Manual Local Build

To test the production build locally:

```bash
npm run build
# The static files will be in the 'out' directory
```
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
