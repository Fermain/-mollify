# @mollify/types

This package contains all type definitions required across the project. The @mollify/types package provides a centralized location for defining and managing the types used throughout the project.

## Installation

To install the @mollify/types package with `npm`, simply run the following command:

```bash
npm install --save-dev @mollify/types
# or
npm i -D @mollify/types
```

Alternatively, you may use another package manager:

```bash
yarn add -D @mollify/types
# or
pnpm add -D @mollify/types
```

## Usage

To use the @mollify/types package, simply import the required types in your TypeScript or JavaScript files:

```javascript
import { Entity } from "@mollify/types";

const Course = new Entity("/path/to/course/+page.md");

const Module = new Entity(Course.children[0].address);

const Lesson = new Entity(Module.children[0].address);
```

## Contributing

Mollify Types is an open-source project, and contributions are always welcome. If you'd like to contribute, please feel free to fork the repository, make your changes, and submit a pull request. For more information on contributing to this repository, please checkout the [Mollify Repository](https://github.com/Fermain/-mollify), and post a comment on the [sign up issue](https://github.com/Fermain/-mollify/issues/131).

## License

Copyright 2023 Oliver Dipple

Licensed under the Apache License, Version 2.0 (the "License");

http://www.apache.org/licenses/LICENSE-2.0
