# -mollify

![Mollify Preview](readme/mollify.jpg)

Mollify is a dynamic Learning Management System (LMS) designed to provide a user-friendly interface for managing and navigating markdown content. The platform offers a multitude of features, including content navigation, search capabilities, bookmarking, text-to-speech functionality, an AI assistant, and a markdown editor with 'What You See Is What You Get' (WYSIWYG) capabilities.

## Table of Contents

- [Packages](#packages)
  - [Mollify LMS](#mollify-lms-package)
  - [Mollify CLI Package](#mollify-cli-package)
  - [Mollify Molly Package](#mollify-molly-package)
  - [Mollify TTS Package](#mollify-tts-package)
  - [Mollify Flow Package](#mollify-flow-package)
  - [Mollify Types Package](#mollify-types-package)
- [Stack](#stack)
- [Getting Started](#getting-started)
  - [Installing](#installing)
  - [Build All Packages](#build-all-packages)
  - [Creating Test Content](#creating-test-content)
  - [Individual package building](#individual-package-building)
  - [Additional Lerna Commands](#additional-lerna-commands)
    - [Clean Node Modules](#clean-node-modules)
    - [List Packages](#list-packages)
  - [Future Implementation](#future-implementation)
- [Contributing](#contributing)
- [Contact](#contact)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Packages

Mollify, divided into various packages within a Lerna monorepository, primarily consists of the LMS and CLI. These modules empower users to manage their content efficiently and transform it into a navigable webpage.

### Mollify LMS Package

The Mollify LMS package is the frontend of the Mollify project. The aim is to convert markdown content into an accessible website, enabling users to navigate, search, and bookmark content effectively, along with additional feature integration. The ultimate goal is to allow users to install the LMS package, migrate their existing content or create new, and finally, present it as a website.

For more information checkout the [LMS Package](./packages/lms)

### Mollify CLI Package

Mollify CLI is a command-line tool designed to manage the filesystem for the Mollify Learning Management System (LMS). It ensures that the file structure adheres to SvelteKit's file path conventions and provides a convenient way to create, archive, and remove various entities within the LMS. Mollify CLI is written in TypeScript and uses the Commander and Enquirer libraries to provide a user-friendly and intuitive interface.

For more information checkout the [CLI Package](./packages/cli)

### Mollify Molly Package

Mollify Molly is an OpenAI-powered teaching assistant, designed to enhance the student learning experience by tapping into the lesson content to answer queries. The aim is to make learning more interactive and efficient with Molly's capabilities. We aim to expand Molly's functionalities to not only assist students but also teachers and content creators. In the pipeline, we have plans for Molly to aid in content creation with the Flow package. Its anticipated capabilities include facilitating the generation of quizzes and glossaries, thereby streamlining the course creation process. Furthermore, we also foresee Molly automating the creation of file frontmatter such as tags and summaries, leading to efficient management and categorization of course content. This could possibly even extend to automating the migration of content into the system, thereby streamlining the integration process.

For more information checkout the [Molly Package](./packages/molly)

### Mollify TTS Package

Mollify Text-To-Speech provides audio for markdown content, enabling users to generate and listen to the content. Currently leveraging ElevenLabs for TTS, future plans may include various optional TTS packages to offer a more flexible user experience.

For more information checkout the [TTS Package](./packages/tts)

### Mollify Flow Package

Mollify Flow offers a user interface for the CLI package, enabling users to create, update, and manage content. It includes a WYSIWYG editor for real-time content preview and update tracking.

For more information checkout the [Flow Package](./packages/flow)

### Mollify Types Package

Mollify Types package is home to all TypeScript types and definitions for easy import into any of the Mollify packages.

For more information checkout the [Types Package](./packages/types)

## Stack

These are a some of the core dependencies although many more are present.

- Lerna
- Sveltekit
- TypeScript
- Tailwind
- Skeleton UI
- Vite

## Getting Started

This guide is intended for developers who wish to contribute to the Mollify project. (LMS package usage for users coming soon!) ~~If you are a user, please refer to the [Mollify LMS](./packages/lms/README.md) package for installation instructions.~~

### Installing

1. Clone the repo:

```bash
git clone https://github.com/Fermain/-mollify.git
```

2. Install the dependencies:

```bash
npm install
```

Optionally, if you want to ensure all Lerna-managed packages are correctly linked together:

```bash
npx lerna bootstrap --hoist
```

The --hoist flag is used to move all common dependencies to the root of your monorepo, reducing duplication.

3. Create a .env in the LMS package root and provide API keys. (package/lms/.env)

```
OPENAI_API_KEY=YOUR_KEY
OPENAI_TOKEN_LIMIT=1000
ELEVENLABS_API_KEY=YOUR_KEY
```

### Running the LMS and other packages

1. Before running the LMS, make sure all other dependencies are built: (Remember to build after any changes to the other packages)

```bash
npm run build
```

2 **Run the LMS:**

Running this from the root scope will start LMS.

```bash
npm run dev
```

Alternatively from the root scope you can run

```bash
npm run dev --workspace @mollify/lms
```

### Creating Test Content

The LMS system uses markdown content stored in the content directory. The exact location is:

```
packages/lms/src/routes/content
```

The system will automatically index this content and generate pages. The structure of the folders determines the navigation.

**Example Structure**

Your content folder can look like this to define a particular institution and its content:

```
content
├── institution1
    ├── +page.md
    ├── programme1
        ├── +page.md
        ├── course1
            ├── +page.md
            ├── module1
            │   ├── +page.md
            │   ├── lesson1
            │   │   ├── +page.md
            │   ├── lesson2
            │   │   ├── +page.md
            ├── module2
                ├── +page.md
                ├── lesson1
                │   ├── +page.md
                ├── lesson2
                    ├── +page.md
```

Capitalised path names are not supported and each folder can contain a +page.md file. This .md file is indexed and used to generate a page. The folder name is used to define the page slug. The +page.md front matter is used to define the content type and its properties.

Add page contents:

```ymal
---
title: lesson1
type: Lesson
summary: This is a lesson
previous: null
tags:

- Example Lesson
---

# Lesson Content Here

```

The **type** property is used to define the content type. The following content types are currently supported:

- Institution
- Programme
- Course
- Module
- Lesson
- Assessment

**Tags and Navigation**

**Tags:** Use the **tags** property to list subjects that can be filtered on the search page or clicked on to find related content.

**Navigation:** The **previous** property defines the preceding item in the navigation. A null value indicates the page is the first item, meaning it doesn't have a prior page in the navigation menu.

### Individual package building

If you only want to build a specific package, run the following respective command:

```bash
npm run molly-dev
npm run cli-build
npm run molly-build
npm run tts-build
npm run flow-build
```

### Additional Lerna Commands

#### Clean Node Modules:

If you ever run into issues related to dependencies, or simply want to refresh everything:

```bash
npx lerna clean -y && npm install
```

This command removes the node_modules from all packages and then reinstalls.

#### List Packages:

To see which packages Lerna is managing:

```bash
npx lerna list
```

### Future Implementation

A future goal is for users to simply run the following command to automatically install Mollify and its dependencies:

```
npm i @mollify/LMS
```

Then create a content folder with markdown files using the Flow editor, or migrate existing content using

```
npx mollify migrate
```

Then a user will be prompted to answer questions relating to the front matter of the content so it can be indexed and run as a website.

## Contributing

Create a fork, find an issue to work on and submit a pull request with your contribution.

## Contact

[![Fermain God Emperor](readme/contact.jpg)](https://github.com/Fermain)

## License

Copyright 2023 Oliver Dipple

Licensed under the Apache License, Version 2.0 (the "License");

http://www.apache.org/licenses/LICENSE-2.0

## Acknowledgments

Project Lead

- Oliver Dipple [Fermain](https://github.com/Fermain)

Collaborators

- Alexander Barrett [Anclagen](https://github.com/Anclagen)
- Eric Pretzinger [pretzL](https://github.com/pretzL)
- Jenny Feragen [jenfer93](https://github.com/Jenfer93)
- Melisa Zorraindo [Melisa-Zorraindo](https://github.com/Melisa-Zorraindo)
