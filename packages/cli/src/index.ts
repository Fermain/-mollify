#!/usr/bin/env node
import yargs from 'yargs';
import createCommand from './commands/create';
import moveCommand from './commands/move';
import migrateCommand from './commands/migrate';

yargs
  .scriptName("mollify")
  .usage('$0 <cmd> [args]')
  .command(createCommand)
  .command(moveCommand)
  .command(migrateCommand)
  .help()
  .argv;
