# Cucumber Sign-Up Test Automation

This project explores Cucumber-style testing and reporting techniques in various ways. A simple signup page has been created with Bolt, serving as the foundation for comprehensive test automation coverage.

**Project Goals:**
- Achieve comprehensive test coverage with clear visibility into coverage metrics
- Quickly identify coverage gaps and testing blind spots  
- Provide clear root cause analysis for test failures through detailed reporting
- Demonstrate BDD best practices with Cucumber.js

A robust test automation framework for petition sign-up functionality using **Cucumber.js**, **Playwright**, and **Allure** reporting.

## 🚀 Features

- **BDD Testing**: Behavior-driven development with Cucumber.js
- **Cross-browser Testing**: Powered by Playwright
- **TypeScript Support**: Full TypeScript integration for type safety
- **Allure Reporting**: Rich HTML reports with screenshots and attachments
- **Internationalization Testing**: Support for Icelandic and English names
- **Accessibility Testing**: Tab navigation and keyboard interaction tests
- **Page Object Model**: Maintainable test structure with POM pattern
- **World Pattern**: Isolated test context for parallel execution
- **Dynamic Environment Info**: Comprehensive system information in reports

## 📁 Project Structure

```
cucumber-sign-up/
├── src/
│   ├── features/           # Cucumber feature files
│   │   └── successFull.feature
│   ├── steps/              # Step definitions
│   │   └── signUpSteps.ts
│   └── page-objects/       # Page Object Model classes
│       └── signup-page.pom.ts
├── support/                # Test support files
│   ├── hooks.ts            # Test hooks
│   └── world.ts            # Custom World definition
├── allure-results/         # Allure test results
├── test-results/           # Playwright test results
├── cucumber.config.js      # Cucumber configuration
├── playwright.config.ts    # Playwright configuration
└── package.json
```

## 🛠️ Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/SEllert/cucumber-sign-up.git
cd cucumber-sign-up
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## 🎯 Test Scenarios

The test suite covers the following scenarios:

