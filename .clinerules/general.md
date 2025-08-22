# Project Overview

This project is a personal portfolio website built with Next.js, React, and Tailwind CSS. The goal is to showcase projects and skills in a modern and clean design.

## Folder Structure

```
src/                  # Contains the source code for the frontend.
├── app/              # Contains the pages and layouts for the application.
│   ├── page.tsx      # The main entry point for the application's UI.
│   ├── layout.tsx    # The root layout for the application.
│   └── globals.css   # Global styles for the application.
public/               # Contains static assets like images and fonts.
package.json          # Defines the project's dependencies and scripts.
next.config.ts        # Configuration file for Next.js.
tailwind.config.ts    # Configuration file for Tailwind CSS.
tsconfig.json         # Configuration file for TypeScript.
```

## Libraries and Frameworks

- **Next.js 15**: The primary framework for the application.
- **React 19**: Used for building the user interface.
- **pnpm**: Used for package management. Use this for all package management commands (NOT npm).
- **Tailwind CSS**: Used for styling the application.
- **shadcn-ui**: Used for any new UI components.
- **TypeScript**: The primary language for the project.
- **ESLint**: Used for linting the code.

## Coding Standards

- Make sure to use shadcn-ui for all new UI components. This is important because it will give it a sleek, modern look. For adding new components, use the following command:
  `pnpm dlx shadcn@latest add {component_name}`
- Use function-based components in React.
- Use TypeScript for all new components and logic.
- Follow the Next.js App Router conventions.
- Use Tailwind CSS for styling.
- Use descriptive names for variables and functions.
- Use semicolons at the end of each statement.
- Use double quotes for strings.

## Build and Development

- To run the development server, use `pnpm dev`.
- To build the application for production, use `pnpm build`.
- To start the production server, use `pnpm start`.
- To lint the code, use `pnpm lint`.
