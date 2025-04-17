# you.erkan.dev – Who Are You Today?

🌟 Discover your daily magical identity by selecting a mysterious fantasy card!  
Flip. Reveal. Explore your inner self.

---

## ✨ Features

- 💎 Dynamic fantasy card generation
- 🔣 Smooth 3D flip animations
- 📺 Responsive and mobile-first design
- 🔍 Animated magic glow based on card rarity:
  - Common / Rare / Legendary
- 🌟 Copy your identity phrase easily
- ♻ Shuffle & Try Again as much as you want
- 📊 Light analytics with PostHog
- 💜 Fantasy-themed design, inspired by tarot cards

---

## 🚀 Live Demo

👉 [https://you.erkan.dev](https://you.erkan.dev)

---

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS, shadcn/ui
- **Animations:** Framer Motion
- **State Management:** Zustand
- **QR Code (planned future add-on)**: TBD
- **Analytics:** PostHog
- **Hosting:** Vercel

---

## 📁 Setup Instructions

1. **Clone the repo**

   ```bash
   git clone https://github.com/erkanercan/erkandev-you.git
   cd erkandev-you
   ```

2. **Install dependencies** (uses `npm`)

   ```bash
   npm install
   ```

3. **Run locally**

   ```bash
   npm run dev
   ```

4. **Build**
   ```bash
   npm run build && npm start
   ```

---

## 🔐 Environment Variables

> Create a `.env.local` file:

```env
NEXT_PUBLIC_POSTHOG_KEY=your_public_posthog_key
```

---

## 📈 PostHog Events Tracked

| Event Name              | Description                       |
| ----------------------- | --------------------------------- |
| `game_started`          | When user starts the game         |
| `card_selected`         | When a user clicks a card         |
| `card_flipped`          | When a card is flipped            |
| `card_opened_legendary` | When user reveals Legendary card  |
| `card_opened_rare`      | When user reveals Rare card       |
| `card_copied`           | When user copies their identity   |
| `card_retry`            | When user resets to shuffle again |

---

## 🌌 Favicon & SEO

- Favicon generated using [realfavicongenerator.net](https://realfavicongenerator.net/)
- SEO metadata configured via `layout.tsx`
- OpenGraph and Twitter Card meta ready

---

## 📅 Future Improvements

- ✨ Unlock special Legendary animations
- 💫 Particle effects on Legendary reveals
- 🔗 Share your result on social media
- 🔐 Unlock achievements after multiple flips
- 🛋‍♀️ Mobile PWA support

---

## 💃 Acknowledgements

- [Next.js](https://nextjs.org/)
- [Framer Motion](https://framer.com/motion)
- [Zustand](https://zustand-demo.pmnd.rs/)
- [shadcn/ui](https://ui.shadcn.com/)
- [PostHog](https://posthog.com)

---

## 💊 License

This project is for personal and educational use.  
Feel free to explore, flip cards, and find your magic!
