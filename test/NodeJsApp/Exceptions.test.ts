import * as rimraf from 'rimraf';
import { expect, should } from 'chai';
import { NodeJsApp } from '../../src/nodeJsApp';
import { badAppPath, badAppObjConf } from '../fixtures/simpleApp/src';
import { appPath as badEnvJsonAppPath } from '../fixtures/badEnvJson/src';
import { appPath as badKeysJsonAppPath } from '../fixtures/badKeysApp/src';

should();
describe('@tne/express-core-app on construct', () => {
	const nodeApp: NodeJsApp = null;

	afterEach((done) => (!nodeApp) ? done() : rimraf(nodeApp.logsPath, () => done()));

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

		badArgumentList.forEach(arg => expect(() => new NodeJsApp(arg)).to.throw());
	});

	it('should throw then appPath does not lead to a valid path', () => {
		expect(() => new NodeJsApp('/non/existent/app/path')).to.throw();
		expect(() => new NodeJsApp(badAppPath)).to.throw();
		expect(() => new NodeJsApp(badAppObjConf)).to.throw();
	});

	it('should throw if ../config/[NODE_ENV].json file is not a valid JSON', () => {
		expect(() => new NodeJsApp(badEnvJsonAppPath)).to.throw();
	});

	it('should throw if ../config/keys.json file is not a valid JSON', () => {
		expect(() => new NodeJsApp(badKeysJsonAppPath)).to.throw();
	});
});

