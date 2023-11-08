import { CommandModule } from "yargs";

export = {
  command: "api [name]",
  aliases: ["a"],
  describe: "Add API Boyka-Framework Config file",
  builder: (yargs) =>
    yargs
      .positional("name", {
        demandOption: true,
        describe: "Name of the API config block",
        type: "string",
      })
      .check((argv, options) => {
        if (!argv.name) {
          throw new Error("API config name should be provided!");
        } else {
          return true;
        }
      })
      .help("help")
      .showHelpOnFail(
        true,
        "whoops, something went wrong in API config! run with help"
      )
      .epilog(
        "For more information, visit: https://boykaframework.github.io/boyka-framework"
      ),
  handler: (argv) => {
    // TODO: API handler
    console.log(`Handle API Config ${argv.name}...`);
  },
} satisfies CommandModule;
