# HiveDeliver

HiveDeliver is a frontend simulation of an AI-powered swarm drone delivery platform for SME last-mile logistics.
The app demonstrates decentralized swarm coordination, adaptive routing behavior, and real-time operational visibility using mock data.

## Highlights
- Authenticated app shell with role-aware navigation and dynamic role badges (Manager / SME User)
- Landing, auth, operations, and analytics pages
- Full multi-language UI via react-i18next (`en`, `ms`, `ta`, `zh`) across all pages
- Dark/light mode support
- Rich Live Drone Map with simulation controls
- AI-powered support chatbot for customer service
- Interactive drone camera feed simulation with recording capability

## Live Drone Map Features
- Warehouse marker, destination markers, and active drone markers
- Route simulation with no-fly zone detours
- Weather indicators and weather-aware route styling
- Drone-to-drone communication mesh (nearby link lines)
- Animated communication signals to visualize network traffic
- Swarm adaptive alerts panel (moved out of map canvas)
- Right-rail compact legend and priority context cards
- Swarm Coordination Status panel below the map
- Optional heatmap overlay from simulated coverage history
- Unified map view across all user roles (SME and Manager see the same full map)

## New Features & Enhancements
- **Interactive Camera Feed**: Canvas-based live drone perspective with HUD, recording timer, play/pause controls, and real-time telemetry.
- **Role-Based Delivery History**:
  - SME Users (`/history`): View their own detailed delivery history with Delivered / Cancelled / Failed status badges.
  - Managers (`/manager-history`): Global view of all deliveries with account type filtering and summary statistics.
- **AI Chat Support (`/support`)**: Multi-lingual chatbot capable of answering queries about parcel tracking, pricing, drone availability, operating hours, order cancellation, and more.
- **Complete Localization**: 100% translation coverage across Login, Register, Security, Swarm Optimization, Interactive Features, and Sidebar navigation in English, Malay, Chinese, and Tamil.
- **Security & Blockchain**: Dashboard demonstrating secure transaction ledgers and immutable delivery proofs.
- **Swarm Optimization**: Real-time visualization of battery-aware drone handoffs and multi-stop route efficiency.
- **Role Badge in Header**: Top-right header dynamically shows "SME User" or "Manager" based on the logged-in account.

## Main Pages
- Public landing (`/`)
- Login (`/login`) and sign-up (`/signup`, alias `/register`)
- Home (`/home`)
- Delivery Dashboard (`/dashboard`)
- Live Drone Map (`/map`)
- Create Delivery Order (`/order`)
- Delivery History — SME view (`/history`)
- Delivery History — Manager view (`/manager-history`)
- Saved Addresses (`/addresses`)
- Notifications (`/notifications`)
- Swarm Intelligence (`/intelligence`)
- Analytics (`/analytics`)
- Fleet Management (`/fleet`)
- Security & Blockchain (`/security`)
- Swarm Optimization (`/optimization`)
- Interactive Features (`/interactive`)
- AI Chat Support (`/support`)

## Tech Stack
- React + Vite
- Material UI
- React Router
- React Leaflet + Leaflet
- Recharts
- React Icons
- Canvas API (for live camera feed simulation)

## Folder Layout
Frontend app root is nested:
```text
HiveDeliver/
	src/
		components/
		contexts/
		data/
		hooks/
		i18n/
		pages/

## Getting Started

1. Install dependencies

```bash
cd HiveDeliver
npm install
```

2. Start development server

```bash
npm run dev -- --host
```

3. Build for production

```bash
npm run build
```

4. Lint

```bash
npm run lint
```

## Notes

- This is a frontend-only demo; all data is mocked.
- Simulation behavior is timer-driven and deterministic enough for UI demos.
- If the default port is occupied, Vite may move from `5173` to another port such as `5174`.
