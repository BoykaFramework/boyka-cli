import { ArgumentsCamelCase } from 'yargs';
import { Liquid } from 'liquidjs';
import path from 'path';
import fs from 'fs';
import { getGroupId, hasSampleTests } from '../questions/initInputs.js';
import { handleConfigInit } from './config/init/init.js';

interface ProjectProps {
  path: string;
  groupId: string;
  artifactId: string;
}

interface TemplateProps {
  root: string;
  extension: string;
}

const generateProject = async (
  engine: Liquid,
  project: ProjectProps,
  { root, extension }: TemplateProps,
) => {
  const isSampleTest = await hasSampleTests();
  if (isSampleTest) {
    await createProjectFiles(engine, { root, extension }, project);
  }
};

const createProjectFolder = async ({ artifactId }: ProjectProps) => {
  const projectPath = path.join(process.cwd(), artifactId);
  if (fs.existsSync(projectPath)) {
    throw new Error(`Boyka Project is already created at [${projectPath}]...`);
  }
  fs.mkdir(projectPath, (err) => {
    if (err) {
      throw new Error(
        `Error encountered while creating folder Boyka project '${artifactId}': ${err.message}`,
      );
    }
  });
};

const createProjectFiles = async (
  engine: Liquid,
  { root, extension }: TemplateProps,
  project: ProjectProps,
  priorityFile?: string,
) => {
  fs.readdir(root, (err, files) => {
    if (err) {
      throw new Error(`Error encountered reading template directory: ${err.message}`);
    }
    files?.forEach(async (file) => {
      const fileName = file.substring(0, file.lastIndexOf('.'));
      if (file.endsWith(extension) && (!priorityFile || priorityFile === fileName)) {
        const content = await engine.renderFile(file, project);
        const filePath = path.join(project.path, fileName);
        if (!fs.existsSync(filePath)) {
          fs.writeFile(filePath, content, (err) => {
            console.error(err);
          });
        }
      }
    });
  });
};

export const handleInit = async (argv: ArgumentsCamelCase) => {
  const projectName = argv.name as string;
  const templateRoot = path.join(process.cwd(), '/template');
  const templateExt = '.liquid';

  const engine = new Liquid({
    root: templateRoot,
    extname: templateExt,
  });
  const project = {
    groupId: await getGroupId(),
    artifactId: projectName,
    path: path.join(process.cwd(), projectName),
  } satisfies ProjectProps;

  await createProjectFolder(project);
  await createProjectFiles(
    engine,
    { root: templateRoot, extension: templateExt },
    project,
    'pom.xml',
  );
  await handleConfigInit(project.path);

  await generateProject(engine, project, { root: templateRoot, extension: templateExt });
};
