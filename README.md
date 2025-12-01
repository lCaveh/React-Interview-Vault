# React-Interview-Vault
A collection of minimal, working React solutions for common frontend interview questions.

## Table of Contents
- [Setup](#setup)
- [Running the App](#running-the-app)
- [Running Tests](#running-tests)
- [Building for Production](#building-for-production)

## Setup

### Prerequisites
- Node.js 20.0+ (recommended)
- npm 10.0+ or higher

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd React-Interview-Vault
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

## Running the App

### Start Development Server

Run the following command to start the development server:

```bash
npm start
```

This will:
- Start a webpack dev server on `https://localhost:3000`
- Open the app in your default browser
- Enable hot module reloading for development

### Browser Security Warning

If your browser throws a security warning about the URL not being safe (common with self-signed HTTPS certificates), follow these steps:

1. **Click anywhere on the page**
2. **Type the following (exactly)**: `thisisunsafe`

This will bypass the security warning and allow you to access the development server.

## Running Tests

### Run Tests with Coverage

Execute the test suite with code coverage reporting:

```bash
npm test
```

This will:
- Run all tests in the `src/tests` directory
- Generate coverage reports in the `coverage` directory
- Display coverage metrics in the terminal
- Exit after running all tests

### Run Tests in Watch Mode

To continuously run tests during development:

```bash
npm run test:watch
```

This will:
- Watch for file changes
- Re-run affected tests automatically
- Keep the terminal running until you exit

**Note**: Press `q` to quit watch mode.

### Test Coverage

The project aims for 100% code coverage. Coverage reports are generated in the following formats:
- HTML report: `coverage/index.html`
- JSON summary: `coverage/coverage-summary.json`
- Text report in terminal

## Building for Production

### Build the App

Create a production-optimized build:

```bash
npm run build
```

This will:
- Compile TypeScript to JavaScript
- Bundle all assets using webpack
- Minify and optimize the bundle
- Output files to the `dist/` directory

### Build Output

The production build includes:
- `dist/main.js` - Bundled application code (minified)
- `dist/index.html` - HTML entry point
- `dist/assets/` - Static assets
- `dist/main.js.LICENSE.txt` - License information

## Project Structure

```
src/
├── components/          # React components
│   └── App/
│       ├── App.tsx
│       └── index.ts
├── redux/               # Redux store and slices
│   ├── store.ts
│   ├── hooks.ts
│   └── slices/
│       ├── Application.ts
│       └── types.ts
├── tests/               # Test files
│   ├── App.test.tsx
│   ├── Application.test.ts
│   └── testUtils.tsx
├── index.tsx            # React entry point
└── setupTests.ts        # Test setup configuration
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start development server on https://localhost:3000 |
| `npm test` | Run all tests with coverage |
| `npm run test:watch` | Run tests in watch mode |
| `npm run build` | Create production build |
| `npm run lint` | Lint TypeScript files |
| `npm run format` | Format code with Prettier |

## Technologies Used

- **React 18.3.1** - UI library
- **Redux Toolkit 2.0.1** - State management
- **React Router 6.26.0** - Client-side routing
- **TypeScript 5.3.3** - Type safety
- **Jest 29.7.0** - Testing framework
- **React Testing Library 14.2.1** - Component testing
- **Webpack 5.90.3** - Module bundler
- **ESLint 8.57.0** - Code linting
- **Prettier 3.2.5** - Code formatting

