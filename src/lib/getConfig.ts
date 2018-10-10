import { getFromHaystack } from '@tne/common';

export function getConfig(settings: any, path: string, defaultValue: any = null): any {
	const strReplacer = '$keys.';
	const { keys } = settings;
	let val = getFromHaystack(path, settings, defaultValue);

	if (val && keys && typeof val === 'string' && val.indexOf(strReplacer) === 0) {
		const keysPath = val.replace(strReplacer, '');
		val = getFromHaystack(keysPath, settings.keys, defaultValue);
	}

	return val;
}
