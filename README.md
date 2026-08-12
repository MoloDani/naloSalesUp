# Nalo Packs

A marketing and sales site for a set of VFX and motion-graphics packs aimed at video editors — drag-and-drop overlays, titles, and 3D effects that drop into an existing editing workflow.

**Live site:** [nalopacks.com](https://www.nalopacks.com)

<!-- Add a screenshot or short GIF here — it does more work than any paragraph below.
     Save it to public/ and reference it like:
     ![Nalo Packs landing page](public/screenshot.png) -->

## What it does

The site is a single long-form landing page built from independent, self-contained sections, plus a checkout hand-off and an email capture flow:

- **Animated product storytelling** — scroll-driven sections built with GSAP, Framer Motion, and Lottie, including a laptop mock-up animation with a separate mobile variant so the effect degrades sensibly on small screens.
- **Video previews** — `react-player` embeds showing the packs applied to real footage.
- **Free sample capture** — visitors trade an email address for a sample pack; the address goes to MailerLite.
- **Checkout hand-off** — the buy sections route to a Stripe payment link, so the site stays fully static and holds no payment logic or customer data.
- **FAQ with anchor navigation** — an in-page jump target so calls-to-action elsewhere can deep-link into the relevant answer.
- **Loading screen** — a timed intro on the home route only; other routes skip it and fade in immediately.
- **SEO** — `next-sitemap` generates `sitemap.xml` and `robots.txt` at build time via a `postbuild` hook.

## Built with

| Layer | Stack |
|---|---|
| Framework | Next.js 13 (Pages Router) |
| Language | TypeScript |
| Styling | Tailwind CSS, `tailwind-merge`, `class-variance-authority` |
| Animation | GSAP, Framer Motion, Lottie (`lottie-react`, `lottie-web`) |
| UI primitives | Radix UI, `lucide-react` icons |
| Email | MailerLite |
| Payments | Stripe (hosted payment link) |
| Analytics | Vercel Analytics |
| Hosting | Vercel |

## Running locally

```bash
git clone https://github.com/MoloDani/Nalo-Packs.git
cd Nalo-Packs
npm install
npm run dev
```

Open <http://localhost:3000>.

### Environment variables

Create a `.env.local` in the project root:

```bash
NEXT_PUBLIC_API_BASE=      # base URL for the API the front end talks to
NEXT_PUBLIC_STRIPE_LINK=   # Stripe hosted checkout link
```

Both are `NEXT_PUBLIC_`, so they are exposed to the browser by design — don't put anything secret in them.

### Other scripts

```bash
npm run build   # production build (runs next-sitemap afterwards)
npm run start   # serve the production build
npm run lint    # ESLint
```

## Project structure

```
components/
  sections/   one component per landing-page section
  utils/      shared helpers (back-to-top, etc.)
lib/          utilities
pages/        routes (Pages Router)
public/       images, Lottie JSON, video assets
styles/       global CSS and Tailwind layers
```

Sections are deliberately isolated: `pages/index.tsx` is little more than an ordered list of them, so the page can be re-sequenced or A/B tested by moving a single line.

## Notes

Desktop and mobile have separate components for the heaviest animations rather than one responsive component, because the mobile versions use lighter assets and simpler timelines instead of scaling the desktop ones down.
