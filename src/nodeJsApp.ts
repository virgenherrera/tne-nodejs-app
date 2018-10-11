import { TneLogger, ILogFileConfig } from '@tne/logger';
import { AppSettings } from './entity/appSettings';
import { getConfig } from './lib/getConfig';
import { bindExceptionHandler } from './lib/exceptionHandler';

export class NodeJsApp {
	public _logger: TneLogger;
	public settings: any = null;
	public getConfig: (path: string, defaultValue?: any) => any = (path, defaultValue) => getConfig(this.settings, path, defaultValue);

	constructor(settings: any, defaultSettings: any = null) {
		this.settings = new AppSettings(settings, defaultSettings);

		const fileConfig: ILogFileConfig = {
			logsPath: getConfig(this.settings, 'logsPath'),
			baseFileName: getConfig(this.settings, 'appName'),
		};
		const customTransports = getConfig(this.settings, 'customTransports', []);
		this._logger = new TneLogger({ fileConfig, customTransports });

		bindExceptionHandler(
			getConfig(this.settings, 'appName'),
			getConfig(this.settings, 'fatalErrHandler'),
			this.logger
		);
	}

	public get logger() {
		return this._logger;
	}

	public get logsPath(): string {
		return this._logger.settings.fileConfig.logsPath;
	}

	public get logFilePath(): string {
		return this._logger.settings.fileConfig.logFilePath;
	}
}
