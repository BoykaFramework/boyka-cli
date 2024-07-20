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

type ProjectProps = {
  path: string;
  groupId: string;
  artifactId: string;
};

const generateProject = async (
  engine: Liquid,
  project: ProjectProps,
  isSampleTest: boolean,
  templates: TemplateFile[],
) => {
  if (isSampleTest) {
    templates.forEach(async (template) => await createProjectFile(engine, project, template));
  }
};

const checkProjectFolderCreated = (path: string) => {
  if (fs.existsSync(path)) {
    throw new BoykaError(projectFolderExists(path));
  }
};

const createProjectFolder = (path: string) => {
  fs.mkdirSync(path, { recursive: true });
};

const createProjectFile = async (
  engine: Liquid,
  project: ProjectProps,
  { folder = '', content, fileName }: TemplateFile,
) => {
  try {
    const parsedContent = await engine.parseAndRender(content, project);
    console.log({ project, folder, fileName, parsedContent });
    const filePath = path.resolve(project.path, folder, fileName);
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, parsedContent);
    }
  } catch (err) {
    throw new BoykaError(incorrectTemplatePath(err.message));
  }
};

export const handleInit = async (argv: ArgumentsCamelCase) => {
  const projectName = argv.name as string;
  const projectPath = path.join(process.cwd(), projectName);
  const resourcesPath = path.join(projectPath, 'src/test/resources');

  checkProjectFolderCreated(projectPath);
  const inputs = await getInitInputs();

  const templateRoot = path.join(process.cwd(), '/template');
  const templateExt = '.liquid';

  const engine = new Liquid({
    root: templateRoot,
    extname: templateExt,
  });
  const project = {
    groupId: inputs.group_id,
    artifactId: projectName,
    path: projectPath,
  } satisfies ProjectProps;

  createProjectFolder(resourcesPath);
  await createConfigJson(inputs, resourcesPath);
  await generateProject(engine, project, inputs.generate_sample, templates);

  console.log(warn(successMavenProject));
  console.log(warn(mavenCommandSuggestion(projectName)));
};
