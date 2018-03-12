# performance-time
 performance-time measures the execution time of the code you want to check.

## Installation
```sh
npm install performance-time
```

## How to use
```javascript
// ES5 version sample code.
var Performance= require('performance-time');
var perf = new Performance({repeat:100000000});

perf.addTask(swap1, swap2);

// Report about run
console.log('Way1: ', perf.run());
    // printed
    //Way1:  [ { task: 'swap1', repeat: 100000000, time: 59 },
    //  { task: 'swap2', repeat: 100000000, time: 454 } ]

// Or
perf.run({repeat:300});
console.log('Way2: ', perf.result());
    //printed
    //Way2:  [ { task: 'swap1', repeat: 300, time: 0 },
    //  { task: 'swap2', repeat: 300, time: 0 } ]


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
```