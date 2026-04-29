<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the DevExpo Next.js App Router project. Here's a summary of what was done:

- **`instrumentation-client.ts`** (new file): Initializes PostHog client-side using the `instrumentation-client` pattern for Next.js 15.3+. Configured with a reverse proxy (`/ingest`), error tracking (`capture_exceptions: true`), and debug mode in development.
- **`next.config.ts`** (updated): Added reverse proxy rewrites routing `/ingest/*` and `/ingest/static/*` and `/ingest/array/*` to PostHog's ingestion endpoints, plus `skipTrailingSlashRedirect: true`.
- **`.env.local`** (new file): Added `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` environment variables.
- **`components/ExploreBtn.tsx`** (updated): Added `posthog.capture('explore_events_clicked')` inside the existing `onClick` handler. Converted to client component.
- **`components/EventCard.tsx`** (updated): Added `posthog.capture('event_card_clicked', { ... })` with event title, category, location, date, and price properties on the Link click. Converted to client component.
- **`components/Navbar.tsx`** (updated): Added `posthog.capture('nav_link_clicked', { link })` on each nav link with the link label as a property. Converted to client component.

## Events

| Event Name | Description | File |
|---|---|---|
| `explore_events_clicked` | User clicked the 'Explore Events' CTA button on the homepage hero section | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicked on a featured event card to view event details | `components/EventCard.tsx` |
| `nav_link_clicked` | User clicked a navigation link in the top navbar | `components/Navbar.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard**: [Analytics basics](https://us.posthog.com/project/403085/dashboard/1525842)
- **Insight**: [Explore Events button clicks over time](https://us.posthog.com/project/403085/insights/efiiXnxc)
- **Insight**: [Event card clicks over time](https://us.posthog.com/project/403085/insights/C9l6LvhR)
- **Insight**: [Homepage to Event click conversion funnel](https://us.posthog.com/project/403085/insights/aBEw7kFs)
- **Insight**: [Most clicked event categories](https://us.posthog.com/project/403085/insights/3nQA0tWb)
- **Insight**: [Navigation link click breakdown](https://us.posthog.com/project/403085/insights/ryyuZMk7)

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
