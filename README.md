# Vitality Flow Splash

Build the Splash / Launch screen for Vitality Flow (peri & menopause self-tracking app).

Layout:

- Solid background fill #4A2B4E, device frame 430 × 932 with rounded corners rx=32.

- Cream-coloured (#F4EEE7) organic brushstroke path centred at roughly y≈340-470 and the wordmark "Vitality Flow" centred at roughly y≈560-590.

- No buttons, no inputs, no links, no chrome. Pure brand statement.

Behaviour:

- After 1.2 s (or on tap-anywhere) auto-routes to Welcome. Honour `prefers-reduced-motion` — fade only, no slide.

- No network calls, no fonts to load, no remote images.

Tone & copy:

- No marketing text on this screen — just the logo mark + wordmark.

European / GDPR rules (apply to this screen too):

- No cookies set. No analytics. No third-party scripts of any kind.

- No remote font loads; system font stack only.

- All state stays in localStorage / IndexedDB. No backend, no cloud sync, no account creation.

- en-GB date formatting ("Saturday, 19 September 2026").

- Privacy-first language: address the user as "you"; describe the app as "your data" never "our data".

Accessibility:

- Headline uses semantic <h1> (or appropriate level). All interactive elements have visible focus rings (≥2px, contrast ≥3:1).

- Colour contrast ≥4.5:1 for body text, ≥3:1 for large text and UI components.

- Honour `prefers-reduced-motion`: no auto-animations, fades, or parallax.

- All form controls have <label> + aria-label where icon-only.

Edge cases Lovable must handle:

- Empty state: first-launch copy ("Nothing here yet — start your first check-in.").

- Loading state: skeleton loaders (no spinner if reduced-motion is set).

- Error state: inline message only, never a modal blocking the CTA. CTA stays enabled so the user can retry.

- Reduced-motion: disable all transitions; static rendering only.

- Offline: works fully offline after first paint. No network calls during interaction.
Visual attached

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/36b39f07-8f4a-4fa8-9660-fe273ba1acb9).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
