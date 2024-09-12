import { ArgumentsCamelCase } from 'yargs';
import { Liquid } from 'liquidjs';
import path from 'path';
import fs from 'fs';
import { createConfigJson } from './config/init/init.js';
import { getInitInputs } from './user-inputs.js';
import { BoykaError } from '../utils/boyka-error.js';
import { warn } from '../utils/constants.js';
import {
  incorrectTemplatePath,
  mavenCommandSuggestion,
  projectFolderExists,
  successMavenProject,
} from '../utils/messages.js';
import { TemplateFile } from '../types/types.js';
import { templates } from '../templates/template-list.js';
import { getLatestMavenVersion } from '../utils/api.js';

type Dependency = {
  groupId: string;
  artifactId: string;
  scope?: 'test' | 'provided';
  version?: string;
};

type ProjectProps = {
  path: string;
  groupId: string;
  artifactId: string;
  configName: string;
  platform: string;
  dependencies?: Dependency[];
};

const generateFiles = async (engine: Liquid, project: ProjectProps, templates: TemplateFile[]) => {
  templates.forEach(async (template) => await createProjectFile(engine, project, template));
};

const generateProject = async (
  engine: Liquid,
  project: ProjectProps,
  isSampleTest: boolean,
  platform: string,
  subPlatform: string,
) => {
  const requiredFiles = templates.required;
  await generateFiles(engine, project, requiredFiles);

  if (isSampleTest) {
    const sampleFiles =
      templates.platform[platform] ||
      templates.platform[subPlatform === 'web' ? subPlatform : 'mobile'];
    await generateFiles(engine, project, sampleFiles);
  }
};

const checkProjectFolderCreated = (path: string) => {
  if (fs.existsSync(path)) {
    throw new BoykaError(projectFolderExists(path));
  }
};

const createFolder = (path: string) => {
  fs.mkdirSync(path, { recursive: true });
};

const getParentFolder = (
  { path: projectPath, groupId }: ProjectProps,
  { main, test, resource, folder }: Omit<TemplateFile, 'fileName' | 'content'>,
) => {
  const sourcePath = main && !test ? '/src/main/' : !main && test ? '/src/test/' : '';
  const resourcePath = resource ? '/resources/' : main || test ? '/java/' : '';
  const parentFolder = path.join(
    projectPath,
    sourcePath,
    resourcePath,
    sourcePath === '' ? '' : groupId.replaceAll('.', '/'),
    folder,
  );
  createFolder(parentFolder);
  return parentFolder;
};

const createProjectFile = async (
  engine: Liquid,
  project: ProjectProps,
  { folder = '', content, fileName, main, resource, test }: TemplateFile,
) => {
  const parsedContent = await engine.parseAndRender(content, project);
  const parentFolder = getParentFolder(project, { folder, main, resource, test });
  const filePath = path.resolve(parentFolder, fileName);
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, parsedContent);
    }
  } catch (err) {
    throw new BoykaError(incorrectTemplatePath(err.message, filePath));
  }
};

export const handleInit = async (argv: ArgumentsCamelCase) => {
  const projectName = argv.name as string;
  const projectPath = path.join(process.cwd(), projectName);
  const resourcesPath = path.join(projectPath, 'src/test/resources');

  checkProjectFolderCreated(projectPath);

  const inputs = await getInitInputs();
  const engine = new Liquid();
  const project: ProjectProps = {
    groupId: inputs.group_id,
    artifactId: projectName,
    path: projectPath,
    configName: inputs.config_name,
    platform: inputs.sub_platform,
    dependencies: await getDependencies(),
  };

  createFolder(resourcesPath);
  await createConfigJson(inputs, resourcesPath);
  await generateProject(
    engine,
    project,
    inputs.generate_sample,
    inputs.platform.toLowerCase(),
    inputs.sub_platform?.toLowerCase(),
  );

  console.log(warn(successMavenProject));
  console.log(warn(mavenCommandSuggestion(projectName)));
};

const getDependencies = async () => {
  const dependencies: Dependency[] = [
    { groupId: 'io.github.boykaframework', artifactId: 'boyka-framework' },
    { groupId: 'org.projectlombok', artifactId: 'lombok', scope: 'provided' },
    { groupId: 'org.testng', artifactId: 'testng', scope: 'test' },
    { groupId: 'net.datafaker', artifactId: 'datafaker', scope: 'test' },
  ];
  for (const dependency of dependencies) {
    dependency.version = await getLatestMavenVersion(dependency.groupId, dependency.artifactId);
  }
  return dependencies;
};
