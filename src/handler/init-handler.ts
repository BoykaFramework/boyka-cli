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

const generateFiles = async (engine: Liquid, project: ProjectProps, templates: TemplateFile[]) => {
  templates.forEach(async (template) => await createProjectFile(engine, project, template));
};

const generateProject = async (
  engine: Liquid,
  project: ProjectProps,
  isSampleTest: boolean,
  templates: TemplateFile[],
) => {
  const requiredFiles = templates.filter((template) => !template.test && !template.main);
  await generateFiles(engine, project, requiredFiles);

  if (isSampleTest) {
    const sampleFiles = templates.filter((template) => template.main || template.test);
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
  const parentFolder = path.join(
    projectPath,
    main && !test ? '/src/main/' : !main && test ? '/src/test/' : '',
    resource ? '/resources/' : main || test ? '/java/' : '',
    groupId.replaceAll('.', '/'),
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
  try {
    const parsedContent = await engine.parseAndRender(content, project);
    const parentFolder = getParentFolder(project, { folder, main, resource, test });
    const filePath = path.resolve(parentFolder, fileName);
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

  const engine = new Liquid();
  const project = {
    groupId: inputs.group_id,
    artifactId: projectName,
    path: projectPath,
  } satisfies ProjectProps;

  createFolder(resourcesPath);
  await createConfigJson(inputs, resourcesPath);
  await generateProject(engine, project, inputs.generate_sample, templates);

  console.log(warn(successMavenProject));
  console.log(warn(mavenCommandSuggestion(projectName)));
};
