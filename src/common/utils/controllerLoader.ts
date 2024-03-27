import fs from 'fs';
import path from 'path';

import * as Controller from '../../api/';

const controllersDirectory = path.join(__dirname, '../../api');

const isControllerFile = (fileName: string) =>
  (fileName.endsWith('Controller.ts') || fileName.endsWith('Model.ts')) && fileName !== 'index.ts';

async function getControllerFiles(directory: string) {
  const controllerFiles: string[] = [];
  const items = fs.readdirSync(directory, { withFileTypes: true });

  for (const item of items) {
    const itemPath = path.join(directory, item.name);
    if (item.isDirectory()) {
      const nestedFiles = await getControllerFiles(itemPath);
      controllerFiles.push(...nestedFiles);
    } else if (isControllerFile(item.name)) {
      controllerFiles.push(itemPath);
    }
  }

  return controllerFiles;
}

export default async function loadControllers() {
  return Object.values(Controller).map((ele) => ele);
  const controllerFiles = await getControllerFiles(controllersDirectory);

  const controllers = await Promise.all(
    controllerFiles.map(async (filePath) => {
      try {
        const { default: controller } = await import(filePath);
        return controller;
      } catch (error) {
        console.error(`Error loading controller '${filePath}': ${error}`);
        return null;
      }
    })
  );

  return controllers.filter(Boolean);
}
