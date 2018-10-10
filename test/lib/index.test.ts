import { expect, should } from 'chai';
import * as Index from '../../src';

should();
describe('@tne/express-core-app index', () => {
	it('NodeJsApp should be a function', () => {
		expect(Index.NodeJsApp).to.be.a('function');
	});

	it('NodeJsApp aliases should be aliases', () => {
		expect(Index.NodeApp).to.be.deep.equal(Index.NodeJsApp);
		expect(Index.App).to.be.deep.equal(Index.NodeJsApp);
		expect(Index.Application).to.be.deep.equal(Index.NodeJsApp);
	});
});
