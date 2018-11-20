import { expect, should } from 'chai';
import { TneLogger as MainLogger } from '@tne/logger';
import * as Index from '../../src';

should();
describe('@tne/express-core-app index', () => {
	it('NodeJsApp should be a function', () => {
		expect(Index.NodeJsApp).to.be.a('function');
		expect(Index.TneLogger).to.be.a('function');
		expect(Index.TneLogger).to.be.deep.equal(MainLogger);
	});
});
