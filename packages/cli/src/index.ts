#!/usr/bin/env node
import yargs from 'yargs';
import createCommand from './commands/create';
import moveCommand from './commands/move';

yargs
  .scriptName("mollify")
  .usage('$0 <cmd> [args]')
  .command(createCommand)
  .command(moveCommand)
  .help()
  .argv;
