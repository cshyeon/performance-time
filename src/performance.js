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
		this.opt = Object.assign(this.opt, options);
		this.__result=[];

		let t1, t2, dt;
		for(let i=0; i< this.__task.length; i++){
			t1 = Date.now();
			this.__iter(this.__task[i]);
			t2 = Date.now();
			dt = t2 - t1;
			this.__addResult({task:this.__task[i].name, repeat: this.opt.repeat, time: dt});
		}

		return this.result();
	}

	// private method
	__iter(task) {
		for(let i=0; i<this.opt.repeat;i++)
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

export default Performance;