Welcome to your new TanStack Start app! 

# Getting Started

To run this application:

```bash
npm install
npm run dev
```

# Building For Production

To build this application for production:

```bash
npm run build
```

## Live URL

https://actionanand.github.io/talentflow/

## What is TanStack?

**TanStack is not a framework** like Angular and not an architecture like JAMstack (JavaScript, APIs, and Markup). It is a **collection of powerful JavaScript/TypeScript libraries** used to build modern web apps, especially with frameworks like React, Vue, Solid, Svelte, and Angular.

Think of TanStack as a **toolbox of utilities for frontend apps**, not a full framework.

### About TanStack

TanStack is an **open-source collection of headless libraries** created by **Tanner Linsley**. These libraries solve common frontend problems including:

- Data fetching
- State management
- Tables
- Routing
- Virtual lists
- Forms

**Key Features**:
- **Framework-agnostic**: Works with multiple frameworks (React, Vue, Solid, Svelte, Angular)
- **Headless libraries**: Provides logic without UI, you create the visual components
- **Open-source**: Community-driven with active development

### Origin of the Name

The name TanStack comes from its creator:
- **Tan** → From creator's name "Tanner Linsley"
- **Stack** → Refers to a software stack (collection of tools used to build applications)

So TanStack literally means: **"Tanner's stack of developer tools"**

### Library Evolution

Originally, the libraries had framework-specific names (React Query, React Table, etc.). Later, they were redesigned to support multiple frameworks. The branding changed to TanStack to reflect this broader, framework-agnostic ecosystem.

### Headless Libraries Explained

A **headless library** provides logic but no UI. It handles behavior, but you create the visual components yourself.

**Real-World Analogy**:
- **UI Library** → Like buying a ready-made car 🚗 (you can drive it but cannot redesign the engine easily)
- **Headless Library** → Like buying only the engine ⚙️ (you build the car body however you want)

### Most Popular TanStack Libraries

- **TanStack Query** → Data fetching and synchronization
- **TanStack Table** → Headless table component
- **TanStack Router** → File-based routing (used in this project)
- **TanStack Virtual** → Virtual lists for performance
- **TanStack Form** → Form state management (newer)


## Cloning Guide

1.  Clone only the remote primary HEAD (default: origin/main)

```bash
git clone <url> --single-branch
```

2. Only specific branch

```bash
git clone <url> --branch <branch> --single-branch [<folder>]
```

```bash
git clone <url> --branch <branch>
```

3. Cloning repositories using **degit**
   - main branch is default.

```bash
npx degit github:user/repo#branch-name <folder-name>
```

4. Cloning repositories using **gitpick**

```bash
npx gitpick github_proj_url -b branch-name
```

5. Cloning this project with skeleton

```bash
git clone https://github.com/actionanand/talentflow.git --branch 1-skeleton tanstack-proj-name
```

```bash
npx degit github:actionanand/talentflow#1-skeleton angular-proj-name
```

```bash
npx gitpick https://github.com/actionanand/talentflow -b 1-skeleton angular-proj-name
```

### Difference Between git clone, npx degit, and npx gitpick

**git clone**: Official Git command that clones the entire repository with full history (.git folder included). Best for full project access and version control.

**npx degit**: A lightweight alternative that downloads only the latest commit without Git history. Faster and creates a smaller download, useful for scaffolding projects from templates. Uses GitHub API.

**npx gitpick**: Another lightweight cloning tool similar to degit, supporting branch selection. Also downloads without full Git history, ideal for quick project setup.

**Key Differences**:
- `git clone` → Full history, requires Git, heavier
- `npx degit` → No history, faster, simpler setup
- `npx gitpick` → No history, supports branch selection, similar to degit

## Linting & Formatting Tools

### Biome
**Biome** is an ultra-fast toolchain for web projects. It replaces multiple tools (Prettier, ESLint, etc.) with a single, more performant solution written in Rust. It provides linting, formatting, and code analysis all in one package.

```bash
npm run lint    # Run linting
npm run format  # Format code
npm run check   # Check for issues
```

### ESLint
**ESLint** is a JavaScript linting tool that analyzes code to find and report patterns that don't adhere to a set style guide. It helps catch bugs, enforce best practices, and maintain code quality. It's highly configurable and widely used in JavaScript projects.

