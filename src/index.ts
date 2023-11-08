#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";

yargs(hideBin(process.argv))
  .scriptName("boyka")
  .commandDir("commands")
  .option("verbose", {
    alias: "v",
    type: "boolean",
    description: "Run with verbose logging",
  })
  .demandCommand()
  .strict()
  .help("help")
  .showHelpOnFail(true, "whoops, something went wrong! run with --help")
  .epilog(
    "For more information, visit: https://boykaframework.github.io/boyka-framework"
  )
  .parse();
