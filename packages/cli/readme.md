# Mollify CLI

Mollify CLI is a command-line tool designed to manage the filesystem for the Mollify Learning Management System (LMS). It ensures that the file structure adheres to SvelteKit's file path conventions and provides a convenient way to create, archive, and remove various entities within the LMS. Mollify CLI is written in TypeScript and uses the Commander and Enquirer libraries to provide a user-friendly and intuitive interface.

## Features

Mollify CLI helps you manage the following entities:

- Institutions
- Programmes
- Courses
- Modules
- Lessons
- Evaluations

## Commands

Mollify CLI provides the following commands for managing the filesystem:

```
mollify <cmd> [args]

Commands:
  mollify init                              Initialise a new project
  mollify create [location]                 Create a new entity
  mollify preview                           Preview your content live in the
                                            browser
  mollify move [entity-type]                Move an entity to a new location
  mollify remove [entity-type] [basePath]   Remove an entity or list all
                                            entities
  mollify list [entity-type] [basePath]     List all entities of a given type or
                                            all entities
  mollify migrate [location]                Migrate markdown content files to
                                            Mollify structure
  mollify link <mode> <destination>         Link a remote or local entity as a
  <source>                                  submodule or symlink.

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```

## Installation

To install Mollify CLI, run the following command:

```sh
npm install -g @Mollify/cli
```

## Contributing

Mollify CLI is an open-source project, and contributions are always welcome. If you'd like to contribute, please feel free to fork the repository, make your changes, and submit a pull request. For more information on contributing to this repository, please checkout the [Mollify Repository](https://github.com/Fermain/-mollify), and post a comment on the [sign up issue](https://github.com/Fermain/-mollify/issues/131).
