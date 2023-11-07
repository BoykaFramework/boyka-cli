import { CommandModule } from "yargs";

export = {
  command: "api",
  aliases: ["a"],
  describe: "Add API Boyka-Framework Config file",
  builder: {},
  handler: (argv) => {
    // TODO: API handler
    console.log("Handle API Config...");
  },
} satisfies CommandModule;
