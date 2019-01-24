import { expect, should } from 'chai';
import { pathExists } from '@tne/common';
import { NodeJsApp } from '../../src/';
import { appPath, appAdditionalData } from '../fixtures/simpleApp/src';
import { dropLogs } from '../helpers';

should();
describe('@tne/express-core-app construct with string argument', () => {
	let nodeApp: NodeJsApp = null;

	after(() => {
		return (nodeApp)
			? dropLogs(nodeApp.logsPath)
			: null;
	});

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

	it('should bundle additional data to settings object', () => {
		nodeApp = new NodeJsApp(appPath, appAdditionalData);

		expect(nodeApp.settings).to.be.an('object');

		Object.keys(appAdditionalData).forEach(key => {
			expect(nodeApp.settings).to.have.property(key);
			expect(nodeApp.settings[key]).to.be.equals(appAdditionalData[key]);
			expect(nodeApp.getConfig(key)).to.be.equal(appAdditionalData[key]);
		});
	});
});

