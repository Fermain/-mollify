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

- \`mollify create <entity-type>\`: Create a new entity of the specified type.
- \`mollify archive [filepath]\`: Archive an existing entity of the specified type.
- \`mollify remove [filepath]\`: Remove an existing entity of the specified type.
- \`mollify format [filepath]\`: Format the specified file.
- \`mollify migrate [filepath]\`: Migrate the specified file to the required file structure.
- \`mollify add <entity-type> <giturl>\`: Add a submodule, designed mainly for adding courses to a programme, but can be used for other entity types as well.

Note: The \`[filepath]\` parameter is optional for the \`archive\`, \`remove\`, \`format\`, and \`migrate\` commands. If not provided, the command will use the current working directory.

## Installation

To install Mollify CLI, run the following command:

```sh
npm install -g @Mollify/cli
```

## Usage

To create a new entity, such as a course, run the following command:

```sh
mollify create course
```

To archive an existing entity, use the archive command:

```sh
mollify archive /path/to/entity/ # Archive a specific entity  
mollify archive # Archive all entities in the current directory
```

To remove a entity, use the remove command:

```sh
mollify remove /path/to/entity/ # Remove a specific entity
mollify remove # Remove all entities in the current directory
```

Format a specific file or the whole project with the format command:

```sh
mollify format /path/to/entity/ # Format a specific file
mollify format # Format all markdown files in the current directory
```

Migrate a file or the whole project to the required file structure using the migrate command:

```sh
mollify migrate /path/to/entity/ # Migrate a specific file
mollify migrate # Migrate all markdown files in the current directory
```

To add a submodule, like a course from a Git URL, use the add command:

```sh
mollify link course https://github.com/user/repo.git
```

## Contributing

Mollify CLI is an open-source project, and contributions are always welcome. If you'd like to contribute, please feel free to fork the repository, make your changes, and submit a pull request.
