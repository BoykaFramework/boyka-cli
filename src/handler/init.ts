import yargs from 'yargs';
import fs from 'fs';
import path from 'path';
import { configFileName } from '../utils/constants';

export const handleConfigInit = async (argv: yargs.ArgumentsCamelCase) => {
  const configPath = argv.path as string;
  try {
    await createConfigJson(configPath);
  } catch (error: any) {
    console.error(error.message);
    process.exit(0);
  }
};

const createConfigJson = async (configPath: string) => {
  console.log(`Creating Boyka config file at ${configPath}...`);
  if (fs.existsSync(path.join(configPath, configFileName))) {
    console.error(`Config file already exists...`);
    throw new Error(`Boyka config file is already available at [${configPath}]...`);
  }
  return true;
};
