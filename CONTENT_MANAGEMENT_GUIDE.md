# Hitech Engineering — Website Content & Media Management Guide

This practical guide is for team members managing products, photos, videos, and career listings for the Hitech Engineering website while keeping operational costs at **₹0 / month**.

---

## 1. Admin Portal Access

* **Admin Portal URL**: `https://hitech-6a9b3.web.app/admin` (or `http://localhost:5173/admin` during development)
* **Official Admin Login**:
  * **Email**: `contact@hitechengineering.works`
  * **Password**: `bennetbennet`

---

## 2. Managing Products & Photos

### A. Creating or Editing a Product
1. Log in to the Admin Dashboard and open the **Products Catalog** tab.
2. Click **`+ Add New Product`** or click the **Edit icon (pencil)** on any existing product.
3. Enter:
   * **Product Title** (e.g. `Heavy Duty ISO 15552 Tie-Rod Cylinder`)
   * **Department & Category** (e.g. `Pneumatics` → `Cylinders`)
   * **Description & Key Features** (Bullet highlights)

### B. Uploading Photos (Automatic Hidden Compressor)
* **How it works**: You can upload original high-resolution photos straight from your DSLR or smartphone (even 5MB–15MB files). 
* **Built-in Silent Compression**: The upload engine automatically intercepts every photo in the background, resizes it to max 1280px, and converts it to crisp, compressed **WebP / high-quality JPEG (~60–90 KB)** using hardware-accelerated canvas processing before saving.
* **No Third-Party Software Needed**: You do not need Photoshop or compression websites. Simply drag and drop or browse files.
* **Multi-Image Support**:
  * You can select multiple photos at once.
  * The first image is automatically assigned as the **Main Photo**.
  * Hover over any secondary photo and click **Make Primary** to change which photo appears on product cards.
  * Click the **Trash icon** on any thumbnail to delete it.

### C. Adding Dynamic Technical Specs Tables
* You can customize the specification table to match any engineering data sheet:
  * Click **`+ Add Column`** to add custom columns (e.g., `Port Size`, `Stroke Range`, `Working Pressure`). Click on any column header to rename it.
  * Click **`+ Add Row`** to add rows, and type values directly into the table cells.
* Click **Save Product** to update the live catalog.

---

## 3. Adding HD Videos "The YouTube Way" (100% Free, Zero Ads)

Serving large raw MP4 video files directly from a website consumes significant bandwidth. Instead, the industry standard for high-performance engineering websites is embedding videos hosted on YouTube.

### Why the YouTube Way?
1. **₹0 Hosting & Bandwidth**: Google absorbs all video streaming bandwidth.
2. **Adaptive Bitrate Streaming**: The video automatically adjusts between 720p, 1080p, and 4K depending on the visitor's mobile connection.
3. **Fast Loading**: Pages load in milliseconds without heavy video downloads buffering the site.

### Step-by-Step Instructions:
1. **Upload your video to YouTube**:
   * Log into your company YouTube channel and upload the video.
   * Set the visibility to **Unlisted** (this means the video will **not** appear on public YouTube searches or recommendations, but anyone visiting your website can watch it).
2. **Extract the 11-Character Video ID**:
   * In the YouTube video URL, copy the 11-character code after `v=`:
     * Example URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
     * Video ID: `dQw4w9WgXcQ`
3. **Embed as a Seamless Background / Hero Video in Code**:
   Use this clean `iframe` template (it strips away YouTube logos, hides related videos, mutes sound, and loops continuously like a native video):

```tsx
<div className="relative w-full aspect-video overflow-hidden rounded-2xl shadow-xl">
  <iframe
    className="w-full h-full pointer-events-none scale-105"
    src="https://www.youtube-nocookie.com/embed/YOUR_VIDEO_ID?autoplay=1&mute=1&loop=1&playlist=YOUR_VIDEO_ID&controls=0&modestbranding=1&rel=0&playsinline=1"
    title="Hitech Engineering Facility Video"
    allow="autoplay; encrypted-media"
    allowFullScreen
  />
</div>
```

*Replace `YOUR_VIDEO_ID` in both parameters with your 11-character video ID.*

---

## 4. Adding Static Assets Directly to the Codebase

If you need to add static company graphics, facility images, or brochures directly to the code repository:
1. Save the file into the `/frontend/public/` folder:
   * Example: `/frontend/public/facilities/cnc_turning_line.jpg`
2. Reference it anywhere in React components using a leading slash:
   ```tsx
   <img src="/facilities/cnc_turning_line.jpg" alt="CNC Turning Line" />
   ```
3. **Best Practice**: Keep images between **1600px and 1920px wide** saved at **80% JPEG quality** or **WebP** (~150KB–250KB each).

---

## 5. Careers & Job Applications

* **Adding Openings**: In the Admin Dashboard under **Job Openings**, click **`+ Post New Opening`** to list new vacancies with department, experience requirements, and job descriptions.
* **Receiving Candidate Resumes**:
  * Candidates submit applications through the public Careers page (`/career`).
  * Incoming resumes and candidate contact details appear in the **Candidate Resumes** tab in the Admin Console.
  * You can view candidate contact information and click **Download / View Resume** to open the candidate's PDF.

---

## 6. How to Deploy Updates to the Live Website

Whenever you or your team make code changes in the frontend:
1. Open your terminal in the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Build and verify the code:
   ```bash
   npm run build
   ```
3. Deploy live to Firebase:
   ```bash
   firebase deploy --only hosting
   ```
4. Changes will be live immediately at [https://hitech-6a9b3.web.app](https://hitech-6a9b3.web.app).
