import * as StackTrace from 'stacktrace-js';
import { parse } from 'path';
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
	return async function (E) {

		logger.error(`${appName} has Crashed!`);

		try {
			const stackFrames = await StackTrace.fromError(E);
			const stackStr = stackFrames.reduce((acc, sf, i) => {
				const { name, ext } = parse(sf.fileName);

				acc += (!acc) ? '\t"Stack Trace"\n' : '\n';
				acc += `stackIndex: ${i}\n`;
				acc += `file: ${name + ext}\n`;
				acc += `function: ${sf.functionName.replace('Object.', '')}\n`;
				acc += `line: ${sf.lineNumber}\n`;
				acc += `column: ${sf.columnNumber}\n`;
				acc += `at: ${sf.source.replace(/(\s+at\s)/, '')}\n`;

				return acc;
			}, '');

			if (E.name && E.message) {
				logger.error(`${E.name}:${E.message}`);
			}

			logger.error(stackStr);
			logger.warn('Exiting process!');

		} catch (E) {
			logger.error(E);
		}

		process.exit(1);
	};
}
