import { expect } from 'chai';
import Performance from '../dist/index';

const { swap1, swap2 } = require('../src/task');

describe('mainTest', () =>{
	let performance;
	beforeEach('instance initialize',() => {
		performance = new Performance();
	});

	it('Creation testing for Performance class\'s instance', function() {
		expect(performance instanceof Performance).to.equal(true);
	});


	// ----- Method test
	describe('addTask() Test', function() {
		it('Error Test', function() {
			expect(performance.addTask()).to.equal(undefined);
			expect(performance.addTask(123)).to.equal(undefined);
			expect(performance.addTask("function")).to.equal(undefined);
			expect(performance.addTask(()=>{},'error', ()=>{})).to.equal(undefined);
		});
		it('Answer Test', function() {
			performance.addTask(()=>{});
			performance.addTask(()=>{}, function abc(){});
			expect(performance.__task.length).to.equal(3);
		});
	});

	describe('clearTask() Test', function() {
		it('Answer Test', function() {
			performance.addTask(()=>{});
			expect(performance.clearTask()).to.equal(0);
		});
	});

	describe('run() and result() Test', function() {
		it('Answer Test', function() {
			performance.addTask(swap1, swap2 );
			console.log('swap1(), swap2() tasks result:', performance.run({repeat: 200000000}));

			let obj = {
				method: function(){
					let count = 12345;
					let sum = 0;
					for(let i=0; i<count; i++)
						sum += count;
				}
			};

			performance.clearTask();
			performance.addTask(()=>{}, function abc(){}, obj.method);
			performance.run({repeat:100});
			expect(performance.result()[2].repeat).to.equal(100);
		});
	});
	// ----- Method test End

});