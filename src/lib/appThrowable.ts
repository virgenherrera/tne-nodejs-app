import { Exceptions } from '../constant/Exceptions';

export function appThrowable(eItem: string, msgReplacers: any = {}, path: string = null, loggerErr: Function = console.error): never {
	let eItemMsg: string = null;
	let pathMsg: string = null;

	if (typeof eItem === 'string' && Exceptions.hasOwnProperty(eItem)) {
		eItemMsg = Exceptions[eItem];


		Object.keys(msgReplacers).forEach(key => {
			eItemMsg = eItemMsg.replace(key, `${msgReplacers[key]}`);
		});

		loggerErr(eItemMsg);
	}

	if (path && typeof path === 'string') {
		pathMsg = Exceptions.appPathInterpolation.replace(':path', path);

		loggerErr(pathMsg);
	}

	const errMsg = (eItemMsg && pathMsg) ? `${eItemMsg}|${pathMsg}` : eItemMsg;

	throw new TypeError(errMsg);
}
