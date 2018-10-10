import * as rimraf from 'rimraf';
import { expect, should } from 'chai';
import { pathExists, fileExists } from '@tne/common';
import { NodeJsApp } from '../../src/nodeJsApp';
import { appPath } from '../fixtures/simpleApp/src';

should();
describe('@tne/express-core-app construct with string argument', () => {
	let nodeApp: NodeJsApp = null;

	afterEach((done) => (!nodeApp) ? done() : rimraf(nodeApp.logsPath, () => done()));

	it('NodeJsApp instance should have basic props', () => {
		nodeApp = new NodeJsApp(appPath);

		expect(nodeApp).to.be.an('object').that.has.keys('_logger', 'settings', 'getConfig');
	});

	it('NodeJsApp instance should have getters', () => {
		nodeApp = new NodeJsApp(appPath);

		expect(nodeApp).to.have.deep.property('logger');
		expect(nodeApp).to.have.deep.property('logsPath');
	});

	it('"getConfig()" method must work even if destructed', () => {
		nodeApp = new NodeJsApp(appPath);
		const { getConfig } = nodeApp;

		expect(getConfig('appPath')).to.be.equal(appPath);
	});

	it('"logsPath" must be created when instance was created', () => {
		nodeApp = new NodeJsApp(appPath);

		expect(pathExists(nodeApp.logsPath)).to.be.equal(true);
	});

	it('"logsPath" file must be created when instance was created', () => {
		nodeApp = new NodeJsApp(appPath);

		expect(fileExists(nodeApp.logFilePath)).to.be.equal(true);
	});
});

