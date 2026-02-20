# Static Export & Deployment Guide

## What Was Changed

### 1. **next.config.ts** - Updated Configuration
- Converted to TypeScript format with proper typing
- Added `output: 'export'` for static export
- Added `images.unoptimized: true` for image optimization (required for static export)
- Enabled `trailingSlash: true` for better compatibility with static hosting

### 2. **package.json** - Updated Scripts
- Changed `"export"` script from `"next build && next export"` to `"next build"`
- The new configuration handles everything in one step (deprecation fix)

### 3. **products/[productName]/page.tsx** - Added Static Generation
- Added `generateStaticParams()` function
- This pre-generates all product detail pages at build time
- Ensures all dynamic routes are converted to static HTML files

## How to Build for Deployment

### Step 1: Build the Static Site
```bash
npm run build
```

This will:
- Build your Next.js application
- Generate static HTML files for all pages
- Optimize assets and images
- Create the `out` folder with all static files

### Step 2: Verify the Output
After building, you'll find a folder named `out` in your project root containing:
```
out/
├── index.html                 # Home page
├── about/index.html           # About page
├── products/index.html        # Products page
├── technology/index.html      # Technology page
├── contact/index.html         # Contact page
├── applications/index.html    # Applications page
├── products/
│   ├── [product1]/index.html  # Product detail pages
│   ├── [product2]/index.html
│   └── ... (one for each product)
├── _next/                     # Static assets, CSS, JS
└── ... (other assets)
```

### Step 3: Deploy to GoDaddy

#### Option A: Using GoDaddy File Manager
1. Log in to your GoDaddy account
2. Go to **Hosting > File Manager**
3. Navigate to your public_html or www folder
4. Delete existing files (if any)
5. Upload all files from the `out` folder to the root directory

#### Option B: Using FTP
1. Use an FTP client (FileZilla, WinSCP, etc.)
2. Connect to your GoDaddy FTP details
3. Navigate to public_html directory
4. Upload all files from the `out` folder
5. Ensure folder structure is preserved

#### Option C: Using GoDaddy's cPanel
1. Log in to cPanel
2. Use File Manager
3. Navigate to public_html
4. Upload the contents of `out` folder

## Important Notes

### ✅ What Works
- All static pages (Home, About, Products, Technology, Contact, Applications)
- Dynamic product detail pages
- Images with lazy loading
- CSS and JavaScript bundling
- Client-side interactivity (animations, forms, etc.)

### ⚠️ What Doesn't Work in Static Export
- Server-side rendering (getServerSideProps)
- API routes (if you need dynamic backend functionality)
- Real-time database connections
- Server-side authentication

### 📧 Contact Form
If your contact form needs backend functionality, you have two options:
1. **Keep it as is** - Form submission will fail unless you add serverless functions
2. **Add serverless functions** - Use GoDaddy's serverless capabilities or external services like Formspree, EmailJS, or Vercel

## File Structure After Build

The `out` folder is your complete, deployable website. It contains:
- **HTML files** - All pages pre-rendered to static HTML
- **_next folder** - All JavaScript bundles and CSS
- **public assets** - Images, fonts, and other static files
- **Next.js manifest files** - For routing and runtime

## Testing Before Deployment

### Test Locally
```bash
# Start a local server to test the static output
npx http-server out/
```

Then visit `http://localhost:8080` in your browser to test all pages.

### Things to Test
- [ ] All pages load correctly
- [ ] Navigation links work
- [ ] Images display properly
- [ ] Product links work and show details
- [ ] Responsive design on mobile/tablet
- [ ] Animations and interactive elements work
- [ ] Forms display (note: submission won't work without backend)

## Troubleshooting

### Images Not Showing
- Ensure all image paths start with `/`
- Check that image files exist in `public` folder
- Verify image paths are correct in your components

### Links Not Working
- Check that all links use Next.js `<Link>` component
- Ensure link paths are correct
- Test in the `out` folder before uploading

### 404 Errors
- Verify all files are uploaded to the correct directory
- Check that `index.html` is in the root public_html folder
- Ensure trailing slashes are consistent

### Static Assets Not Loading
- Clear browser cache and do a hard refresh (Ctrl+Shift+R)
- Check browser console for 404 errors
- Verify the `_next` folder is uploaded completely

## Additional Resources

- [Next.js Static Export Docs](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [GoDaddy Hosting Help](https://www.godaddy.com/help)
- [Deploying Next.js Applications](https://nextjs.org/docs/deployment)

## Build Command Summary

```bash
# Development server
npm run dev

# Build for production (creates 'out' folder)
npm run build

# OR explicitly
npm run export

# Test the production build locally
npx http-server out/
```

After running `npm run build`, your complete static website is ready in the `out` folder for deployment!

Remove URL encoding from generateStaticParams() and rely on Next.js to handle encoding during static generation. Then decode the parameters in the page components before using them to find data
