# How To Set Up a Node Project With Typescript

## Introduction

Node is a run-time environment that makes it possible to write server-side JavaScript. It has gained widespread adoption since its release in 2011. Writing server-side JavaScript can be challenging as a codebase grows due to the nature of the JavaScript language: dynamic and weak typed.

Developers coming to JavaScript from other languages often complain about its lack of strong static typing, but this is where TypeScript comes into the picture, to bridge this gap.

TypeScript is a typed (optional) super-set of JavaScript that can help with building and managing large-scale JavaScript projects. It can be thought of as JavaScript with additional features like strong static typing, compilation, and object oriented programming.

>**Note**: TypeScript is technically a super-set of JavaScript, which means that all JavaScript code is valid TypeScript code.

Here are some benefits of using TypeScript:

1. Optional static typing.
2. Type inference.
3. Ability to use Interfaces.

In this tutorial you will set up a Node project with TypeScript. You will build an Express application using TypeScript and transpile it down to JavaScript code.

## Prerequisites

Before you begin this guide, you will need [Node.js](https://nodejs.org) installed.

### Step 1 — Initializing the Project

To get started, create a new folder named `node_project` and move into that directory:

```bash
mkdir node_project
cd node_project
```

Next, initialize it as an npm project:

```bash
npm init -y
```

The `-y` flag tells npm init to automatically say “yes” to the defaults. You can always update this information later in your `package.json` file.

### Step 2 — Configuring the TypeScript Compiler

Now that your npm project is initialized, you are ready to install and set up TypeScript.

Run the following command from inside your project directory to install the TypeScript:

```bash
npm install typescript --save-dev
```

Output:

```bash
added 1 package, and audited 2 packages in 1s

found 0 vulnerabilities
```

TypeScript uses a file called `tsconfig.json` to configure the compiler options for a project. Create a `tsconfig.json file` in the root of the project directory:

```bash
touch tsconfig.json
```

Then paste in the following JSON:

```json
  "compilerOptions": {
    "module": "commonjs",
    "esModuleInterop": true,
    "target": "es6",
    "moduleResolution": "node",
    "sourceMap": true,
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "forceConsistentCasingInFileNames": true
  },
  "lib": ["es2015"],
  "include": ["src"],
  "exclude": ["node_modules"]
```

Let’s go over some of the keys in the JSON snippet above:

. module: Specifies the module code generation method. Node uses commonjs.
. target: Specifies the output language level.
. moduleResolution: This helps the compiler figure out what an import refers to. The value node mimics the Node module resolution mechanism.
. outDir: This is the location to output .js files after transpilation. In this tutorial you will save it as dist.

To learn more about the key value options available, the official [TypeScript documentation](https://www.typescriptlang.org/docs/handbook/compiler-options.html) offers explanations of every option.

### Step 3 — Creating a Minimal TypeScript Express Server

Now, it is time to install the `Express` framework and create a minimal server:

```shell
npm install --save express
npm install -save-dev @types/express
```

The second command installs the Express types for TypeScript support. Types in TypeScript are files, normally with an extension of `.d.ts`. The files are used to provide type information about an API, in this case the Express framework.

This package is required because TypeScript and Express are independent packages. Without the `@types/express` package, there is no way for TypeScript to know about the types of Express classes.

To restarts target node process when any of required files changes (as standard node-dev) but shares Typescript compilation process between restarts. This significantly increases speed of restarting comparing to node-dev -r ts-node/register ..., nodemon -x ts-node ... variations because there is no need to instantiate ts-node compilation each time, adds:

```bash
npm i ts-node-dev --save-dev
```

Next, create a src folder in the root of your project directory:

```bash
mkdir src
```

Then create a TypeScript file named `app.ts` within it:

```bash
touch src/app.ts
```

Open up the `app.ts` file with a text editor of your choice and paste in the following code snippet:

```javascript
import express from 'express';
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
```

The code above creates Node Server that listens on the port `3000` for requests. To run the app, you first need to compile it to JavaScript using the following command:

```bash
npx tsc
```

This uses the configuration file we created in the previous step to determine how to compile the code and where to place the result. In our case, the JavaScript is output to the dist directory.

Run the JavaScript output with node:

```bash
node dist/app.js
```

If it runs successfully, a message will be logged to the terminal:

```bash
Express is listening at http://localhost:3000
```

Now, you can visit `http://localhost:3000` in your browser and you should see the message:

```text
Hello World!
```

Open the dist/app.js file and you will find the transpiled version of the TypeScript code:

```javascript
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map
```

At this point you have successfully set up your Node project to use TypeScript. Next you’ll set up the eslint linter to check your TypeScript code for errors.

### Step 4 — Configuring Typescript Linting with eslint

Now you can configure TypeScript linting for the project. First, we install `eslint` using npm:

```bash
npm install eslint --save-dev
```

Then, run eslint’s initialization command to interactively set up the project:

```bash
npx eslint --init
```

This will ask you a series of questions. For this project we’ll answer the following:

. How would you like to use ESLint?: To check syntax and find problems
. What type of modules does your project use?: JavaScript modules (import/export)
. Which framework does your project use?: None of these
. Does your project use TypeScript?: Yes
. Where does your code run?: Node
. What format do you want your config file to be in?: JavaScript

Finally, you will be prompted to install some additioanl eslint libraries. Choose Yes. The process will finish and you’ll be left with the following configuration file:

```javascript
//.eslintrc.js
module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
    }
}
```

Run the linter to check all files with the .ts TypeScript extension:

```bash
npx eslint . --ext .ts
```

You’ve now set up the [eslint](https://eslint.org/docs/latest/user-guide/configuring/configuration-files) linter to check your TypeScript syntax. Next you’ll update your npm configuration to add some convenient scripts for linting and running your project.

If you want to override any of the [linting rules](https://eslint.org/docs/latest/rules/) or configure other rules, use the rules property in the .eslintrc.js file, as shown below:

```javascript
module.exports = {
  . . .
  rules: {
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};
```

### Step 5 — Updating the package.json File

It can be useful to put your commonly run command line tasks into npm scripts. npm scripts are defined in your package.json file and can be run with the command npm run your_script_name.

In this step you will add a start script that will transpile the TypeScript code then run the resulting .js application.

You will also add a lint script to run the eslint linter on your TypeScript files.

Open the package.json file and update it accordingly:

```javascript
{
  "name": "natural-bot",
  "version": "1.0.0",
  "description": "",
  "main": "dist/app.js",
  "scripts": {
    "dev": "ts-node-dev --inspect --ignore-watch node_modules src/app.ts",
    "start": "tsc && node dist/app.js",
    "test": "echo \"Error: no test specified\" && exit 1",
    "lint": "eslint . --fix"    
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@types/express": "^4.17.15",
    "@typescript-eslint/eslint-plugin": "^5.48.0",
    "@typescript-eslint/parser": "^5.48.0",
    "eslint": "^8.31.0",
    "typescript": "^4.9.4"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

In the snippet above, you updated the main path to be the compiled app output, and added the start and lint commands to the scripts section.

When looking at the start command, you’ll see that first the tsc command is run, and then the node command. This will compile and then run the generated output with node.

To prevent ESLint from linting certain files or directories, create a .eslintignore file in your project root, and place the patterns for files to ignore therein. Here's an example in which all generated files in the dist folder are ignored:

```bash
touch .eslintignore
```

Open the file and add:

```bash
dist
```

>**Note** that everything in the node_modules folder, and files or folders that begin with a dot character (except eslint config files), are ignored automatically, so there's no need to place patterns matching such files in your .eslintignore file.

The lint command is the same as we ran in the previous step, minus the use of the npx prefix which is not needed in this context.

Then run ESLint:

```bash
npm run lint
```

## 🕷Venom Bot🕸

Venom is a high-performance system developed with JavaScript to create a bot for WhatsApp, support for creating any interaction, such as customer service, media sending, sentence recognition based on artificial intelligence and all types of design architecture for WhatsApp.

### Installation Venom

```bash
npm i --save venom-bot
```

## NLP.js

"NLP.js" is a general natural language utility for nodejs. Currently supporting:

Guess the language of a phrase
Fast Levenshtein distance of two strings
Search the best substring of a string with less Levenshtein distance to a given pattern.
Get stemmers and tokenizers for several languages.
Sentiment Analysis for phrases (with negation support).
Named Entity Recognition and management, multi-language support, and acceptance of similar strings, so the introduced text does not need to be exact.
Natural Language Processing Classifier, to classify an utterance into intents.
NLP Manager: a tool able to manage several languages, the Named Entities for each language, the utterances, and intents for the training of the classifier, and for a given utterance return the entity extraction, the intent classification and the sentiment analysis. Also, it is able to maintain a Natural Language Generation Manager for the answers.
40 languages natively supported, 104 languages supported with BERT integration
Any other language is supported through tokenization, even fantasy languages

### Installation NLP

If you're looking to use NLP.js in your Node application, you can install via NPM like so:

```bash
npm install node-nlp
```
