import * as StackTrace from 'stacktrace-js';
import { Defaults } from '../constant/defaults';

export function bindExceptionHandler(appName: string = null, fatalErrHandler = null, logger: any = console): void {
	if (typeof fatalErrHandler === 'function') {
		process
			.removeAllListeners('uncaughtException')
			.on('uncaughtException', fatalErrHandler.bind(this))
			.removeAllListeners('unhandledRejection')
			.on('unhandledRejection', fatalErrHandler.bind(this));
	} else if (fatalErrHandler === null) {
		process
			.removeAllListeners('uncaughtException')
			.on('uncaughtException', ExceptionHandler(appName, logger))
			.removeAllListeners('unhandledRejection')
			.on('unhandledRejection', ExceptionHandler(appName, logger));
	}
}

export function ExceptionHandler(appName: string = Defaults.appName, logger: any = console) {
	return async function onException(E) {

		logger.error(`${appName} has Crashed!`);

		try {
			const stackFrames = await StackTrace.fromError(E);

			if (E.name && E.message) {
				logger.error(`${E.name}:${E.message}`);
			}

			logger.error(JSON.stringify(stackFrames, null, 3));
			logger.warn('Exiting process!');

		} catch (E) {
			logger.error(E);
		}
	};
}
