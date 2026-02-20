# Image Placement Guide

## Technology Page Images

Place the following images in the `public/technology/` folder:

### Water Atomised Powders (2 images)
- `water-atomised-1.jpg` - First image (irregular particle morphology)
- `water-atomised-2.jpg` - Second image (irregular particle morphology)

### Air Atomised Powders (1 image)
- `air-atomised.jpg` - Image showing irregular to sub-angular particle morphology

### Gas Atomised Powders (1 image)
- `gas-atomised.jpg` - Image showing highly spherical particle morphology

### Reduced Powders (2 images)
- `reduced-1.jpg` - First image (porous structure)
- `reduced-2.jpg` - Second image (porous structure)

### Electrolytic Process (1 image)
- `electrolytic.jpg` - Image showing dendritic, flake-like particle morphology

## Products Page Images

Place product images in the `public/products/` folder:
- `iron-powder.jpg`
- `copper-powder.jpg`
- `tin-powder.jpg`
- `zinc-powder.jpg`
- `bronze-powder.jpg`
- `brass-powder.jpg`
- `copper-infiltrants.jpg`
- `custom-powder.jpg`

## About Page Images

Place company images in the `public/about/` folder:
- `company-building.jpg` - Company facility image

## Image Specifications

- **Format**: JPG, PNG, or WebP
- **Recommended Size**: 
  - Technology images: 1200x800px or larger
  - Product images: 800x600px or larger
  - Company building: 1920x1080px or larger
- **Optimization**: Images will be automatically optimized by Next.js Image component

## Folder Structure

```
public/
├── technology/
│   ├── water-atomised-1.jpg
│   ├── water-atomised-2.jpg
│   ├── air-atomised.jpg
│   ├── gas-atomised.jpg
│   ├── reduced-1.jpg
│   ├── reduced-2.jpg
│   └── electrolytic.jpg
├── products/
│   ├── iron-powder.jpg
│   ├── copper-powder.jpg
│   ├── tin-powder.jpg
│   ├── zinc-powder.jpg
│   ├── bronze-powder.jpg
│   ├── brass-powder.jpg
│   ├── copper-infiltrants.jpg
│   └── custom-powder.jpg
└── about/
    └── company-building.jpg
```

## Notes

- If images are not found, placeholder backgrounds will be displayed
- The Technology page includes image carousel functionality for technologies with multiple images
- All images are optimized automatically by Next.js for better performance
