# Mollify LMS

## Description

The Mollify LMS package is the frontend of the Mollify project. The aim is to convert markdown content into an accessible website, enabling users to navigate, search, and bookmark content effectively, along with additional feature integration. The ultimate goal is to allow users to install the LMS package, migrate their existing content or create new, and finally, present it as a website.

## Core Dependencies

- [Sveltekit](https://kit.svelte.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/docs/installation)
- [Skeleton UI](https://www.skeleton.dev/)
- [MDsveX](https://mdsvex.pngwn.io/)
- [Vite](https://vitejs.dev/)
- [@Mollify/Types](https://github.com/Fermain/-mollify/tree/master/packages/types)
- [@Mollify/Flow](https://github.com/Fermain/-mollify/tree/master/packages/flow)
- [@Mollify/TTS](https://github.com/Fermain/-mollify/tree/master/packages/tts)
- [@Mollify/Molly](https://github.com/Fermain/-mollify/tree/master/packages/molly)
- [@Mollify/CLI](https://github.com/Fermain/-mollify/tree/master/packages/cli)

## Getting Started

### Installing

1. Install lms and cli globally to use commands

```bash
npm install @mollify/lms
npm i -g @mollify/cli
```

2. Create a .env in the root

```
OPENAI_API_KEY=YOUR_KEY
OPENAI_TOKEN_LIMIT=1000
ELEVENLABS_API_KEY=YOUR_KEY
```

3. **Run the LMS** (Currently not working)

```bash
npm run dev
```

### Future Implementation

A future goal is for users to simply run the following command to automatically install Mollify and its dependencies:

Then create a content folder with markdown files using the Flow editor, or migrate existing content using

```
npm i @mollify/LMS
```

Option 1.
Add a content folder and existing markdown content

```bash
mollify migrate
```

Then a user will be prompted to answer questions relating to the front matter of the content so it can be converted, indexed and run as a website.

Option 2.
Create content from scratch

```bash
mollify create [location]
```

Option 3.
Link and existing file from elsewhere or github repo

```bash
mollify link <destination>
```

#### Preview & Buid

Preview your content live in the browser.

```bash
mollify preview
```

Build your content for production and deployment.

```bash
mollify build
```

### Structuring Your LMS Content Folder Manually

The LMS system uses markdown files stored in the content directory in the root of your repository. The system will automatically index this content and generate pages. The structure of the folders determines the navigation.

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

**Example Front Matter**

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

## Contributing

Mollify LMS is an open-source project, and contributions are always welcome. If you'd like to contribute, please feel free to fork the repository, make your changes, and submit a pull request. For more information on contributing to this repository, please checkout the [Mollify Repository](https://github.com/Fermain/-mollify), and post a comment on the [sign up issue](https://github.com/Fermain/-mollify/issues/131).

## License

Copyright 2023 Oliver Dipple

Licensed under the Apache License, Version 2.0 (the "License");

http://www.apache.org/licenses/LICENSE-2.0
