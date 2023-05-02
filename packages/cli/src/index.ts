#!/usr/bin/env node

import { Command } from 'commander';
import commands from './commands';

const main = new Command();

main.addCommand(commands.create);
// main.addCommand(commands.link); not yet implemented
main.addCommand(commands.remove);
main.addCommand(commands.migrate);
main.addCommand(commands.list);
main.addCommand(commands.move);
// main.addCommand(commands.format); not yet implemented

// Object.values(commands).forEach((command) => main.addCommand(command));

main.parse(process.argv);
