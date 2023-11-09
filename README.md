# boyka-cli

Command line tool for Boyka framework

## Command Details

### `boyka configure init --path /path/to/config`

This command will create a basic Boyka-framework config file named `boyka-config.json` at the specified path.

If `--path` option is not provided, it will create the config at `src/test/resources` folder by default.

### `boyka configure api [name]`

This will add API configuration in the config file with the given name to the config block.

This will ask a set of questions to the user and depending on their answers, it will configure the API config.

### `boyka configure web [name]`

This will add Web configuration in the config file with the given name to the config block.

This will ask a set of questions to the user and depending on their answers, it will configure the Web config.

### `boyka configure mobile [name]`

This will add Mobile configuration in the config file with the given name to the config block.

This will ask a set of questions to the user and depending on their answers, it will configure the Mobile config.
