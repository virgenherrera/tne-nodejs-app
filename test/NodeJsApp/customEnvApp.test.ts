import * as rimraf from 'rimraf';
import { readFileSync } from 'fs';
import { join } from 'path';
import { expect, should } from 'chai';
import { pathExists } from '@tne/common';
import { NodeJsApp } from '../../src/';
import { customAppConf } from '../fixtures/simpleApp/src';

should();
describe('@tne/express-core-app Custom ENV app settings', () => {
	let nodeApp: NodeJsApp = null;

	afterEach((done) => (!nodeApp) ? done() : rimraf(nodeApp.logsPath, () => done()));

	it('NodeJsApp instance should have basic props', () => {
		nodeApp = new NodeJsApp(customAppConf);

		expect(nodeApp).to.be.an('object').that.has.keys('_logger', 'settings', 'getConfig');
	});

	it('NodeJsApp instance should have basic props with default props', () => {
		const appDefaults = {
			k1: 'v1',
			k2: 'v2',
			k3: 'v3',
			k4: 'v4',
			k5: 'v5',
			k6: 'v6',
			k7: 'v7',
		};
		nodeApp = new NodeJsApp(customAppConf, appDefaults);

		expect(nodeApp).to.be.an('object').that.has.keys('_logger', 'settings', 'getConfig');

		Object.keys(appDefaults).forEach(key => {
			expect(nodeApp.getConfig(key)).to.be.equal(appDefaults[key]);
		});
	});

	it('NodeJsApp instance should receive logger props', () => {
		const appDefaults = {
			logger: {
				level: 'warn',
				customTransports: [],
			},
		};
		nodeApp = new NodeJsApp(customAppConf, appDefaults);

		expect(nodeApp).to.be.an('object').that.has.keys('_logger', 'settings', 'getConfig');
	});

	it('NodeJsApp instance should have getters', () => {
		nodeApp = new NodeJsApp(customAppConf);

		expect(nodeApp).to.have.deep.property('logger');
		expect(nodeApp).to.have.deep.property('logsPath');
	});

	it('"getConfig()" method must work even if destructed', () => {
		nodeApp = new NodeJsApp(customAppConf);
		const { getConfig } = nodeApp;

		expect(getConfig('appPath')).to.be.equal(customAppConf.appPath);
	});

	it('"logsPath" must be created when instance was created', () => {
		nodeApp = new NodeJsApp(customAppConf);

		expect(pathExists(nodeApp.logsPath)).to.be.equal(true);
	});

	it('should return keys.json file data', () => {
		const keysJsonData = JSON.parse(`${readFileSync(join(__dirname, '../fixtures/simpleApp/config/keys.json'), 'utf8')}`);
		nodeApp = new NodeJsApp(customAppConf);

		expect(nodeApp.getConfig('keys')).to.be.deep.equals(keysJsonData);
	});

	it('should return [NODE_ENV].json file data', () => {
		const envJsonData = JSON.parse(`${readFileSync(join(__dirname, '../fixtures/simpleApp/config/test.json'), 'utf8')}`);
		nodeApp = new NodeJsApp(customAppConf);

		expect(nodeApp.getConfig('env_k1')).to.be.equals(envJsonData.env_k1);
		expect(nodeApp.getConfig('env_K2')).to.be.equals(envJsonData.env_K2);
	});

	it('should [NODE_ENV].json file data be related to keys.json file data', () => {
		const keysJsonData = JSON.parse(`${readFileSync(join(__dirname, '../fixtures/simpleApp/config/keys.json'), 'utf8')}`);
		nodeApp = new NodeJsApp(customAppConf);

		expect(nodeApp.getConfig('linkedValue1')).to.be.equal(keysJsonData.keys_k1);
		expect(nodeApp.getConfig('linkedValue2')).to.be.equal(keysJsonData.keys_K2);
	});
});

