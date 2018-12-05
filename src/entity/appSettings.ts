import * as lib from '../lib/settingParser';
import { IAppSettings } from '../interfaces';

export class AppSettings {
	[key: string]: any;

	constructor(args: IAppSettings | string, defaultSettings: any = null) {
		// Parse args get Env and appName
		const settings = lib.parseArgs(args, defaultSettings);
		const environment = lib.getAppEnv();
		const appName = lib.setAppName(settings.appName);

		// Ensure appPath was provided and leads to valid path
		const appPath = lib.parseAppPath(settings.appPath);

		// Ensure configPath was provided and leads to valid path
		const configPath = lib.parseConfigPath(appPath);

		// Ensure configPath/:NODE_ENV.json file exists and is a valid json
		const config = lib.getJsonFileEnvData(configPath, environment);

		// Ensure configPath/keys.json file exists and is a valid json
		const keys = lib.getJsonFileKeysData(configPath);

		// ParseLogger Config
		const logger = lib.setLoggerCfg(settings);

		// Bundle settings
		Object.assign(this, settings, { environment, appName, appPath, configPath, logger }, config, { keys });

		// Freeze AppSettings
		Object.freeze(this);
	}
}
