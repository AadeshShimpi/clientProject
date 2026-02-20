# Powder Manufacturing Website

A modern, responsive website for powder manufacturing business built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- ✅ **Fully Responsive Design** - Works perfectly on all devices (mobile, tablet, desktop)
- ✅ **Smooth Animations** - Beautiful animations powered by Framer Motion
- ✅ **Easy Content Management** - Built-in admin panel for managing content without code
- ✅ **Modern UI/UX** - Clean, professional design with gradient accents
- ✅ **Fast Performance** - Optimized with Next.js 16 and React 19

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## Content Management System (CMS)

### Accessing the Admin Panel

Navigate to `/admin` in your browser to access the content management interface.

### How to Update Content

1. **Via Admin Panel (Recommended)**
   - Go to `/admin`
   - Select the section you want to edit (Hero, Features, Products, About, Contact, Site)
   - Make your changes
   - Click "Save Changes" to save to browser storage
   - Use "Export JSON" to download your content as a backup

2. **Via JSON File**
   - Edit `src/data/content.json` directly
   - Changes will be reflected after page refresh

### Adding Images

1. Place your images in the `public` folder
2. Update the image path in the admin panel or JSON file
   - Example: `/your-image.jpg` (if placed in `public/your-image.jpg`)

### Content Structure

The content is stored in `src/data/content.json` with the following structure:

- **site**: Site name, tagline, description
- **hero**: Homepage hero section content
- **features**: List of features/services
- **products**: Product catalog
- **about**: About page content
- **contact**: Contact information
- **social**: Social media links

## Project Structure

```
website/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── admin/        # Admin panel
│   │   ├── about/        # About page
│   │   ├── products/     # Products page
│   │   ├── contact/      # Contact page
│   │   └── page.tsx      # Homepage
│   ├── components/        # React components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Products.tsx
│   │   └── Footer.tsx
│   ├── data/             # Content data
│   │   └── content.json
│   └── lib/              # Utility functions
│       └── content.ts
└── public/               # Static assets (images, etc.)
```

## Customization

### Colors

The website uses a blue-to-purple gradient theme. To change colors:

1. Update Tailwind classes in components (e.g., `from-blue-600 to-purple-600`)
2. Or modify `tailwind.config.ts` to add custom colors

### Fonts

Fonts are configured in `src/app/layout.tsx` using Next.js font optimization.

### Animations

Animations are powered by Framer Motion. You can customize them in each component file.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Deploy automatically

### Other Platforms

The site can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Budget-Friendly CMS Alternatives

If you need more advanced features in the future, consider these free/low-cost options:

1. **Sanity.io** - Free tier with generous limits
2. **Contentful** - Free tier available
3. **Strapi** - Self-hosted, completely free
4. **Payload CMS** - Open-source, self-hosted

## Support

For questions or issues, please refer to the Next.js documentation or create an issue in your repository.

## License

This project is open source and available for your use.
