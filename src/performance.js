"use strict";
const { warmUpTask } = require('./task');

const WARMUP_REPEAT = 100000000;
const REPEAT = 100000;

class Performance {
	constructor(options) {
		this.opt = Object.assign({
			repeat: REPEAT
		}, options);

		// private member
		this.__task = [];
		this.__result = [];
	}


	addTask(...tasks) {
		tasks.forEach( (task, idx)=>{
			if (typeof task !== 'function') {
				console.error('Task must be a function');
				return;
			}
			this.__task.push(task);
		});
	}
	clearTask() {
		this.__task = [];
		return this.__task.length;
	}
	result() {
		return this.__result;
	}

	run(options) {
		let repeat = (options && options.repeat) || this.opt.repeat;
		this.__result=[];

		// Added warmUp procedure because occur first task very fast result than others.
		this.__warmUp(warmUpTask, WARMUP_REPEAT);	

		let t1, t2, dt;
		for(let i=0; i< this.__task.length; i++){
			t1 = Date.now();
			this.__iter(this.__task[i], repeat);
			t2 = Date.now();
			dt = t2 - t1;
			this.__addResult({task:this.__task[i].name, repeat: repeat, time: dt});
		}

		return this.result();
	}

	// private method
	__warmUp(task, repeat) {
		this.__iter(task, repeat);
	}

	__iter(task, repeat) {
		for(let i=0; i<repeat;i++)
			task();
	}

	__addResult(result) {
		this.__result.push({
			task: result.task,
			repeat: result.repeat,
			time: result.time
		});
	}
}

module.exports =  Performance;