import { CommandModule } from "yargs";

export = {
  command: "mobile [name]",
  aliases: ["m"],
  describe: "Add Mobile Boyka-Framework Config file",
  builder: (yargs) =>
    yargs
      .positional("name", {
        demandOption: true,
        describe: "Name of the Mobile config block",
        type: "string",
      })
      .check((argv, options) => {
        if (!argv.name) {
          throw new Error("Mobile config name should be provided!");
        } else {
          return true;
        }
      })
      .help("help")
      .showHelpOnFail(
        true,
        "whoops, something went wrong in Mobile config! run with help"
      )
      .epilog(
        "For more information, visit: https://boykaframework.github.io/boyka-framework"
      ),
  handler: (argv) => {
    // TODO: Mobile handler
    console.log(`Handle Mobile Config ${argv.name}...`);
  },
} satisfies CommandModule;
