#!/usr/bin/env node
import yargs from 'yargs';
import commands from './commands';

yargs
  .scriptName('mollify')
  .usage('$0 <cmd> [args]')
  .command(commands.init)
  .command(commands.create)
  .command(commands.move)
  .command(commands.remove)
  .command(commands.list)
  .command(commands.migrate)
  .command(commands.link)
  // .command(commands.unlink)
  .help().argv;
