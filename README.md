# Prit Hirpara - Personal Portfolio Website

A unique, premium, and professional personal portfolio website designed for **Prit Hirpara**, 3rd-Year B.Sc. IT student specializing in **Web Development** and **Database Management**.

---

## 🎨 Design Features
- **Color Palette:** Pure White canvas (`#FFFFFF`) with Midnight Slate Navy (`#0A192F`) structural typography and Electric Tangerine Orange (`#FF6600`) dynamic highlights.
- **Typography:** Modern, crisp pairing of Google Fonts:
  - `Plus Jakarta Sans` (Bold, clean headings)
  - `Inter` (High-readability body text)
  - `JetBrains Mono` (Technical badges and status pills)
- **Sections Included:**
  1. **Home / Hero:** Personal headline, live status badge, interest pills, micro-stats, and custom portrait card with floating badges.
  2. **About Me:** Academic story, B.Sc. IT context, core pillars, and 4-card Bento grid.
  3. **Technical Skills:** 3-pillar engineering domains with proficiency bars:
     - Frontend: HTML5, CSS3, JavaScript (ES6+)
     - Backend: PHP, Python, Java
     - Database & Ecosystem: MySQL, Git, GitHub, VS Code, XAMPP, phpMyAdmin
  4. **My Projects:** Deep-dive case studies for:
     - *Hospital Appointment Management System*
     - *Society Complaint Management System*
     - Interactive modal popup with complete database schema & architecture details.
  5. **Education:** Interactive academic timeline detailing 3rd-year B.Sc. IT coursework and milestones.
  6. **Certificates:** Verified credential gallery.
  7. **Contact Me:** Direct email copy-to-clipboard pill, location & social links, and an interactive message form with instant validation and feedback.
- **Motion & Interactions:** Smooth scroll-driven entrance reveals, card elevations, active navigation scroll-spy, and mobile drawer navigation.

---

## 📁 Project Structure

```text
prit-portfolio/
│
├── index.html                 # Main website HTML markup
├── css/
│   └── style.css              # Custom styling, tokens, animations, responsive rules
├── js/
│   └── main.js                # Mobile menu, modals, copy email, scroll reveals
├── assets/
│   └── images/
│       ├── avatar-placeholder.svg # Default geometric avatar illustration
│       └── profile.jpg            # (Drop your real portrait photo here!)
└── README.md                  # Project guide and instructions
```

---

## 📸 How to Add Your Own Photo
1. Take your professional photo and name it **`profile.jpg`**.
2. Place it inside the `assets/images/` folder:
   ```
   assets/images/profile.jpg
   ```
3. Refresh your browser! The website is pre-configured to automatically display `profile.jpg` (with an automatic fallback to the clean SVG avatar if the image is missing).

---

## 🌐 How to Preview & Run
You can open `index.html` in any web browser (Google Chrome, Microsoft Edge, Mozilla Firefox) directly:
- Double-click `index.html`, OR
- Use the VS Code "Live Server" extension, OR
- Run a simple local Python server:
  ```powershell
  python -m http.server 3000
  ```
  Then open `http://localhost:3000` in your browser.
