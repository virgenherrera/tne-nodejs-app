import * as lib from '../lib/settingParser';

export class AppSettings {
	[key: string]: any;

	constructor(args: any, defaultSettings: any = null) {
		// step 0 parse args get Env and appName
		const settings = lib.parseArgs(args, defaultSettings);
		const environment = lib.setEnv(settings.environment);
		const appName = lib.setAppName(settings.appName);

		// step 1 ensure appPath was provided and leads to valid path
		const appPath = lib.parseAppPath(settings.appPath);

		// step 2 ensure configPath was provided and leads to valid path
		const configPath = lib.parseConfigPath(appPath);

		// step 3 ensure configPath/:NODE_ENV.json file exists and is a valid json
		const config = lib.getJsonFileEnvData(configPath, environment);

		// step 4 ensure configPath/keys.json file exists and is a valid json
		const keys = lib.getJsonFileKeysData(configPath);

		// step 5 declare logsPath
		const logsPath = lib.setLogsPath(appPath, settings.logsPath || config.logsPath);

		// step 6 bundle settings
		Object.assign(this, settings, { environment, appName, appPath, configPath, logsPath }, config, { keys });

		// Step 7 freeze AppSettings
		Object.freeze(this);
		Object.freeze(this['prototype']);
	}
}
