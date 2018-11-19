import { TneLogger, ISettings } from '@tne/logger';

export function initLogger(getConfig: Function): TneLogger {
	const loggerSettings: ISettings = {
		level: getConfig('logger.level', 'debug'),
		fileCfg: {
			logsPath: getConfig('logsPath'),
			logFile: getConfig('appName'),
			datePattern: getConfig('logger.fileCfg.datePattern'),
		},
		customTransports: getConfig('logger.customTransports'),
	};

	return new TneLogger(loggerSettings);
}
