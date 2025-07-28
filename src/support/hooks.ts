import { Before, After } from '@cucumber/cucumber';
import { CustomWorld } from './world';

// Use unique IDs for scenarios in parallel runs
Before(async function (this: CustomWorld, { pickle }) {
  console.log(`Starting scenario: ${pickle.name} [${pickle.id}]`);
  await this.initBrowser();
});

After(async function (this: CustomWorld, { pickle, result }) {
  console.log(`Completed scenario: ${pickle.name} [${pickle.id}] with status: ${result?.status}`);
  
  // Always close browser, even if test fails
  try {
    await this.closeBrowser();
  } catch (error) {
    console.error('Error closing browser:', error);
  }
});
