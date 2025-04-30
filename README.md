# Pizza Shop Web
![Screenshot From 2025-04-30 08-43-19](https://github.com/user-attachments/assets/79094e3e-95a3-4103-94fd-813823f3b9b1)


## ✨ Technologies Used

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [shadcn/ui](https://ui.shadcn.com/)
- [React Hook Form](https://react-hook-form.com/)
- [React Query](https://tanstack.com/query)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Biome]([https://eslint.org/](https://biomejs.dev/)) with pre-commit hooks (`lint-staged` + `husky`)

## 🚀 Installation & Usage

1. Clone the repository

```sh
git clone https://github.com/gblsmlo/pizza-shop-web.git
```

2. Install dependencies

```sh
npm install
# or
pnpm install
```

3. Start the development server

```sh
npm dev
# or
pnpm dev
```

## Available Scripts

- `dev`: starts the development server with Vite.
- `build`: builds the production version of the app.
- `preview`: locally preview the production build.
- `lint`: runs ESLint on the codebase.
- `format`: formats the code using Prettier.

## Code Quality
This project includes:
Biome for code linting and utomatic formatting.
Husky and lint-staged to run lint and format before each commit.

## Folder structure

```
src/
├── components/       # Reusable UI components
├── hooks/            # Custom React hooks
├── pages/            # Main application pages
├── services/         # API communication logic
├── lib/              # Utilities and config
├── styles/           # Global styles (if needed)
├── App.tsx           # Root component
└── main.tsx          # Application entry point
```
