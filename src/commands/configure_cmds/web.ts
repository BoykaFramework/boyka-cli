import { CommandModule } from "yargs";

export = {
  command: "web",
  aliases: ["w"],
  describe: "Add Web Boyka-Framework Config file",
  builder: {},
  handler: (argv) => {
    // TODO: web handler
    console.log("Handle Web Config...");
  },
} satisfies CommandModule;
