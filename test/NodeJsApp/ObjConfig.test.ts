import * as rimraf from 'rimraf';
import { expect, should } from 'chai';
import { pathExists, fileExists } from '@tne/common';
import { NodeJsApp } from '../../src/nodeJsApp';
import { appPath, simpleAppObjConf, appAdditionalData } from '../fixtures/simpleApp/src';

should();
describe('@tne/express-core-app construct with Object argument', () => {
	let nodeApp: NodeJsApp = null;

	afterEach((done) => (!nodeApp) ? done() : rimraf(nodeApp.logsPath, () => done()));

	it('NodeJsApp instance should have basic props', () => {
		nodeApp = new NodeJsApp(simpleAppObjConf);

		expect(nodeApp).to.be.an('object').that.has.keys('_logger', 'settings', 'getConfig');
	});

	it('NodeJsApp instance should have getters', () => {
		nodeApp = new NodeJsApp(simpleAppObjConf);

		expect(nodeApp).to.have.deep.property('logger');
		expect(nodeApp).to.have.deep.property('logsPath');
	});

	it('"getConfig()" method must work even if destructed', () => {
		nodeApp = new NodeJsApp(simpleAppObjConf);
		const { getConfig } = nodeApp;

		expect(getConfig('appPath')).to.be.equal(simpleAppObjConf.appPath);
	});

	it('"logsPath" must be created when instance was created', () => {
		nodeApp = new NodeJsApp(simpleAppObjConf);

		expect(pathExists(nodeApp.logsPath)).to.be.equal(true);
	});

	it('"logsPath" file must be created when instance was created', () => {
		nodeApp = new NodeJsApp(simpleAppObjConf);

		expect(fileExists(nodeApp.logFilePath)).to.be.equal(true);
	});

	it('should bundle additional data to settings object', () => {
		nodeApp = new NodeJsApp({ appPath }, appAdditionalData);

		expect(nodeApp.settings).to.be.an('object');

		Object.keys(appAdditionalData).forEach(key => {
			expect(nodeApp.settings).to.have.property(key);
			expect(nodeApp.settings[key]).to.be.equals(appAdditionalData[key]);
			expect(nodeApp.getConfig(key)).to.be.equal(appAdditionalData[key]);
		});
	});
});

