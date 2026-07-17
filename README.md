# Elevate Academy — Frontend

A Vite + React + Tailwind site for a fictional corporate training company,
built from your component/page structure.

## Run it

```bash
cd frontend
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Structure

```
frontend/
├── src/
│   ├── components/
│   │     Navbar.jsx        nav + search bar + login dropdown
│   │     Hero.jsx          headline + fanned certificate cards + wax-seal mark
│   │     Stats.jsx         500+ / 45+ / 120+ / 98% counters
│   │     Services.jsx      training categories + featured course cards
│   │     Testimonials.jsx  employee quotes
│   │     Footer.jsx        quick links, company links, social
│   │
│   ├── pages/
│   │     Home.jsx          Hero, Stats, Services, Testimonials, Why Us, Partners, CTA
│   │     About.jsx         mission + vision
│   │     Contact.jsx       contact form
│   │     Login.jsx         employee sign-in placeholder
│   │
│   ├── assets/
│   │     logo.png          placeholder wax-seal monogram — swap for your real logo
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tailwind.config.js
├── index.html
└── package.json
```

## Design tokens

| Role | Value |
|---|---|
| Paper (background) | `#F5F1E6` |
| Paper dark (section fill) | `#EAE3D2` |
| Ink (text) | `#16241F` |
| Forest (primary) | `#1F3D2B` |
| Brass (accent) | `#B8912F` |
| Brass light | `#D9B658` |
| Slate (secondary text) | `#52605A` |
| Display font | Newsreader (serif) |
| Body font | Inter |
| Data / labels | IBM Plex Mono |

**Signature element:** the hero's fanned stack of certificate cards with a wax-seal
badge that stamps in on load — a nod to the certification/diploma theme instead of a
generic stat block. Respects `prefers-reduced-motion`.

## Notes

- Uses `react-router-dom` for routing and `react-icons` (Feather set) for icons.
- The "Courses" nav link scrolls to `#courses` on the home page.
- Login is a static placeholder — wire up real auth to load an actual dashboard.
- All copy is original placeholder content for the fictional "Elevate Academy" —
  swap freely.
