# 🖼️ Assets Directory

This directory contains static assets for the FreelanceHub platform.

## Hero Image Setup

### Quick Start:
1. Generate your hero image using the prompts in `/HERO_IMAGE_PROMPTS.md`
2. Save the image as `hero-image.png` in this directory
3. Uncomment lines 164-170 in `src/pages/Landing.jsx`
4. Comment out or remove lines 155-160 (current Unsplash placeholder)

### File Structure:
```
public/
  assets/
    hero-image.png          (Main hero image - 1920x1080px)
    hero-image-mobile.png   (Optional mobile version - 768x432px)
    logo.svg                (Company logo)
    icons/                  (App icons)
```

### Recommended Specifications:

#### Hero Image
- **Dimensions**: 1920 x 1080px (16:9 aspect ratio)
- **Format**: PNG or WebP for transparency, JPG for photos
- **File Size**: < 500KB (optimize with TinyPNG or Squoosh)
- **Resolution**: @2x for retina displays (3840 x 2160px ideal)

#### Optimization Tools:
- **TinyPNG**: https://tinypng.com
- **Squoosh**: https://squoosh.app
- **ImageOptim**: https://imageoptim.com (Mac)

### Usage Example:

```jsx
// In Landing.jsx, replace the current image:
<img
  src="/assets/hero-image.png"
  alt="Find the perfect freelancer for your next project"
  className="w-full h-auto object-cover aspect-video rounded-3xl"
  loading="eager"
/>
```

### Responsive Images (Advanced):

```jsx
<picture>
  <source 
    media="(max-width: 768px)" 
    srcSet="/assets/hero-image-mobile.png" 
  />
  <source 
    media="(min-width: 769px)" 
    srcSet="/assets/hero-image.png" 
  />
  <img
    src="/assets/hero-image.png"
    alt="Hero image"
    className="w-full h-auto"
    loading="eager"
  />
</picture>
```

## Notes:
- All files in `public/` are served at the root URL
- Access with `/assets/filename.ext` not `/public/assets/`
- Optimize all images before deploying
- Use WebP format for better compression with JPEG fallback
