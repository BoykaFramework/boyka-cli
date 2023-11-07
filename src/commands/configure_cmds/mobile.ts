import { CommandModule } from "yargs";

export = {
  command: "mobile",
  aliases: ["m"],
  describe: "Add Mobile Boyka-Framework Config file",
  builder: {},
  handler: (argv) => {
    // TODO: Mobile handler
    console.log("Handle Mobile Config...");
  },
} satisfies CommandModule;
