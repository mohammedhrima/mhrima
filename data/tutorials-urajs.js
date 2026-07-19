/**
 * UraJS documentation.
 *
 * Kept in its own module (rather than inside tutorials.js) because it tracks
 * the framework README closely and changes on its own cadence.
 * Source of truth: https://github.com/mohammedhrima/UraJS/blob/main/README.md
 */
export const uraJsTutorial = {
  id: "urajs",
  label: "Framework Docs",
  title: "UraJS",
  tagline:
    "A small reactive UI framework built from scratch — its own JSX runtime, a keyed reconciler, directory-based routing, and zero runtime dependencies.",
  github: "https://github.com/mohammedhrima/UraJS",
  groups: [
    {
      label: "Getting Started",
      sections: [
        {
          id: "introduction",
          title: "Introduction",
          blocks: [
            {
              type: "text",
              content:
                "UraJS is a single-page application framework written from the ground up. It has its own JSX runtime (no React), a reactive State hook, a keyed reconciler, file-system routing, live reload in development, and a static build that deploys behind any web server.",
            },
            {
              type: "text",
              content:
                "Pages and components can be written in .tsx, .ts, .jsx or .js — the default starter pages are TypeScript.",
            },
            { type: "heading", content: "Features" },
            {
              type: "list",
              items: [
                "Own JSX runtime with the Ura.e / Ura.fr pragma — no virtual-DOM library",
                "Reactive State hook with fine-grained, per-instance re-renders",
                "Keyed reconciliation that preserves DOM and component state across reorders",
                "Directory-based routing, including dynamic :param segments",
                "Directives as tags or attributes: ura-if / ura-elif / ura-else, ura-loop, exec, plus the <get> portal tag",
                "Opt-in keep-alive so a route keeps its state when you navigate away and back",
                "A small data layer: useQuery / useMutation and an api fetch helper",
                "Live-reloading dev server and a dependency-free static build",
              ],
            },
            { type: "heading", content: "The starter demo" },
            {
              type: "text",
              content:
                "The starter ships four small pages. Each tells one story, and together they exercise every feature.",
            },
            {
              type: "table",
              headers: ["Page", "Story", "Shows"],
              rows: [
                [
                  "/home",
                  "Meet UraJS",
                  "State, conditions, keyed loops, navigation, reveal-on-scroll via exec",
                ],
                [
                  "/notes",
                  "A real little app",
                  "keyed ura-loop, empty-state conditions, URL-synced search, cookie persistence, keep-alive",
                ],
                [
                  "/reads",
                  "Routing + data",
                  "directory and dynamic :slug routing, useQuery + api over HTTP, per-slug keep-alive, dynamic title",
                ],
                [
                  "/play",
                  "Reactive visuals",
                  "native SVG driven by State, an exec animation loop",
                ],
              ],
            },
          ],
        },
        {
          id: "quickstart",
          title: "Quick Start",
          blocks: [
            {
              type: "code",
              label: "bash",
              code: `git clone https://github.com/mohammedhrima/UraJS.git
cd UraJS
npm install
npm start`,
            },
            {
              type: "text",
              content:
                "The dev server runs on http://localhost:17000 with live reload. Edit anything in src/ and the browser updates.",
            },
            {
              type: "code",
              label: "bash",
              code: `npm run build                 # static site in out/ (plus a docker/ setup)
npm run build -- --optimize   # bundle and minify into out/app.js`,
            },
          ],
        },
        {
          id: "project-structure",
          title: "Project Structure",
          blocks: [
            {
              type: "code",
              label: "tree",
              code: `src/
  pages/        directory routes (each folder with a page file is a route)
    home/page.tsx
    reads/:slug/page.tsx
  components/   reusable components
  services/     app code: api helper, data hooks, plain data
  ura/          the framework runtime (code.tsx, types.ts, utils.ts)
  assets/       static files copied as-is
  index.html    HTML shell (mounts into <div id="root">)
  layout.css    global styles
scripts/        the CLI (dev, build, route, comp, config, reset)
.ura/           config.json + the generated entry (main.js) — kept out of src/`,
            },
            {
              type: "text",
              content:
                "You normally only touch src/pages, src/components, and src/services.",
            },
            {
              type: "info",
              content:
                "The .ura/ folder holds your config.json and an auto-generated main.js (the entry that imports every page). You never edit main.js, and it is git-ignored.",
            },
          ],
        },
      ],
    },

    {
      label: "Routing",
      sections: [
        {
          id: "routing",
          title: "Directory Routing",
          blocks: [
            {
              type: "text",
              content:
                "Routing is directory based. A folder under src/pages that contains a page.{tsx,ts,jsx,js} file becomes a route.",
            },
            {
              type: "code",
              label: "routes",
              code: `src/pages/home/page.tsx         ->  /home
src/pages/reads/page.tsx        ->  /reads
src/pages/reads/:slug/page.tsx  ->  /reads/:slug`,
            },
            {
              type: "text",
              content:
                "Scaffolded pages export their own route, pre-filled with the directory path. The directory is the default; edit route to override it — that is on you.",
            },
            {
              type: "text",
              content:
                "The defaultRoute in .ura/config.json is served at /.",
            },
            { type: "heading", content: "Generating a route" },
            {
              type: "text",
              content:
                "Create routes from the CLI instead of making files by hand:",
            },
            { type: "bash", label: "bash", code: `npm run route reads/:slug` },
          ],
        },
        {
          id: "dynamic-routes",
          title: "Dynamic Routes",
          blocks: [
            {
              type: "text",
              content:
                "A :param folder becomes a dynamic segment. Its value arrives as a prop on the page component.",
            },
            {
              type: "code",
              label: "src/pages/reads/:slug/page.tsx",
              code: `function Post(props) {
  return <h1>Reading: {props.slug}</h1>;
}

export default { page: Post, route: "/reads/:slug" };`,
            },
            {
              type: "text",
              content:
                "getRouteParams() returns the matched :params anywhere in your app, and getCurrentRoute() returns the current path.",
            },
          ],
        },
        {
          id: "not-found",
          title: "404 Handling",
          blocks: [
            {
              type: "text",
              content:
                "Any unmatched URL renders the built-in 404 page. Override it by creating src/pages/404/page.tsx — that page then handles every unmatched URL.",
            },
          ],
        },
      ],
    },

    {
      label: "Pages & Components",
      sections: [
        {
          id: "components",
          title: "Components",
          blocks: [
            {
              type: "text",
              content:
                "A component is a function that returns JSX. Children are passed as the second argument.",
            },
            {
              type: "code",
              label: "src/components/Card.tsx",
              code: `import Ura from "ura";

function Card(props, children) {
  return (
    <section className="card">
      <h3>{props.title}</h3>
      <div>{children}</div>
    </section>
  );
}

export default Card;`,
            },
            {
              type: "info",
              content:
                "The JSX pragma is Ura.e, so a file that uses JSX needs Ura in scope. In .tsx/.ts files import it explicitly (import Ura from \"ura\"); in .jsx/.js files the build injects it automatically.",
            },
          ],
        },
        {
          id: "page-modules",
          title: "Page Modules",
          blocks: [
            {
              type: "text",
              content:
                "A page exports a page module as its default — an object that carries the component plus optional metadata.",
            },
            {
              type: "code",
              label: "src/pages/home/page.tsx",
              code: `function Home() {
  return <h1>Home</h1>;
}

export default {
  page: Home,             // the component to render
  route: "/home",         // optional: overrides the directory-derived path
  title: "UraJS — Home",  // document.title; string or (props) => string
  keepAlive: true,        // optional: keep this page's state across navigation
};`,
            },
            {
              type: "text",
              content:
                "title may be a function for dynamic routes, e.g. title: (props) => \"Post: \" + props.slug. A bare export default Home also works when you do not need metadata.",
            },
          ],
        },
        {
          id: "element-props",
          title: "Element Props",
          blocks: [
            {
              type: "text",
              content:
                "Element props mirror the DOM. Event handlers are on<event>, style takes an object, and classes use className.",
            },
            {
              type: "code",
              label: "props.tsx",
              code: `<button
  onclick={() => console.log("clicked")}
  oninput={(e) => setValue(e.target.value)}
  onhover={() => setHovered(true)}
  style={{ color: "red", fontWeight: "bold" }}
  className="btn primary"
>
  Click me
</button>`,
            },
            {
              type: "info",
              content:
                "onhover is a convenience that wires both mouseover and mouseout.",
            },
          ],
        },
      ],
    },

    {
      label: "Reactivity",
      sections: [
        {
          id: "state",
          title: "State",
          blocks: [
            {
              type: "text",
              content:
                "State(initial) returns a getter and a setter. Read with the getter, update with the setter — the component re-renders.",
            },
            {
              type: "code",
              label: "Counter.tsx",
              code: `import Ura, { State } from "ura";

function Counter() {
  const [count, setCount] = State(0);

  return (
    <button onclick={() => setCount(count() + 1)}>
      Clicked {count()} times
    </button>
  );
}

export default Counter;`,
            },
            {
              type: "info",
              content:
                "Each component instance has its own state, and nested component state survives parent re-renders.",
            },
          ],
        },
        {
          id: "conditions",
          title: "Conditionals",
          blocks: [
            {
              type: "text",
              content:
                "ura-if, with optional ura-elif and ura-else. Use them as tags:",
            },
            {
              type: "code",
              label: "as tags",
              code: `<ura-if cond={score() >= 90}>Excellent</ura-if>
<ura-elif cond={score() >= 50}>Passing</ura-elif>
<ura-else>Needs work</ura-else>`,
            },
            {
              type: "text",
              content:
                "…or as attributes on any element — the element itself is mounted and unmounted with the condition:",
            },
            {
              type: "code",
              label: "as attributes",
              code: `<p ura-if={isRaining()}>Bring an umbrella</p>
<p ura-else>Skies are clear</p>`,
            },
          ],
        },
        {
          id: "loops",
          title: "Loops",
          blocks: [
            {
              type: "text",
              content:
                "ura-loop takes an array on `on` and a render function as its child.",
            },
            {
              type: "code",
              label: "loop.tsx",
              code: `<ura-loop on={items()}>
  {(item, index) => <li key={item.id}>{item.label}</li>}
</ura-loop>`,
            },
            {
              type: "info",
              content:
                "Use a stable key so the keyed reconciler moves DOM and component state by identity instead of rebuilding rows when the list reorders.",
            },
          ],
        },
        {
          id: "exec-fragments",
          title: "Side Effects & Fragments",
          blocks: [
            {
              type: "text",
              content:
                "exec runs a function after the surrounding markup is in the DOM — the escape hatch for imperative work such as animations or measuring nodes.",
            },
            {
              type: "code",
              label: "exec",
              code: `<exec call={() => (document.title = "UraJS")} />`,
            },
            { type: "heading", content: "Fragments" },
            {
              type: "text",
              content: "Fragments group siblings without a wrapper element.",
            },
            {
              type: "code",
              label: "fragment",
              code: `<>
  <span>one</span>
  <span>two</span>
</>`,
            },
          ],
        },
        {
          id: "get-portal",
          title: "The <get> Portal",
          blocks: [
            {
              type: "text",
              content:
                "<get> is a lightweight portal: it renders its children into an element that already exists in the document, selected by `by` (a CSS selector).",
            },
            {
              type: "code",
              label: "portal.tsx",
              code: `<get by="#sidebar">
  <nav>…</nav>
</get>`,
            },
            {
              type: "text",
              content:
                "Handy for mounting into the document body, a node from index.html, or anything mounted earlier.",
            },
          ],
        },
      ],
    },

    {
      label: "Navigation & Data",
      sections: [
        {
          id: "navigation",
          title: "Navigation",
          blocks: [
            {
              type: "code",
              label: "Menu.tsx",
              code: `import { useNavigate } from "ura";

function Menu() {
  const navigate = useNavigate();
  return <button onclick={() => navigate("/reads")}>Reads</button>;
}`,
            },
            {
              type: "table",
              headers: ["API", "Purpose"],
              rows: [
                [
                  "useNavigate()",
                  "Returns navigate(path, params?) — params are appended as a query string",
                ],
                ["navigate", "The same function, importable directly from \"ura\""],
                [
                  "In(path)",
                  "Whether a path is the current route — useful for active nav links",
                ],
                ["onNavigate(cb)", "Registers a callback that runs on every navigation"],
                ["getCurrentRoute()", "Returns the current path"],
                ["getRouteParams()", "Returns the matched :params"],
              ],
            },
          ],
        },
        {
          id: "query-cookies",
          title: "Query Params & Cookies",
          blocks: [
            {
              type: "code",
              label: "query.tsx",
              code: `import { getParams, setQuery } from "ura";

const q = getParams().q || "";       // read ?q=...
setQuery("q", "hello");              // set ?q=hello (null to remove)`,
            },
            { type: "heading", content: "Cookies" },
            {
              type: "code",
              label: "cookies.tsx",
              code: `import Ura from "ura";

Ura.setCookie("token", "abc", 7);    // value, days (default 365)
Ura.getCookie("token");              // "abc" | null
Ura.rmCookie("token");`,
            },
          ],
        },
        {
          id: "keep-alive",
          title: "Keep-Alive",
          blocks: [
            {
              type: "text",
              content:
                "By default a route is rebuilt each time you navigate to it, so its state resets. Set keepAlive: true in the page module to cache the instance — state, DOM, and scroll — and resume it when you return.",
            },
            {
              type: "code",
              label: "Editor.tsx",
              code: `function Editor() {
  /* ... */
}

export default {
  page: Editor,
  keepAlive: true,
};`,
            },
            {
              type: "info",
              content:
                "Keep-alive is opt-in per page and the cache is LRU-bounded. Dynamic routes are cached per full path, so /reads/a and /reads/b keep their own state independently.",
            },
          ],
        },
        {
          id: "data-fetching",
          title: "Data Fetching",
          blocks: [
            {
              type: "text",
              content: "A minimal data layer lives in src/services.",
            },
            {
              type: "code",
              label: "Users.tsx",
              code: `import Ura, { State } from "ura";
import { useQuery, useMutation } from "../../services/query.js";
import api from "../../services/api.js";

function Users() {
  const { data, loading, error, refetch } = useQuery("users", () =>
    api.get("/api/users"),
  );

  const create = useMutation((user) => api.post("/api/users", user));

  return (
    <div>
      <ura-if cond={loading()}>Loading...</ura-if>
      <button onclick={() => create.mutate({ name: "Sam" })}>Add</button>
      <button onclick={refetch}>Reload</button>
    </div>
  );
}`,
            },
            {
              type: "table",
              headers: ["API", "Returns", "Notes"],
              rows: [
                [
                  "useQuery(key, fetcher)",
                  "{ data, error, loading, refetch }",
                  "Caches by key and revalidates in the background",
                ],
                [
                  "useMutation(fn)",
                  "{ data, error, loading, mutate }",
                  "For writes",
                ],
                [
                  "api",
                  "get, post, put, patch, del",
                  "A small fetch wrapper",
                ],
              ],
            },
          ],
        },
      ],
    },

    {
      label: "Tooling & Deploy",
      sections: [
        {
          id: "cli",
          title: "CLI",
          blocks: [
            {
              type: "table",
              headers: ["Command", "Description"],
              rows: [
                ["npm start", "Dev server with live reload on the configured port"],
                ["npm run build", "Static build into out/ plus a docker/ setup"],
                [
                  "npm run build -- --optimize",
                  "Bundle and minify the client into out/app.js",
                ],
                [
                  "npm run route <path>",
                  "Scaffold a page route (supports nesting and :param)",
                ],
                [
                  "npm run comp <Name>",
                  "Scaffold a component (route/Name for a page-local one)",
                ],
                ["npm run config", "Interactive project configuration"],
                ["npm run reset", "Reset generated state"],
                ["npm run clear", "Remove the out/ directory"],
                ["npm run typecheck", "Type-check the CLI scripts"],
              ],
            },
          ],
        },
        {
          id: "dev-orb",
          title: "Dev Orb",
          blocks: [
            {
              type: "text",
              content:
                "In development, UraJS shows a small draggable dev orb in the bottom-left corner. Click it to open the panel; drag it anywhere — its position is remembered.",
            },
            {
              type: "info",
              content:
                "The orb loads only when window.mode === \"dev\" and is stripped from production builds, so it never ships.",
            },
            { type: "heading", content: "Panel tabs" },
            {
              type: "table",
              headers: ["Tab", "What it does"],
              rows: [
                [
                  "Setup",
                  "On first run (empty .ura/config.json) the app waits here — fill the project config in the browser instead of the terminal. Saving writes config.json and boots the app; other tabs stay disabled until setup completes",
                ],
                [
                  "Routes",
                  "List routes, open or delete them (with a confirm), or create one (supports :param, e.g. blog/:id)",
                ],
                [
                  "Components",
                  "Scaffold a global component (src/components/) or one scoped to a route",
                ],
                [
                  "Build",
                  "Run npm run build (optionally --optimize) and watch the log stream live",
                ],
              ],
            },
            {
              type: "text",
              content:
                "Everything the orb does maps to a CLI command (config / route / comp / build) — use whichever you prefer.",
            },
          ],
        },
        {
          id: "configuration",
          title: "Configuration",
          blocks: [
            {
              type: "text",
              content:
                "Project configuration lives in .ura/config.json. Run npm run config to set these through prompts.",
            },
            {
              type: "table",
              headers: ["Key", "Values", "Meaning"],
              rows: [
                [
                  "typescript",
                  "enable / disable",
                  "Scaffold new files as .tsx/.ts or .jsx/.js",
                ],
                [
                  "dirRouting",
                  "enable / disable",
                  "Generate routes from the src/pages tree",
                ],
                ["defaultRoute", "route name", "The page served at /"],
                [
                  "styling",
                  "CSS / SCSS / Tailwind CSS",
                  "Styling pipeline",
                ],
                ["port", "number", "Dev server port"],
              ],
            },
          ],
        },
        {
          id: "styling",
          title: "Styling",
          blocks: [
            {
              type: "text",
              content:
                "Plain CSS works out of the box — src/layout.css plus any .css colocated with a page or component. SCSS is compiled when styling is SCSS, and Tailwind is wired up when styling is Tailwind CSS.",
            },
          ],
        },
        {
          id: "deploy",
          title: "Build & Deploy",
          blocks: [
            {
              type: "text",
              content:
                "npm run build writes a static site to out/: transpiled ES modules, an import map that resolves ura, your assets, and the HTML shell. With --optimize, the client is bundled and minified into out/app.js and the import map is dropped.",
            },
            {
              type: "text",
              content:
                "The build also generates a docker/ folder with a Dockerfile, nginx.conf, docker-compose.yml, and Makefile that serve out/ as static files:",
            },
            {
              type: "bash",
              label: "bash",
              code: `cd docker
make        # docker compose up --build -d`,
            },
            {
              type: "info",
              content:
                "Because the output is static, you can also host out/ on any static host or CDN.",
            },
          ],
        },
      ],
    },
  ],
};

export default uraJsTutorial;
