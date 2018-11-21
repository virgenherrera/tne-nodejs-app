import { ISettings } from '@tne/logger';

export interface IAppSettings {
	appPath: string;
	environment?: string;
	appName?: string;
	logger?: ISettings;

	[key: string]: any;
}
