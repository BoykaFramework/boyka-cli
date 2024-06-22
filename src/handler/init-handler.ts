import { ArgumentsCamelCase } from 'yargs';
import { Liquid } from 'liquidjs';
import path from 'path';
import fs from 'fs';
import { createConfigJson } from './config/init/init.js';
import { getInitInputs } from './user-inputs.js';
import { BoykaError } from '../utils/boyka-error.js';
import { warn } from '../utils/constants.js';
import { mavenCommandSuggestion, successMavenProject } from '../utils/messages.js';

type ProjectProps = {
  path: string;
  groupId: string;
  artifactId: string;
};

type TemplateProps = {
  root: string;
  extension: string;
};

const generateProject = async (
  engine: Liquid,
  project: ProjectProps,
  { root, extension }: TemplateProps,
  isSampleTest: boolean,
) => {
  if (isSampleTest) {
    await createProjectFiles(engine, { root, extension }, project);
  }
};

const checkProjectFolderCreated = (path: string) => {
  if (fs.existsSync(path)) {
    throw new BoykaError(`Boyka Project is already created at [${path}]...`);
  }
};

const createProjectFolder = (path: string) => {
  fs.mkdirSync(path, { recursive: true });
};

const createProjectFiles = async (
  engine: Liquid,
  { root, extension }: TemplateProps,
  project: ProjectProps,
  priorityFile?: string,
) => {
  fs.readdir(root, (err, files) => {
    if (err) {
      throw new BoykaError(`Error encountered reading template directory: ${err.message}`);
    }
    files?.forEach(async (file) => {
      const fileName = file.substring(0, file.lastIndexOf('.'));
      if (file.endsWith(extension) && (!priorityFile || priorityFile === fileName)) {
        const content = await engine.renderFile(file, project);
        const filePath = path.join(project.path, fileName);
        if (!fs.existsSync(filePath)) {
          fs.writeFileSync(filePath, content);
        }
      }
    });
  });
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
  await createProjectFiles(
    engine,
    { root: templateRoot, extension: templateExt },
    project,
    'pom.xml',
  );
  await createConfigJson(inputs, resourcesPath);
  await generateProject(engine, project, { root: templateRoot, extension: templateExt }, true);

  console.log(warn(successMavenProject));
  console.log(warn(mavenCommandSuggestion(projectName)));
};
