
  # High-Fidelity Hebrew Landing Page

  This is a code bundle for High-Fidelity Hebrew Landing Page. The original project is available at https://www.figma.com/design/mIERtIwf6tdAZiRjtrqYxT/High-Fidelity-Hebrew-Landing-Page.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Performance checks (PageSpeed/Lighthouse)

  1. Build production assets: `npm run perf:build`
  2. Serve production build: `npm run perf:serve`
  3. In a second terminal run:
     - Mobile profile: `npm run perf:lighthouse:mobile`
     - Desktop profile: `npm run perf:lighthouse:desktop`

  Reports are generated under `.perf/`.

  ### Performance guardrails

  Budgets are defined in `.perf/budgets.json`:
  - `LCP` target: under `2.5s`
  - `FCP` target: under `2.0s`
  - `Total` transfer target: under `1.7MB`
  - Third-party request count target: up to `8`
  