// ES5 version sample code.
var Performance= require('performance-time');
var perf = new Performance({repeat:100000000});

// Add the task-functions
perf.addTask(swap1, swap2);

// Run the all added tasks and print report about the run.
console.log('Way1: ', perf.run());
	//Way1:  [ { task: 'swap1', repeat: 100000000, time: 60 },
	//		{ task: 'swap2', repeat: 100000000, time: 470 } ]

// Or
perf.run({repeat:300});		// 'repeat' only apply to this run.
console.log('Way2: ', perf.result());
	//Way2:  [ { task: 'swap1', repeat: 300, time: 0 },
	//		{ task: 'swap2', repeat: 300, time: 0 } ]


// Clear all tasks added on perf.
perf.clearTask();


/* --- Tasks */
// Traditional swap which uses three variables
function swap1() {
	var a=1, b=2;
	var temp = a;

	a=b;
	b=temp;

	if(a !== 2 || b !== 1)
		console.error('swap fail: ', a, b);
}

// Swap which only uses two variables
function swap2() {
	var a = 1, b = 2;

	a = a ^ b;
	b = a ^ b;
	a = a ^ b;

	if(a !== 2 || b !== 1)
		console.error('swap fail: ', a, b);
}