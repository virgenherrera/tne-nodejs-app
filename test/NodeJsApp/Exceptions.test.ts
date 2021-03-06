import { expect, should } from 'chai';
import { NodeJsApp } from '../../src/';
import { badAppPath, badAppObjConf } from '../fixtures/simpleApp/src';
import { appPath as badEnvJsonAppPath } from '../fixtures/badEnvJson/src';
import { appPath as badKeysJsonAppPath } from '../fixtures/badKeysApp/src';
import { dropLogs } from '../helpers';

should();
describe('@tne/express-core-app on construct', () => {
	const nodeApp: NodeJsApp = null;

	after(() => {
		return (nodeApp)
			? dropLogs(nodeApp.logsPath)
			: null;
	});

	it('should throw with bad constructor arguments', () => {
		const badArgumentList = [
			[badAppObjConf],
			[Object.keys(badAppObjConf)],
			9,
			null,
			false,
			() => 12,
			[badAppObjConf.appPath, 'production'],
			undefined
		];

		badArgumentList.forEach((arg: any) => expect(() => new NodeJsApp(arg)).to.throw());
	});

	it('should throw then appPath does not lead to a valid path', () => {
		expect(() => new NodeJsApp('/non/existent/app/path')).to.throw();
		expect(() => new NodeJsApp(badAppPath)).to.throw();
		expect(() => new NodeJsApp(badAppObjConf)).to.throw();
	});

	it('should throw if ../config/[NODE_ENV].json file is not a valid JSON', () => {
		process.env.NODE_ENV = 'fake_env';
		expect(() => new NodeJsApp(badEnvJsonAppPath)).to.throw();
		process.env.NODE_ENV = 'test';
	});

	it('should throw if ../config/keys.json file is not a valid JSON', () => {
		process.env.NODE_ENV = 'fake_env';
		expect(() => new NodeJsApp(badKeysJsonAppPath)).to.throw();
		process.env.NODE_ENV = 'test';
	});
});

