# HiveDeliver

HiveDeliver is a frontend simulation of an AI-powered swarm drone delivery platform for SME last-mile logistics.
The app demonstrates decentralized swarm coordination, adaptive routing behavior, and real-time operational visibility using mock data.

## Project Layout

This repository uses a nested frontend folder:

```text
.
|-- README.md
`-- HiveDeliver/
    |-- package.json
    |-- src/
    |   |-- components/
    |   |-- contexts/
    |   |-- data/
    |   |-- hooks/
    |   |-- i18n/
    |   `-- pages/
    `-- public/
```

Run all npm commands from the `HiveDeliver` folder.

## Highlights

- Role-aware authenticated app shell with dynamic Manager and SME User badge behavior
- Multi-language UI using react-i18next (`en`, `ms`, `ta`, `zh`)
- Light and dark mode support
- Rich live drone map simulation with weather-aware route behavior
- AI chatbot support page for customer-service style Q and A
- Canvas-based drone camera simulation with telemetry and recording states
- Security and blockchain themed dashboard views

## Live Drone Map Features

- Warehouse, destination, and active drone markers
- Route simulation with no-fly-zone detours
- Weather indicators with route-style adaptation
- Drone-to-drone communication mesh links
- Animated swarm network traffic signals
- Swarm adaptive alerts panel and compact legend cards
- Coordination status panel below the map
- Optional heatmap overlay from simulated coverage history

## Role-Based Special Features

### SME User Features

- Delivery creation flow with route-aware order setup on /order.
- Personal delivery history on /history with filters by parcel, status, and date.
- Active order tracking on /active-orders with live ETA countdown, drone battery, distance, and cancel-when-dispatched flow.
- Parcel proof center on /parcel-proof with Delivered and Failed evidence views, simulated drone photo captures, and downloadable receipt text files.
- Saved address book on /addresses with add, edit, and delete management for repeat deliveries.
- Notification center from header panel and /notifications page with unread counters, delivery lifecycle alerts, and mark-all-read support.
- AI support chat on /support with quick actions and multilingual intent handling for tracking, pricing, cancellation, and operations questions.
- Shared live map access on /map with swarm alerts, no-fly visibility, weather overlays, and simulation controls.

### Manager Features

- Platform-wide delivery history on /manager-history with account-type segmentation (SME versus manager), status/date filters, and performance summaries.
- Swarm optimization console on /optimization with battery-aware handoff execution and multi-stop route optimization monitoring.
- Interactive command center on /interactive with live drone camera feed cards, full-screen feed view, and command history.
- Voice operations interface in the interactive module using Web Speech API command parsing for assign, handoff, map lookup, route optimization, battery checks, and return-to-base actions.
- Manager analytics view on /analytics for KPI and trend visibility.
- Security and blockchain dashboard on /security for immutable proof and trust-focused operations visualization.
- Shared map command visibility on /map with real-time swarm health, communication links, and adaptive alert streams.
- Role-aware shell controls with manager badge context and multilingual UI support.

## Decentralized Swarm Intelligence Focus

HiveDeliver centers on local, decentralized coordination rather than a single static route plan. Core simulation behavior includes:

- Local peer-to-peer communication mesh: drones form dynamic links when within range using SWARM_COMMUNICATION_RANGE_METERS and live distance checks.
- Local traffic awareness: high neighbor-density areas trigger adaptive traffic alerts and rerouting hints.
- Weather-triggered decentralized adaptation: unsafe destination weather generates swarm adjustment alerts and nearby support-drone assistance suggestions.
- Task redistribution signals: swarm state exposes when adaptive redistribution should activate based on active alerts.
- No-fly-zone-safe corridor routing: route generation inserts detour waypoints around restricted circles before interpolation.
- Priority-aware assignment: priority mode reorders destinations by criticality and rural urgency before route assignment.
- Continuous autonomous telemetry loop: drone progress, ETA, links, and alert summaries are recalculated and emitted on timed intervals.
- Operator-observable swarm state: communication status, collision-avoidance activity, optimization state, and redistribution readiness are surfaced in the Swarm Status panel.

## Main Routes

- Public: `/`
- Auth: `/login`, `/signup`, `/register`
- Protected: `/home`, `/dashboard`, `/map`, `/order`, `/active-orders`, `/parcel-proof`
- Delivery history: `/history` (SME), `/manager-history` (Manager)
- Operations: `/addresses`, `/notifications`, `/fleet`, `/analytics`, `/intelligence`
- Advanced modules: `/security`, `/optimization`, `/interactive`, `/support`

## Demo Accounts

Use these built-in accounts for local testing:

- Manager: `manager@hivedeliver.com` / `manager123`
- SME User: `user@hivedeliver.com` / `user123`

Credentials and session state are stored in browser localStorage keys:

- `hiveDeliver_users`
- `hiveDeliver_currentUser`

## Tech Stack

- React 19 + Vite
- Material UI
- React Router
- React Leaflet + Leaflet
- Recharts
- React Icons
- i18next / react-i18next

## Getting Started

1. Install dependencies

```bash
cd HiveDeliver
npm install
```

2. Start the development server

```bash
npm run dev -- --host
```

3. Build for production

```bash
npm run build
```

4. Preview production build

```bash
npm run preview
```

5. Run linting

```bash
npm run lint
```

## Notes

- This is a frontend-only demo; all operational data is mocked.
- The simulation is timer-driven and intended for UI and workflow demonstrations.
- If port 5173 is busy, Vite automatically selects another available port.
