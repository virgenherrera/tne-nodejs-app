import { pathExists, loadJsonFile, toCamelCase } from '@tne/common';
import { join } from 'path';
import { Defaults } from '../constant/defaults';
import { appThrowable } from './appThrowable';

export function parseArgs(args: any): any {
	let res;
	if (typeof args === 'string') {
		res = { appPath: args };
	} else if (typeof args === 'object' && !Array.isArray(args)) {
		res = { ...args };
	} else {
		appThrowable('invalidConstructorArgs', null);
	}

	return res;
}

export function setEnv(environment: string = null): string {
	const { NODE_ENV } = process.env;

	if (environment && typeof environment === 'string') {
		return environment;
	} else if (NODE_ENV && ['null', 'undefined'].indexOf(NODE_ENV) === -1) {
		return NODE_ENV;
	} else {
		return Defaults.environment;
	}
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
