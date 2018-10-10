import * as rimraf from 'rimraf';
import { expect, should } from 'chai';
import { NodeJsApp } from '../../src/nodeJsApp';
import { simpleAppObjConf } from '../fixtures/simpleApp/src';
import { readFileSync } from 'fs';
import { join } from 'path';

should();
describe('@tne/express-core-app getConfig() Method', () => {
	let nodeApp: NodeJsApp = null;

	afterEach((done) => (!nodeApp) ? done() : rimraf(nodeApp.logsPath, () => done()));

	it('should return keys.json file data', () => {
		const keysJsonData = JSON.parse(`${readFileSync(join(__dirname, '../fixtures/simpleApp/config/keys.json'), 'utf8')}`);
		nodeApp = new NodeJsApp(simpleAppObjConf);

		expect(nodeApp.getConfig('keys')).to.be.deep.equals(keysJsonData);
	});

	it('should return [NODE_ENV].json file data', () => {
		const envJsonData = JSON.parse(`${readFileSync(join(__dirname, '../fixtures/simpleApp/config/test.json'), 'utf8')}`);
		nodeApp = new NodeJsApp(simpleAppObjConf);

		expect(nodeApp.getConfig('env_k1')).to.be.equals(envJsonData.env_k1);
		expect(nodeApp.getConfig('env_K2')).to.be.equals(envJsonData.env_K2);
	});

	it('should [NODE_ENV].json file data be related to keys.json file data', () => {
		const keysJsonData = JSON.parse(`${readFileSync(join(__dirname, '../fixtures/simpleApp/config/keys.json'), 'utf8')}`);
		nodeApp = new NodeJsApp(simpleAppObjConf);

		expect(nodeApp.getConfig('linkedValue1')).to.be.equal(keysJsonData.keys_k1);
		expect(nodeApp.getConfig('linkedValue2')).to.be.equal(keysJsonData.keys_K2);
	});
});