**Biome vs ESLint**: Biome is faster and all-in-one, while ESLint is more traditional and has a larger ecosystem of plugins.


## Testing

This project uses [Vitest](https://vitest.dev/) for testing. You can run the tests with:

```bash
npm run test
```

## Styling

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling.

### Removing Tailwind CSS

If you prefer not to use Tailwind CSS:

1. Remove the demo pages in `src/routes/demo/`
2. Replace the Tailwind import in `src/styles.css` with your own styles
3. Remove `tailwindcss()` from the plugins array in `vite.config.ts`
4. Uninstall the packages: `npm install @tailwindcss/vite tailwindcss -D`

## Linting & Formatting

This project uses [Biome](https://biomejs.dev/) for linting and formatting. The following scripts are available:


```bash
npm run lint
npm run format
npm run check
```

## Routing

This project uses [TanStack Router](https://tanstack.com/router) with file-based routing. Routes are managed as files in `src/routes`.

### Adding A Route

To add a new route to your application just add a new file in the `./src/routes` directory.

TanStack will automatically generate the content of the route file for you.

Now that you have two routes you can use a `Link` component to navigate between them.

### Adding Links

To use SPA (Single Page Application) navigation you will need to import the `Link` component from `@tanstack/react-router`.

```tsx
import { Link } from "@tanstack/react-router";
```

Then anywhere in your JSX you can use it like so:

```tsx
<Link to="/about">About</Link>
```

This will create a link that will navigate to the `/about` route.

More information on the `Link` component can be found in the [Link documentation](https://tanstack.com/router/v1/docs/framework/react/api/router/linkComponent).

### Using A Layout

In the File Based Routing setup the layout is located in `src/routes/__root.tsx`. Anything you add to the root route will appear in all the routes. The route content will appear in the JSX where you render `{children}` in the `shellComponent`.

Here is an example layout that includes a header:

```tsx
import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: 'My App' },
    ],
  }),
  shellComponent: ({ children }) => (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <header>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
          </nav>
        </header>
        {children}
        <Scripts />
      </body>
    </html>
  ),
})
```

More information on layouts can be found in the [Layouts documentation](https://tanstack.com/router/latest/docs/framework/react/guide/routing-concepts#layouts).

## Server Functions

TanStack Start provides server functions that allow you to write server-side code that seamlessly integrates with your client components.

```tsx
import { createServerFn } from '@tanstack/react-start'

const getServerTime = createServerFn({
  method: 'GET',
}).handler(async () => {
  return new Date().toISOString()
})

// Use in a component
function MyComponent() {
  const [time, setTime] = useState('')
  
  useEffect(() => {
    getServerTime().then(setTime)
  }, [])
  
  return <div>Server time: {time}</div>
}
```

## API Routes

You can create API routes by using the `server` property in your route definitions:

```tsx
import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

export const Route = createFileRoute('/api/hello')({
  server: {
    handlers: {
      GET: () => json({ message: 'Hello, World!' }),
    },
  },
})
```

## Data Fetching

There are multiple ways to fetch data in your application. You can use TanStack Query to fetch data from a server. But you can also use the `loader` functionality built into TanStack Router to load the data for a route before it's rendered.

For example:

```tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/people')({
  loader: async () => {
    const response = await fetch('https://swapi.dev/api/people')
    return response.json()
  },
  component: PeopleComponent,
})

function PeopleComponent() {
  const data = Route.useLoaderData()
  return (
    <ul>
      {data.results.map((person) => (
        <li key={person.name}>{person.name}</li>
      ))}
    </ul>
  )
}
```

Loaders simplify your data fetching logic dramatically. Check out more information in the [Loader documentation](https://tanstack.com/router/latest/docs/framework/react/guide/data-loading#loader-parameters).

# Demo files

Files prefixed with `demo` can be safely deleted. They are there to provide a starting point for you to play around with the features you've installed.

# Learn More

You can learn more about all of the offerings from TanStack in the [TanStack documentation](https://tanstack.com).

For TanStack Start specific documentation, visit [TanStack Start](https://tanstack.com/start).
