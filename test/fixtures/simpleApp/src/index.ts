import { join } from 'path';

export const appPath = __dirname;
export const badAppPath = join(__dirname, '../../../NodeJsApp');

export const simpleAppObjConf = { appPath };
export const badAppObjConf = { appPath: badAppPath };

export const customAppConf = {
	appPath,
};


export const appAdditionalData = {
	appName: 'expressCoreApp',
	locals: 'null1',
	port: 3000,
	viewsConfig: 'null2',
	bodyParser: 'null3',
	preRouteHooks: [],
	publicFolder: 'null4',
	faviconPath: 'null5',
	routesFolder: 'null6',
	errorHandler: 'notFound',
	httpsOptions: new Date().toISOString(),
};
