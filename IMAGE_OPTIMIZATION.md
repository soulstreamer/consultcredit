# Optimizing Images for Faster Loading

## Changes Made

### 1. HTML Preloading (index.html)
- Added `<link rel="preload">` for logo and crown images
- Set `fetchpriority="high"` on critical images

### 2. Image Optimizations
- **Logo (Header)**: `loading="eager"`, `fetchPriority="high"`, `decoding="async"`
- **Crown (Services)**: `loading="eager"`, `fetchPriority="high"`, `decoding="async"`
- **Logo (Footer)**: `loading="lazy"`, `decoding="async"`

### 3. Added Width/Height Attributes
- Prevents layout shift (CLS)
- Helps browser allocate space before image loads

## Recommended: Convert to WebP

For even faster loading, convert PNG images to WebP format:

### Using Online Tools:
1. Go to https://convertio.co/png-webp/ or https://cloudconvert.com/png-to-webp
2. Upload `coroana.png` and `consultfinanciar.png`
3. Download WebP versions
4. Place in `public/` folder

### Expected File Size Reduction:
- `coroana.png` (2.5 MB) → ~500-800 KB WebP
- `consultfinanciar.png` (2.1 MB) → ~400-600 KB WebP

### Update Code to Use WebP:
After converting, update image sources:

```tsx
// Header.tsx
<img src="/consultfinanciar.webp" ... />

// Services.tsx  
<img src="/coroana.webp" ... />

// Footer.tsx
<img src="/consultfinanciar.webp" ... />
```

And update index.html:
```html
<link rel="preload" href="/consultfinanciar.webp" as="image" fetchpriority="high" />
<link rel="preload" href="/coroana.webp" as="image" fetchpriority="high" />
```

## Additional Optimizations

### Browser Caching
Add to your server configuration or `vercel.json`/`netlify.toml`:

```json
{
  "headers": [
    {
      "source": "/(.*)\.(png|webp|jpg|jpeg|gif|svg)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### Responsive Images
For mobile optimization, consider creating multiple sizes:
- `consultfinanciar-200w.webp` (mobile)
- `consultfinanciar-400w.webp` (desktop)

Use `srcset` attribute for responsive images.

## Current Loading Performance

With these optimizations:
1. Images are preloaded in HTML `<head>`
2. Critical images load immediately (`loading="eager"`)
3. Browser knows image dimensions (prevents layout shift)
4. Images decode asynchronously (doesn't block main thread)

This should significantly improve perceived loading speed on mobile.
