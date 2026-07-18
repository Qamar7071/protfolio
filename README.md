# Qamar — Portfolio Website

Personal portfolio of **Qamar**, an AI/ML Engineer & Full-Stack Developer based in Rawalpindi, Pakistan.

Built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Framer Motion** — clean "Apna College" inspired theme (coral/red + yellow, light mode).
npm run dev
---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production

```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
qamar-portfolio/
├── app/
│   ├── globals.css       # Global styles + Tailwind utilities
│   ├── layout.tsx        # Root layout, SEO metadata, fonts, toaster
│   └── page.tsx          # Homepage (sections assembled here)
├── components/
│   └── layout/
│       └── Navbar.tsx    # Sticky navbar with mobile drawer
├── lib/
│   ├── constants.ts      # All site content (edit your info here!)
│   └── utils.ts          # cn() helper + utilities
├── public/               # Images, resume.pdf, favicon, etc.
├── tailwind.config.ts    # Theme colors + animations
├── next.config.mjs
├── tsconfig.json
└── package.json
```

---

## ✏️ Customize Your Info

Almost all your personal content lives in **`lib/constants.ts`**:

- `SITE_CONFIG` — name, title, email, phone, location, resume URL
- `SOCIAL_LINKS` — GitHub, LinkedIn, Twitter, etc.
- `PROJECTS` — your featured projects
- `EXPERIENCE` — your work history
- `SKILL_CATEGORIES` — your tech stack
- `TESTIMONIALS`, `SERVICES`, `FAQS` — supporting content

Replace the placeholder values (email, links, etc.) with your real details.

---

## 📦 Add These Assets to `/public`

- `resume.pdf` — your CV (linked from navbar)
- `favicon.ico`, `icon.png`, `apple-icon.png` — site icons
- `og-image.png` — 1200×630 social share image
- `avatar.png` — your photo (used in hero)
- `projects/*.png` — project screenshots
- `testimonials/*.jpg` — client photos

---

## 🎨 Theme

- **Primary:** Coral/Red `#e94560`
- **Accent:** Yellow `#ffd166`
- **Style:** Clean, light-mode, card-based (Apna College inspired)

Edit colors in `tailwind.config.ts` → `theme.extend.colors`.

---

## 🛠 Build Progress

- [x] Config + global styles
- [x] Root layout (SEO, fonts, toaster)
- [x] Constants (content)
- [x] Navbar (sticky + mobile drawer)
- [ ] Hero section
- [ ] About section
- [ ] Skills section
- [ ] Projects section
- [ ] Experience section
- [ ] Contact section (form + validation)
- [ ] Footer

Placeholder sections currently render in `app/page.tsx` — they'll be replaced one by one.
