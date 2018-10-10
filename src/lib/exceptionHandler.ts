export function bindExceptionHandler(fatalErrHandler = null, logger: any = console): void {
	if (typeof fatalErrHandler === 'function') {
		process
			.removeAllListeners('uncaughtException')
			.on('uncaughtException', fatalErrHandler.bind(this))
			.removeAllListeners('unhandledRejection')
			.on('unhandledRejection', fatalErrHandler.bind(this));
	} else if (fatalErrHandler === null) {
		process
			.removeAllListeners('uncaughtException')
			.on('uncaughtException', ExceptionHandler(logger))
			.removeAllListeners('unhandledRejection')
			.on('unhandledRejection', ExceptionHandler(logger));
	}
}

export function ExceptionHandler(logger: any = console) {
	return function (E) {

		logger.error(`@tne/nodejs-app_crash`);
		logger.error(E);
		logger.warn('Exiting process!');

		process.exit(1);
	};
}
