# Qamar Abbas — Portfolio

Personal portfolio of **Qamar Abbas**, an AI/ML engineer and Python developer in Islamabad, Pakistan, studying BS Artificial Intelligence at Shifa Tameer-e-Millat University.

**Live:** https://protfolio-4wo9.vercel.app · **Resume:** [/resume](https://protfolio-4wo9.vercel.app/resume) ([PDF](https://protfolio-4wo9.vercel.app/resume.pdf))

## What's on the site

- **Projects** with dataset, method, results and live/code links: Raahi (multi-agent trip planner), KKH Road Status (calibrated road-risk model), Diabetes Risk Assessment, USWA AI Assistant, GPA and loan predictors, UniPredict, and more.
- **Certifications**: four verifiable Coursera certificates (IBM, DeepLearning.AI and Stanford, Vanderbilt) plus school courses and awards.
- **Resume** at `/resume`: a one-page A4 CV rendered from the same data as the site, printable and exported to `public/resume.pdf`.
- Services, experience, a WhatsApp-based project inquiry form and a small rule-based chatbot.

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · deployed on Vercel.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm run start
```

## Where things live

| Path | What it holds |
| --- | --- |
| `lib/constants.ts` | All portfolio content: profile, skills, projects, certificates, services, experience |
| `lib/resume.ts` | Resume content (bullets, skills, links), built on `constants.ts` |
| `lib/logos.ts` | Name → logo map for tool and organisation logos in `public/logos` |
| `app/resume/` | The printable resume page |
| `components/sections/` | One component per section of the home page |
| `public/projects`, `public/certificates` | Screenshots and certificates (WebP) |

## Updating the resume PDF

1. Edit `lib/resume.ts` (or `lib/constants.ts`).
2. Run the site, open `/resume`, press **Print** and choose **Save as PDF** (A4, margins *None*, background graphics on).
3. Save it as `public/resume.pdf` and commit.

## Site URL

Canonical links, the sitemap and social previews use `https://protfolio-4wo9.vercel.app`. If the domain changes, set `NEXT_PUBLIC_SITE_URL` in the Vercel project settings.

## Credits

Tech logos from [Devicon](https://devicon.dev) (MIT) and [Simple Icons](https://simpleicons.org) (CC0); university and issuer logos belong to their owners and are used only to identify them.
