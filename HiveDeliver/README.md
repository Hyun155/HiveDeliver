# HiveDeliver Frontend App

This folder contains the React + Vite frontend for HiveDeliver.

## Role-Based Special Features

### SME User

- Create delivery orders with map-backed routing context.
- View personal delivery history with status, date, and search filters.
- Track active deliveries with live ETA countdown and cancellation for dispatched parcels.
- Review parcel proof records with simulated capture evidence and downloadable receipts.
- Manage saved delivery addresses through add, edit, and delete actions.
- Use notification flows (header panel and notification page) with unread tracking.
- Access multilingual AI support chatbot for parcel and operations questions.

### Manager

- Review global delivery history with account-type breakdown and summary cards.
- Operate battery-aware drone handoff workflows in swarm optimization.
- Monitor and optimize multi-stop route efficiency.
- Use interactive command center with live drone camera feed cards and expanded feed view.
- Execute voice-command actions (assign, handoff, map, optimize, battery, return-to-base) through Web Speech API integration.
- Access analytics and security blockchain dashboards for broader operational oversight.

## Decentralized Swarm Intelligence

- Dynamic peer communication links are formed from distance-based proximity checks.
- Weather-risk and traffic-density events produce adaptive swarm alerts and reroute cues.
- Route generation uses no-fly-zone corridor detours before path interpolation.
- Priority mode reorders destination assignments by urgency and route context.
- Swarm status is continuously published for communication health, collision avoidance, route optimization, and redistribution readiness.

## Run

```bash
npm install
npm run dev -- --host
```

## Build

```bash
npm run build
```

## Lint

```bash
npm run lint
```

## Core Features

- Role-aware authenticated app layout
- Multi-language UI (`en`, `ms`, `ta`, `zh`)
- Live Drone Map with:
  - no-fly zone-aware routing
  - weather indicators and route adaptation
  - drone communication mesh lines
  - animated swarm link traffic
  - right-side alert/legend/priority cards
  - swarm status panel below map
- Dashboard, order flow, history, saved addresses, notifications, analytics, and fleet views

All data is mock data for frontend demonstration only.
