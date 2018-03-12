"use strict";
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