# Cucumber Sign-Up Test Automation 🚀

A modern end-to-end testing framework for petition sign-up functionality using Cucumber.js, Playwright, and TypeScript.

---

## ✨ Key Features

- **BDD Testing**: Cucumber.js for behavior-driven development
- **TypeScript**: Full type safety and improved maintainability
- **Cross-browser**: Tests run in Chromium, Firefox, and WebKit
- **Parallel Execution**: Run tests up to 4x faster
- **Rich Reporting**: Multiple Cucumber HTML Reporter with environment info
- **Page Objects**: Clean separation of concerns
- **Internationalization**: Support for Icelandic names
- **Accessibility**: Keyboard navigation testing

---

## 📁 Project Structure

```
cucumber-sign-up/
├── src/
│   ├── features/         # Cucumber feature files
│   ├── steps/            # Step definitions
│   ├── support/          # World, hooks, helpers, environment info, report generator
│   └── page-objects/     # Page Object Models
├── reports/              # Test reports directory (JSON and HTML)
└── config files          # Configuration files (cucumber.config.js, etc.)
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (14 or higher)
- npm or yarn
- Visual Studio Code (recommended)

### Installation

```bash
git clone https://github.com/yourusername/cucumber-sign-up.git
cd cucumber-sign-up
npm install
```

---

## 🎯 Running Tests

### Basic Test Execution

```bash
# Run all tests
npm test

# Run tests in specific browsers
npm run test:chromium
npm run test:firefox
npm run test:webkit

# Run all browser tests sequentially
npm run test:all-browsers
```

### Watch Mode

```bash
# Auto-run tests on file changes
npm run test:watch
```

### Parallel Execution

```bash
# Run with 4 parallel workers
npm run test:parallel

# Run specific browser in parallel
npm run test:parallel:chromium
npm run test:parallel:firefox
npm run test:parallel:webkit

# Run tagged tests in parallel
npm run test:tagged:parallel "@english" -- --parallel 4

# Clean results and run parallel
npm run test:clean:parallel
```

### Running with Tags

```bash
# Run English language tests
npx cucumber-js --tags "@language:english"

# Run positive tests (excluding skipped)
npx cucumber-js --tags "@positive and not @skip"
```

---

## 📊 Test Reports

### Multiple Cucumber HTML Reporter

```bash
# Generate the HTML report
npm run report:generate

# Open the HTML report in your browser
npm run report:open

# Generate and open the report in one step
npm run report:generate:open
```

- The report will be available at `reports/html/index.html`.
- The report includes environment information (browser, OS, Node version, etc.).

---

## 🏷️ Available Tags

- `@language:icelandic` - Tests with Icelandic names
- `@language:english` - Tests with English names
- `@positive` - Happy path scenarios
- `@regression` - Full regression suite
- `@smoke` - Critical path tests
- `@skip` - Temporarily disabled tests
- `@visual` - Visual regression tests

---

## 🌟 Best Practices

- Use of Page Object Model for maintainability
- Screenshot capture for debugging
- Strong typing with TypeScript
- Isolated test contexts using World pattern
- Cross-browser verification
- Accessibility testing

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 💡 Tips

- To add environment info to your reports, update `src/support/environment-info.ts` and `src/support/generate-report.js`.
- For custom tags or new test types, simply add them to your `.feature` files and reference them in your scripts.
