import { World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber';
import { SignUpPage } from '../page-objects/signup-page.pom';

export class CustomWorld extends World {
    signUpPage?: SignUpPage;
    
    constructor(options: IWorldOptions) {
        super(options);
    }
}

// Register the custom world
setWorldConstructor(CustomWorld);
