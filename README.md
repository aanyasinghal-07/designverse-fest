# DesignVerse 2026 — A Student Design & Innovation Fest 🚀

[![Repository](https://img.shields.io/badge/GitHub-designverse--fest-8b5cf6?logo=github)](https://github.com/aanyasinghal-07/designverse-fest)
[![Website Status](https://img.shields.io/badge/Status-Complete-10b981.svg)](https://github.com/aanyasinghal-07/designverse-fest)
[![Tech Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-purple.svg)](https://github.com/aanyasinghal-07/designverse-fest)
[![Theme](https://img.shields.io/badge/Theme-Electric%20Purple%20%26%20Coral-ff6b6b.svg)](https://github.com/aanyasinghal-07/designverse-fest)
[![Responsive](https://img.shields.io/badge/Responsive-Mobile%20%7C%20Tablet%20%7C%20Desktop-38bdf8.svg)](https://github.com/aanyasinghal-07/designverse-fest)

A modern, visually captivating, fully responsive single-page landing website crafted for **DesignVerse — A Student Design & Innovation Fest**, scheduled for **14 November 2026** at the **IGDTUW Campus, Delhi**.

Designed with an aesthetic inspired by premier creative technology conferences and festivals (Config, OFFF Barcelona, Apple Events), the site blends dark obsidian space backgrounds, glowing radial ambient lighting, glassmorphism, crisp modern typography, and responsive interactive features.

---

## 🎨 Visual & Design System

- **Color Palette:**
  - **Base Obsidian:** `#090a12` and `#05060a` deep navy backdrop
  - **Primary Accent:** Electric Purple (`#8b5cf6`, `#7c3aed`) with luminous glow halos
  - **Secondary Accent:** Neon Coral / Sunset (`#ff6b6b`, `#f97316`)
  - **Soft Accents:** Lavender (`#c4b5fd`, `#ddd6fe`) and Vibrant Pink (`#ec4899`)
  - **Text:** High-contrast pure white (`#f8fafc`), slate (`#cbd5e1`), and muted slate (`#94a3b8`)
- **Typography:**
  - **Headings & Display:** `Space Grotesk` & `Syne` (modern geometric fonts via Google Fonts)
  - **Body & Controls:** `Plus Jakarta Sans` (ultra-readable modern sans-serif)
- **Visual Elements:**
  - Dynamic geometric 3D orbital core with multi-axis rotating rings and spatial badges.
  - Interactive ambient particle canvas with subtle starry mesh lines connecting near nodes.
  - Glassmorphic card surfaces (`backdrop-filter: blur`, 1px layered glowing gradient borders).
  - Spotlight cursor hover effect tracking mouse movement on activity cards.

---

## ⚡ Core Sections & Features

### 1. Header & Navigation
- Frosted glass sticky navbar with dynamic blur on scroll.
- Geometric brand mark with glowing 2026 badge.
- Keyboard-accessible mobile hamburger drawer with smooth bar-to-X animation.
- Desktop "Register Now" quick-action button with glowing border.

### 2. Hero Section
- **Headline:** *"Imagine Beyond. Design What's Next."*
- **Event Metadata Strip:** Date (14 Nov 2026), Time (10:00 AM – 5:00 PM IST), Venue (IGDTUW Campus, Delhi).
- Dual Call-to-Action buttons: "Register Now" (smoothly scrolls to registration) and "Explore the Fest" (scrolls to highlights).
- **Live Countdown Timer:** Real-time calculation counting down Days, Hours, Minutes, and Seconds to fest kickoff.
- **Abstract Geometric Artwork:** Pure CSS orbital gyroscope visual with holographic glow core and floating spatial micro-cards.

### 3. About DesignVerse
- Concise narrative covering the core ethos: Creative Problem-Solving, Design Thinking, Radical Experimentation, and Cross-Campus Synergy.
- 4 aesthetic value cards with custom SVG iconography.
- Animated stats counter strip (500+ Student Creators, 6 Dynamic Tracks, 15+ Mentors, ₹50K Grants & Swag).

### 4. Event Highlights (6 Tracks)
Detailed interactive cards with tags, descriptions, and custom SVG artwork:
1. **UI/UX Design Challenge:** 90-minute live Figma sprint with industry judges.
2. **Design Thinking Workshop:** Hands-on masterclass in user empathy and journey mapping.
3. **Innovation Showcase:** Exhibition of student generative AI interfaces, hardware hacks, and creative tech.
4. **Creative Poster Competition:** Speculative design, typography, and gallery showcase.
5. **Interactive Tech Experiences:** Creative coding, sensory audio-visual synths, and WebGL booths.
6. **Networking with Creative Minds:** Creator lounge, portfolio reviews, and collaborator mixer.

### 5. Event Schedule & Timeline
- Step-by-step agenda starting at 10:00 AM through 5:00 PM.
- Interactive filter pills: **All Sessions**, **Morning (10 AM - 1 PM)**, and **Afternoon (2 PM - 5 PM)**.
- Glowing session cards with venue room tags and custom time badges.

### 6. Venue & Campus Logistics
- Campus coordinates and transit guidance (2-minute walk from Kashmere Gate Metro Gate 7).
- Campus facilities rundown (Auditorium Hall A, Tech Labs, Open Courtyard, WiFi & Meals).

### 7. Interactive Registration & Digital Pass Generator
- Accessible student registration form with fields:
  - **Full Name** (live character validation)
  - **Email Address** (strict regex email format checking)
  - **College / University Name**
  - **Year of Study** (dropdown: 1st Year to Postgraduate)
  - **Area of Interest** (dropdown: UI/UX, Graphic Design, Web Development, AI/ML, Product Design, Other)
  - **Student ID Confirmation Checkbox**
- **Client-Side Form Validation:**
  - Real-time feedback with green/red indicator borders and clear error messages.
  - Prevents empty or invalid submissions with an animated warning alert.
  - Transparent demo notice clarifying client-side prototype behavior.
- **Holographic Digital Delegate Pass Generator:**
  - Instant transition to a personalized holographic pass featuring the delegate's name, college, year, selected track, custom ticket serial ID (`DV-2026-XXXX`), and simulated QR code.
  - **Print / Save Pass** button triggering custom CSS print styles.
  - **Register Another Attendee** button to easily reset the form.

### 8. Frequently Asked Questions (FAQ)
- Expandable accordion answering common attendee questions (eligibility, team size, bring-your-own-device guidelines, certificates, fees).
- Full `aria-expanded` and keyboard navigation support.

### 9. Footer
- Festival branding recap and mission statement.
- Quick navigation links and activities directory.
- Contact email (`contact@designverse.edu`) clearly marked as a demo example.
- Social media profile buttons (Instagram, LinkedIn, X, GitHub).
- Back-to-top smooth scrolling anchor.

---

## 🛠️ Technology Stack

- **HTML5:** Semantic architecture (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`), ARIA attributes, meta tags.
- **CSS3:** Modern design tokens, CSS Grid, Flexbox, backdrop-filter glassmorphism, keyframe animations, `@media (prefers-reduced-motion: reduce)`, and `@media print`.
- **Vanilla JavaScript (ES6+):** Lightweight, zero third-party dependencies. Manages mobile drawer, countdown calculations, particle canvas rendering, form validation, dynamic pass rendering, and intersection observers.

---

## 📁 Project Structure

```
designverse-fest/
├── index.html        # Complete semantic HTML5 structure
├── style.css         # Custom modern design system & responsive styling
├── script.js         # Interactive behavior, validations, and animations
├── .gitignore        # Clean Git ignore rules for OS and temp files
└── README.md         # Documentation, tech stack, and setup instructions
```

---

## 🚀 How to Run Locally

You can run this project locally using any modern web browser or local server:

### Option 1: Direct File Open
Simply double-click `index.html` or drag it into any web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Using Python
```bash
py -m http.server 3000
```
Then open `http://localhost:3000` in your browser.

### Option 3: Using Node.js
```bash
npx serve .
```

---

## 🌐 Deploy to GitHub Pages (Optional)

You can easily host this landing page for free on GitHub Pages:
1. Go to your repository settings: **Settings > Pages**.
2. Under **Build and deployment > Source**, select **Deploy from a branch**.
3. Choose branch `main` and folder `/ (root)`.
4. Click **Save**. Your site will be live at `https://aanyasinghal-07.github.io/designverse-fest/` within minutes!

---

## ♿ Accessibility & Performance

- **Keyboard Accessible:** Skip-to-content link, distinct visible focus rings (`:focus-visible`), interactive tab indexing.
- **Contrast Ratios:** Compliant text contrast over dark backgrounds for enhanced readability.
- **Motion Sensitivities:** Respects `prefers-reduced-motion: reduce` by disabling canvas particles and complex animations.
- **Lightweight:** Uses inline SVGs and native CSS shapes; no heavy external libraries, fonts loaded efficiently via Google Fonts.

---

## 📜 License & Acknowledgments
Created as a student design and innovation showcase project for **DesignVerse 2026**.
Repository: [aanyasinghal-07/designverse-fest](https://github.com/aanyasinghal-07/designverse-fest)
