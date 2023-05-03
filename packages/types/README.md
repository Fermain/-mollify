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
import { Entity } from '@mollify/types';

const Course = new Entity("/path/to/course/+page.md");

const Module = new Entity(Course.children[0].address);

const Lesson = new Entity(Module.children[0].address);
```