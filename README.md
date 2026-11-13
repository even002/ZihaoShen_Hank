# Zihao Shen — Game Design Portfolio

A supporting website for my game design portfolio and applications.
It is separate from any submitted portfolio PDF or showreel.

Live site: https://even002.github.io/ZihaoShen_Hank/

## Projects

- **Ready to Die:** individual Unity project; game and level design.
- **Last Amber:** Unreal Engine team project; VFX design and implementation.
- Each case describes decisions, revisions, personal contributions and credits.
- Ready to Die includes a separate asset and audio credits page.
- AI-assisted production and third-party assets are disclosed in the cases.

## Development

React 19, Vite 8 and CSS. Static hosting with hash-based routes.

```sh
pnpm install
pnpm dev
pnpm lint
pnpm build
pnpm preview
```

The build is written to `dist/`. Relative asset paths support root and subfolder hosting.
GitHub Actions deploys pushes to `main` to GitHub Pages.
Homepage content is in `src/components/HomePortfolio.jsx`; case content starts in `src/App.jsx` and `src/components/ReadyToDieCase.jsx`.
Media dimensions are recorded in `src/mediaDimensions.json`; update them when replacing captures.
Add CV, portfolio and video links only after the actual files or public URLs are available.
