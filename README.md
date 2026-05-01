# DevExpo — The High-Performance Command Center for Developer Events

DevExpo is a production-grade event discovery and booking platform engineered for modern developer communities. It combines a blazing-fast Next.js App Router frontend, MongoDB-backed event intelligence, Cloudinary media ingestion, and deep PostHog product analytics to deliver a high-conversion experience from discovery to booking.

If you want a project that feels startup-ready, data-aware, and built with serious engineering intent — this is it.

---

## Live Deployment

**Production URL:** [https://devexpo-iota.vercel.app](https://devexpo-iota.vercel.app)

Explore the deployed experience end-to-end, including event discovery, event detail pages, and booking interactions with analytics instrumentation.

---

## Why DevExpo Stands Out

- **Built on bleeding-edge frontend tech** with Next.js `16.3.0-canary.2` and React `19.2.5` for highly responsive UX.
- **Real backend workflows** using App Router route handlers + server actions.
- **Data-layer discipline** with typed Mongoose models, indexes, schema validation, slug generation, and normalization hooks.
- **Full event lifecycle coverage**: list events, event detail pages, similar-event recommendations, and attendee booking capture.
- **Cloudinary-powered image upload pipeline** for event media ingestion.
- **Deep product analytics with PostHog**, including custom events and exception capture.
- **Performance-oriented rendering strategy** using cache directives in server components.

---

## Feature Inventory (Complete)

### Event Discovery Experience
- Hero section with clear CTA and featured-events rendering.
- Dynamic event cards with metadata.
- Dedicated event detail pages at `events/[slug]`.
- Similar events surfacing based on tag overlap.
- Agenda, organizer, audience, venue, location, date/time, and mode presentation.

### Booking Flow
- Email capture form for event booking.
- Server action (`createBooking`) for durable booking writes.
- Success/error UX handling.
- Duplicate-booking protection at DB level via compound unique index (`eventId + email`).

### Event API Surface
- `GET /api/events` — fetch all events.
- `POST /api/events` — create an event with form data + image upload to Cloudinary.
- `GET /api/events/[slug]` — strict slug-validated event fetch.

### Data & Schema Controls
- Automatic slug generation from event title.
- Date normalization to ISO-like `YYYY-MM-DD`.
- Time normalization to 24-hour format.
- Required-field and enum validation (e.g., mode: `online | offline | hybrid`).
- Schema indexes for performance and integrity.

### PostHog Analytics & Product Intelligence
- Client-side PostHog initialization through `instrumentation-client.ts`.
- Reverse-proxied ingestion (`/ingest`) configured in Next.js rewrites.
- Development debug mode enabled for analytics visibility.
- Exception capturing enabled (`capture_exceptions: true`).
- Tracked conversion-critical events:
  - `explore_events_clicked`
  - `event_card_clicked`
  - `nav_link_clicked`
  - `event-booked`
- Booking failure path reports with `posthog.captureException(...)`.

---

## Tech Stack

- **Framework:** Next.js App Router
- **UI:** React + TypeScript + Tailwind CSS
- **Database:** MongoDB + Mongoose
- **Media:** Cloudinary
- **Analytics:** PostHog (`posthog-js`)
- **Utilities/UI tooling:** clsx, class-variance-authority, tailwind-merge, lucide-react

---

## Project Structure

```text
app/
  api/events/route.ts                # List + create events
  api/events/[slug]/route.ts         # Fetch event by slug
  events/[slug]/page.tsx             # Event detail page
  page.tsx                           # Home page
components/
  EventCard.tsx
  ExploreBtn.tsx
  Navbar.tsx
  BookEvent.tsx
database/
  event.model.ts                     # Event schema + hooks + indexes
  booking.model.ts                   # Booking schema + indexes
lib/
  actions/event.actions.ts           # Server actions for event queries
  actions/booking.actions.ts         # Server action for booking writes
  mongodb.ts                         # Connection caching + initialization
instrumentation-client.ts            # PostHog client setup
next.config.ts                       # PostHog ingest rewrites
```

---

## Local Setup (Step-by-Step)

### 1) Prerequisites
- Node.js 20+
- npm 10+
- MongoDB connection URI (local or Atlas)
- Cloudinary account credentials
- PostHog project token

### 2) Install dependencies

```bash
npm install
```

### 3) Configure environment variables
Create `.env.local` in the project root:

```bash
MONGODB_URI=your_mongodb_connection_string

NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN=your_posthog_project_token
NEXT_PUBLIC_POSTHOG_HOST=https://us.posthog.com

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4) Run the app

```bash
npm run dev
```

Open locally: `http://localhost:3000`

Live app: `https://devexpo-iota.vercel.app`

### 5) Verify analytics quickly
- Click **Explore Events** on the homepage.
- Click any event card.
- Submit a booking email on an event page.
- Check your PostHog project events stream for:
  - `explore_events_clicked`
  - `event_card_clicked`
  - `nav_link_clicked`
  - `event-booked`

---

## Production Commands

```bash
npm run build
npm run start
npm run lint
```

---

## What This Project Demonstrates

DevExpo demonstrates strong full-stack execution: modern rendering patterns, API discipline, schema-first persistence, analytics maturity, and realistic user journey instrumentation. It is not a toy UI — it is an architecture-forward product foundation with measurable behavior tracking baked in.
