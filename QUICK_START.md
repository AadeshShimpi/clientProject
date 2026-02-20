# Quick Start Guide

## 🚀 Getting Started

1. **Navigate to the project:**
   ```bash
   cd website
   ```

2. **Install dependencies (if not already done):**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Visit `http://localhost:3000`

## 📝 Managing Content

### Option 1: Admin Panel (Easiest)

1. Go to `http://localhost:3000/admin`
2. Select the section you want to edit (Hero, Features, Products, etc.)
3. Make your changes
4. Click "Save Changes"
5. Refresh your website to see updates

### Option 2: Edit JSON File

1. Open `src/data/content.json`
2. Edit the content directly
3. Save the file
4. Refresh your browser

## 🖼️ Adding Images

1. Place your images in the `public` folder
   - Example: `public/hero-image.jpg`

2. Update the image path in admin panel or JSON:
   - Use: `/hero-image.jpg` (note the leading slash)

## 🎨 Customization Tips

- **Colors**: Search for `from-blue-600 to-purple-600` in components to change gradient colors
- **Fonts**: Already optimized with Next.js fonts
- **Animations**: Powered by Framer Motion - customize in component files

## 📱 Testing Responsiveness

- Open browser DevTools (F12)
- Use device toolbar to test mobile/tablet views
- The site is fully responsive!

## 💾 Backup Your Content

1. Go to `/admin`
2. Click "Export JSON"
3. Save the file as a backup

## 🔄 Restore Content

1. Go to `/admin`
2. Click "Import JSON"
3. Select your backup file

## 🎯 Next Steps

- Replace placeholder images with your actual product images
- Update all text content with your business information
- Customize colors to match your brand
- Add your social media links
- Test the contact form (you'll need to connect it to a backend)

## 🆘 Troubleshooting

**Content not updating?**
- Make sure you clicked "Save Changes" in admin panel
- Clear browser cache and refresh
- Check browser console for errors

**Images not showing?**
- Verify image is in `public` folder
- Check image path starts with `/`
- Ensure image file name matches exactly (case-sensitive)

**Admin panel not working?**
- Make sure you're on `/admin` route
- Check browser console for errors
- Try clearing localStorage and refreshing


