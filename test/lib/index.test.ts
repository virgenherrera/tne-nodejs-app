import { expect, should } from 'chai';
import * as Index from '../../src';

should();
describe('@tne/express-core-app index', () => {
	it('NodeJsApp should be a function', () => {
		expect(Index.NodeJsApp).to.be.a('function');
	});
});
