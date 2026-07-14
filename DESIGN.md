---
name: Kinetic Precision
colors:
  surface: '#fff9ef'
  surface-dim: '#e1d9c7'
  surface-bright: '#fff9ef'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fbf3e0'
  surface-container: '#f6edda'
  surface-container-high: '#f0e7d5'
  surface-container-highest: '#eae2cf'
  on-surface: '#1f1b10'
  on-surface-variant: '#4d4732'
  inverse-surface: '#343024'
  inverse-on-surface: '#f9f0dd'
  outline: '#7e775f'
  outline-variant: '#d0c6ab'
  surface-tint: '#705d00'
  primary: '#705d00'
  on-primary: '#ffffff'
  primary-container: '#ffd700'
  on-primary-container: '#705e00'
  inverse-primary: '#e9c400'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2dfde'
  on-secondary-container: '#636262'
  tertiary: '#00696f'
  on-tertiary: '#ffffff'
  tertiary-container: '#00f1ff'
  on-tertiary-container: '#006a70'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffe16d'
  primary-fixed-dim: '#e9c400'
  on-primary-fixed: '#221b00'
  on-primary-fixed-variant: '#544600'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#79f5ff'
  tertiary-fixed-dim: '#00dbe8'
  on-tertiary-fixed: '#002022'
  on-tertiary-fixed-variant: '#004f54'
  background: '#fff9ef'
  on-background: '#1f1b10'
  surface-variant: '#eae2cf'
  industrial-yellow: '#ffd700'
  tech-gray-dark: '#1a1a1a'
  surface-bone: '#fff9ef'
  outline-muted: '#7e775f'
  hazard-red: '#ff3b30'
  stark-white: '#ffffff'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Space Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.1em
  status-code:
    fontFamily: Space Grotesk
    fontSize: 10px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.05em
  price-display:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1'
spacing:
  unit: 8px
  gutter: 24px
  margin-mobile: 16px
  section-padding: 80px
  container-max: 1280px
---

## Brand & Style
The brand identity is rooted in high-performance industrial engineering, evoking a sense of "Kinetic Precision." It targets B2B industrial leaders, logistics operators, and manufacturing firms. 

The visual style is a sophisticated blend of **Industrial Brutalism** and **Modern Minimalism**. It utilizes a structured grid, heavy borders, and a monochromatic primary palette accented by high-visibility "Hazard Yellow." The design prioritizes clarity, technical authority, and durability. Key visual motifs include fine-line technical drawings, monospaced status codes, and high-contrast photography (often grayscale to emphasize form and mechanical detail).

## Colors
The color palette is functional and high-contrast, designed to mimic industrial safety environments.
- **Primary (Industrial Yellow):** Used for primary actions, critical highlights, and brand emphasis. It acts as a "safety" color.
- **Secondary (Tech Gray Dark):** The foundation for text and structural elements, providing a heavy, grounded feel.
- **Surface (Surface Bone):** A slightly warm off-white that reduces glare compared to pure white, suggesting a premium architectural quality.
- **Named Accents:** "Hazard Red" is reserved strictly for errors or critical warnings, while "Outline Muted" is used for technical grid lines and subtle decorative borders.

## Typography
The system uses **Space Grotesk** exclusively to maintain a technical, geometric aesthetic. 
- **Headlines:** Feature tight tracking and high weights. Italicized light weights are used sparingly for emphasis within headlines to create visual tension.
- **Labels:** Always uppercase with generous letter spacing to evoke technical spec sheets and industrial labeling.
- **Status Codes:** Used for metadata, enclosed in brackets (e.g., [ MODEL 001 ]) to reinforce the engineering theme.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy within a 1280px container, utilizing a systematic 8px spacing unit. 

- **Grid:** A background "Elegant Grid" of 40px blocks is used as a decorative watermark to suggest drafting paper.
- **Margins:** 24px horizontal gutters for desktop, reducing to 16px for mobile.
- **Sectioning:** Heavy vertical padding (80px) and explicit horizontal borders separate major content blocks, reinforcing the "built" nature of the page.
- **Asymmetry:** Content often uses staggered column placements (e.g., 2-column hero with an offset image) to create a dynamic, kinetic feel.

## Elevation & Depth
Depth is conveyed through **Bold Borders** and **Tonal Layering** rather than traditional shadows.

- **Borders:** 1px solid borders in `outline-variant` define most containers.
- **Structural Elevation:** Hard-edged offsets (e.g., -8px/-12px positioning) are used for overlapping elements, creating physical "depth" without soft blurs.
- **Shadows:** Reserved strictly for high-impact hover states or floating product modules. When used, they are heavy and "industrial" (`shadow-2xl`), not subtle.
- **Interactions:** Buttons utilize a "lift" effect (translate-y) on hover, suggesting mechanical movement.

## Shapes
The shape language is strictly **Sharp (0px roundedness)**. This reinforces the industrial, machined aesthetic. 

- **Primary Elements:** Buttons, cards, and input fields must have square corners.
- **Accent Elements:** Exception is made for user avatars or specific iconography that requires circular forms for legibility, but these should be contained within square frames where possible.
- **Borders:** Thick 4px borders are used on the bottom of buttons and at the top of the footer to suggest structural footings.

## Components
- **Buttons:** 
  - *Primary:* `industrial-yellow` background, black text, 4px bottom border. Hover state transitions to a slight upward translation.
  - *Secondary:* `stark-white` or `transparent` with 1px `outline` border.
- **Cards:** White or `surface-bone` background with a 1px border. Product images should be grayscale, transitioning to color on hover.
- **Navigation:** Fixed top bar with `nav-underline` interaction (expanding yellow line from the left).
- **Product Badges:** High-contrast black boxes with `status-code` typography in yellow.
- **Iconography:** Use "Material Symbols Outlined" with a weight of 400. Icons should be functional, not decorative.
- **Technical Grid:** An background pattern of `rgba(126, 119, 95, 0.05)` lines at 40px intervals.