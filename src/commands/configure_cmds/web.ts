import { CommandModule } from "yargs";

export = {
  command: "web [name]",
  aliases: ["w"],
  describe: "Add Web Boyka-Framework Config file",
  builder: (yargs) =>
    yargs
      .positional("name", {
        demandOption: true,
        describe: "Name of the Web config block",
        type: "string",
      })
      .check((argv, options) => {
        if (!argv.name) {
          throw new Error("Web config name should be provided!");
        } else {
          return true;
        }
      })
      .help("help")
      .showHelpOnFail(
        true,
        "whoops, something went wrong in Web config! run with help"
      )
      .epilog(
        "For more information, visit: https://boykaframework.github.io/boyka-framework"
      ),
  handler: (argv) => {
    // TODO: web handler
    console.log(`Handle Web Config ${argv.name}...`);
  },
} satisfies CommandModule;
