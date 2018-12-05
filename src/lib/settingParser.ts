import { pathExists, loadJsonFile, toCamelCase } from '@tne/common';
import { join } from 'path';
import { Defaults } from '../constant/defaults';
import { appThrowable } from './appThrowable';
import { IAppSettings } from '../interfaces';
import { ISettings as ILogSets, IFileSettings } from '@tne/logger';
import { getConfig } from './getConfig';

export function parseArgs(args: IAppSettings | string, defaultSettings: any = null): any {
	let res;

	if (typeof args === 'string') {
		res = { appPath: args };
	} else if (typeof args === 'object' && !Array.isArray(args)) {
		res = { ...args };
	} else {
		appThrowable('invalidConstructorArgs', null);
	}

	if (defaultSettings) {
		res = Object.assign({}, defaultSettings, res);
	}

	return res;
}
export function getAppEnv(): string {
	const { NODE_ENV = Defaults.environment } = process.env;

	return NODE_ENV;
}

export function setAppName(appName: string = null): string {
	return (appName) ? toCamelCase(appName) : Defaults.appName;
}

export function parseAppPath(appPath: string = null): string {
	if (!appPath) {
		appThrowable('invalidAppSetting', null);
	}

	if (!pathExists(appPath)) {
		appThrowable('invalidAppPath', null, appPath);
	}

	return appPath;
}

export function parseConfigPath(appPath: string = null): string {
	const configPath = join(appPath, Defaults.configFolder);

	if (!pathExists(configPath)) {
		appThrowable('invalidConfigPath', null, configPath);
	}

	return configPath;
}

export function getJsonFileEnvData(configPath: string, env: string): any {
	const configFilePath = join(configPath, `${env}.json`);

	try {
		return loadJsonFile(configFilePath);
	} catch (E) {
		console.error(E);
		throw E;
	}
}

export function getJsonFileKeysData(configPath: string): any {
	const keysFilePath = join(configPath, 'keys.json');

	try {
		return loadJsonFile(keysFilePath);
	} catch (E) {
		console.error(E);
		throw E;
	}
}

export function setLogsPath(appPath: string, logsFolder: string = Defaults.logsFolder): string {
	return join(appPath, logsFolder);
}


export function setLoggerCfg(settings: IAppSettings): ILogSets {
	const { appPath, appName } = settings;

	let logsPath = getConfig(settings, 'logger.fileCfg.logsPath', '');
	logsPath = pathExists(logsPath) ? logsPath : join(appPath, Defaults.logsFolder);

	const logFile = getConfig(settings, 'logger.fileCfg.logFile', appName);
	const datePattern = getConfig(settings, 'logger.fileCfg.datePattern');

	const fileCfg: IFileSettings = { logsPath, logFile, datePattern };
	const logConfig: ILogSets = { fileCfg };

	if (settings.logger && settings.logger.format) {
		logConfig.format = settings.logger.format;
	}
	if (settings.logger && settings.logger.level) {
		logConfig.level = settings.logger.level;
	}
	if (settings.logger && settings.logger.customTransports) {
		logConfig.customTransports = settings.logger.customTransports;
	}

	return logConfig;
}