### ✅ Successful Petition Sign-up
- **Icelandic Names**: Tests with various Icelandic characters and names
- **English Names**: Tests with different English name formats including:
  - Short names (Al Li)
  - Names with hyphens and apostrophes (Anna-Marie O'Neill)
  - Extremely long names (Hubert Blaine Wolfeschlegelsteinhausenbergerdorff Sr.)

### ♿ Accessibility Testing

This framework includes dedicated tests for accessibility compliance:

#### Keyboard Navigation
```gherkin
Scenario: The user can use Tab and Enter keys to navigate and submit
  Given the user is on the signup page
  When the user provides their full name "John Doe"
  And the user presses the Tab key
  And the user presses the Enter key
  Then the user should see their name "John Doe" on the petition page
```

### 🏷️ Test Tags
- `@language:icelandic` - Icelandic name tests
- `@language:english` - English name tests  
- `@positive` - Positive test scenarios
- `@skip` - Skipped tests (currently applied to Icelandic tests)
- `@regression` - Full regression test suite
- `@smoke` - Critical path tests
- `@sanity` - Basic functionality tests
- `@petition` - All petition-related tests
- `@allure.label.*` - Organizational tags for Allure reporting

## 🚀 Running Tests

### Run All Tests
```bash
npm test
```

### Run Specific Tags
```bash
# Run only English name tests
npx cucumber-js --tags "@english"

# Run positive tests excluding skipped ones
npx cucumber-js --tags "@positive and not @skip"

# Run specific feature
npx cucumber-js src/features/successFull.feature
```

### Watch Mode
```bash
npm run test:watch
```

## ⚡ Parallel Execution

This framework supports parallel test execution for faster feedback cycles and reduced test run times.

### Running Tests in Parallel

```bash
# Run with 4 parallel workers
npm run test:parallel

# Run tagged tests in parallel
npm run test:tagged:parallel "@english" -- --parallel 4

# Run tests with clean results directory in parallel
npm run test:clean:parallel
```

### Parallel Execution Benefits

1. **Faster Feedback**: Run tests up to 4x faster by utilizing multiple CPU cores
2. **Resource Efficiency**: Make better use of available system resources
3. **Maintained Reporting**: Allure reports properly aggregate results from parallel runs
4. **Isolated Execution**: Each scenario runs in its own context with dedicated browser

## 📊 Reporting

### Generate Allure Report
```bash
npm run allure:serve
```

This will:
1. Generate an Allure report from test results
2. Open the report in your default browser
3. Display detailed test execution results with screenshots

### Report Features
- 📸 **Screenshots**: Automatic screenshot capture on test steps
- 📋 **Environment Info**: OS, Node.js, and browser details
- 🏷️ **Test Categorization**: Organized by suites and tags
- 📈 **Trends**: Historical test execution trends

## ⚙️ Configuration

### Cucumber Configuration (`cucumber.config.js`)
- **Dynamic Environment Info**: Automatically detects OS platform and Node.js version
- **TypeScript Support**: Uses `ts-node/register` for TypeScript execution
- **Allure Integration**: Configured for rich reporting

### Key Configuration Options:
```javascript
{
  require: ["src/steps/**/*.ts"],          // Step definitions
  paths: ["src/features/**/*.feature"],    // Feature files
  requireModule: ["ts-node/register"],     // TypeScript support
  format: ["allure-cucumberjs/reporter"]   // Allure reporting
}
```

## 🎨 Page Object Model

The project uses the Page Object Model pattern for maintainable tests:

```typescript
// Example: SignUpPage class
export class SignUpPage {
  constructor(private page: Page) {}
  
  async goto() {
    await this.page.goto('/signup');
  }
  
  async fillName(name: string) {
    await this.signUpField.fill(name);
  }
}
```

## 🔧 Development

### Adding New Tests

1. **Create Feature File**: Add `.feature` files in `src/features/`
2. **Write Step Definitions**: Implement steps in `src/steps/`
3. **Create Page Objects**: Add page classes in `src/page-objects/`

### Example Step Definition:
```typescript
Given('the user is on the signup page', async function (this: CustomWorld) {
    if (!this.page) {
        throw new Error('Playwright page not initialized. Check your hooks and World setup.');
    }
    this.signUpPage = new SignUpPage(this.page);
    await this.signUpPage.goto();
    const screenshot = await this.page.screenshot({ fullPage: true });
    await this.attach(screenshot, 'image/png');
});
```

## 🌐 Internationalization

The test suite includes comprehensive internationalization testing:

- **Icelandic Characters**: Þ, ð, æ, ö, á, é, í, ó, ú, ý
- **Special Names**: Names with hyphens, apostrophes, and multiple parts
- **Unicode Support**: Full Unicode character support

## 🎭 Browser Support

- ✅ Chromium
- ✅ Firefox  
- ✅ WebKit (Safari)

## 🌐 Multi-Browser Testing

This framework supports running tests across different browsers for comprehensive cross-browser validation.

### Running Tests in Different Browsers

```bash
# Run tests in Chromium (default)
npm run test:chromium

# Run tests in Firefox
npm run test:firefox

# Run tests in WebKit (Safari)
npm run test:webkit

# Run tests in all browsers sequentially
npm run test:all-browsers
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🔗 Dependencies

### Main Dependencies
- **@cucumber/cucumber**: ^12.1.0
- **@playwright/test**: ^1.54.1
- **allure-cucumberjs**: ^3.3.2
- **ts-node**: ^10.9.2

### Features
- ✅ TypeScript support
- ✅ Automatic screenshot capture
- ✅ Cross-browser testing (Chromium, Firefox, WebKit)
- ✅ Rich HTML reporting
- ✅ Tag-based test filtering
- ✅ Watch mode for development
- ✅ Parallel execution support
- ✅ Test isolation with World pattern
- ✅ Accessibility testing

---

**Happy Testing!** 🚀
