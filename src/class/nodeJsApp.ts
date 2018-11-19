import { TneLogger } from '@tne/logger';
import { AppSettings } from '../entity/appSettings';
import { getConfig } from '../lib/getConfig';
import { initLogger } from '../lib/initLogger';

export class NodeJsApp {
	public _logger: TneLogger;
	public settings: any = null;
	public getConfig: (path: string, defaultValue?: any) => any = (path, defaultValue) => getConfig(this.settings, path, defaultValue);

	constructor(settings: any, defaultSettings: any = null) {
		this.settings = new AppSettings(settings, defaultSettings);
		this._logger = initLogger(this.getConfig);
	}

	public get logger() {
		return this._logger;
	}

	public get logsPath(): string {
		return this._logger.settings.fileCfg.logsPath;
	}
}
