import { join } from 'path';

export const appPath = __dirname;
export const badAppPath = join(__dirname, '../../../NodeJsApp');

export const simpleAppObjConf = { appPath };
export const badAppObjConf = { appPath: badAppPath };
