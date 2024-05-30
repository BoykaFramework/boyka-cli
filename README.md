# boyka-cli

Command line assistant for Boyka framework

## Install

To install the assistant, run the following command on the terminal:

```shell
npm i -g @boykaframework/boyka-cli
```

## Commands

### `boyka configure init --path /path/to/config`

This command will create a basic Boyka-framework config file named `boyka-config.json` at the specified path.

If the optional `--path` option is not provided, it will create the config at `src/test/resources` folder by default.

### `boyka configure api [name] --path /path/to/config`

This will add API configuration in the config file with the given name to the config block.

This will ask a set of questions to the user and depending on their answers, it will configure the API config.

If the default config path is not `src/test/resources`, then you can set the config path by using the optional param of `--path <path/to/config>`.

### `boyka configure web [name] --path /path/to/config`

This will add Web configuration in the config file with the given name to the config block.

This will ask a set of questions to the user and depending on their answers, it will configure the Web config.

If the default config path is not `src/test/resources`, then you can set the config path by using the optional param of `--path <path/to/config>`.

### `boyka configure android [name] --path /path/to/config`

This will add Mobile Android configuration in the config file with the given name to the config block.

This will ask a set of questions to the user and depending on their answers, it will configure the Mobile config.

If the default config path is not `src/test/resources`, then you can set the config path by using the optional param of `--path <path/to/config>`.

### `boyka configure ios [name] --path /path/to/config`

This will add Mobile iOS configuration in the config file with the given name to the config block.

This will ask a set of questions to the user and depending on their answers, it will configure the Mobile config.

If the default config path is not `src/test/resources`, then you can set the config path by using the optional param of `--path <path/to/config>`.
