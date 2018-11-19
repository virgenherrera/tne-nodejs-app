import { join } from 'path';
import { TneLogger, ISettings } from '@tne/logger';
import { Defaults } from '../constant/defaults';

export function initLogger(getConfig: Function): TneLogger {
	const appPath = getConfig('appPath');
	const loggerSettings: ISettings = {
		level: getConfig('logger.level', 'debug'),
		fileCfg: {
			logsPath: getConfig('logger.fileCfg.logsPath', join(appPath, Defaults.logsFolder)),
			logFile: getConfig('appName'),
			datePattern: getConfig('logger.fileCfg.datePattern', 'YYYYMMDD'),
		},
		customTransports: getConfig('logger.customTransports', []),
	};

	return new TneLogger(loggerSettings);
}
