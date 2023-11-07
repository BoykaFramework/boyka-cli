import { CommandModule } from "yargs";

export = {
  command: "configure",
  aliases: ["config", "conf", "c"],
  describe: "Configure Boyka-Framework",
  builder: (yargs) =>
    yargs
      .commandDir("configure_cmds")
      .demandCommand()
      .strict()
      .help("help")
      .showHelpOnFail(
        true,
        "whoops, something went wrong in configure! run with help"
      ),
  handler: (argv) => {},
} satisfies CommandModule;
