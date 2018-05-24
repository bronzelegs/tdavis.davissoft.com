/**
 * Created by tdavis on 1/29/18.
 */
// experiments.js --

'use strict';

let $choices = $('.choices');
let $correct = $('.isCorrect');
let $result = $('#choiceis');

let wrongAns = Rx.Observable.fromEvent($choices, 'click');
let goodAns = Rx.Observable.fromEvent($correct, 'click');
let wrongs = wrongAns.subscribe(e => $result.text('That is incorrect!').addClass('incorrect').removeClass('correct'));
let rights = goodAns.subscribe(e => $result.text('That is correct!').addClass('correct').removeClass('incorrect'));


(function () {
	console.log('tests.js version 3');
	$('#sums-code-data').load('sums.txt');
	$('#inh-code-data').load('inheritance.txt');
	$('#weather-code-data').load('weather.txt');
	$('#rev-str-data').load('revstr.txt');
	$('#functional-data').load('functional.txt');
	$('#mensa-data').load('mensatest.txt');
	console.log('test functions loaded');
})();

function sumTo100(stuff) {
	let result = [];
	let inner, a, b;
	while (stuff.length) {
		a = stuff[0];
		for (inner = 1; inner < stuff.length;) {
			b = stuff[inner];
			if ((a + b) === 100) {
				result.push([a, b]);
				break;    // sorted, skip the rest of the list for this iteration
			}
			if ((a + b) > 100) {
				break;    // sorted, skip the rest of the list for this iteration
			}
			while (b === stuff[inner]) {
				inner++;
			}
		}
		while (a === stuff[0]) {
			stuff.shift();
		}
	}
	return result;
}

function Person(first, middle, last, motto) {
	this.firstName = first;
	this.middleName = middle;
	this.lastName = last;
	this.motto = motto;
}

Person.prototype.about = function () {
	return 'Hi, my name is ' + this.firstName + ' ' + this.middleName + ' ' + this.lastName + ' my motto is: ' + this.motto;
};

Person.prototype.toString = function () {
	return this.about();
};

function Job(jobName, desc) {
	this.applyingForJob = jobName;
	this.jobDesc = desc;
}

Job.prototype.about = function () {
	return this.applyingForJob + ': ' + this.jobDesc;
};

Job.prototype.toString = function () {
	return this.about();
};

function Candidate(person, theJob, desc) {
	this.person = person;
	this.job = theJob;
	this.description = desc;
}

Candidate.prototype.about = function () {
	return this.person.about() + ' and I am appying for ' + this.job.about() + ' ' + this.description;
};

Candidate.prototype.toString = function () {
	return this.about();
};


let description = 'this is an example of prototypical inheritance';
let me = new Person('Terrance', 'Alan', 'Davis', 'If I ever grow up I want to be just like me');
let job = new Job('Very special person', 'el Cid');
let candidate = new Candidate(me, job, description);


$('#runZero').click(function () {
	//alert( 'Handler 1 for .click() called.' );
	let inputString = $('#inputString').val();
	let results = reverseString(inputString);
	
	$('#resultZero').text('Results: ' + results);
});

function reverseString(str) {
	return str.split('').reverse().join('');
	
}

$('#runFunctional').click(function () {

// do you understand functional programming?

	let b = 'this is a test';
	
	
	let result = b.split(' ').map((s) => {
		return s.toUpperCase()
	}).join(' ');

	$('#resultFunctional').text( 'Results: ' + result + '');
});

$('#runOne').click(function () {
	let nums = [1, 99, 70, 70, 30, 50, 49, 51, 30, 99, 1, 99, 50, 49, 51, 30, 99, 1, 99, 63, 37, 50, 49, 51, 30, 99];
	let snums = nums.sort();        // sort to improve efficiency
	let list = sumTo100(snums);     // process the sorted list
	
	let i = 0;                      // display the list of pairs
	let results = 'pairs : ';
	for (i = 0; i < list.length; i++) {
		results += list[i] + ' ';
	}
	$('#resultOne').text('results ' + results);
});

$('#runTwo').click(function () {
	//alert( 'Handler 2 for .click() called.' );
	$('#resultTwo').text('result ' + candidate.toString());
});

$('#runFunctional').click(function () {
	//alert( 'Handler 2 for .click() called.' );
	$('#resultTwo').text('result ' + candidate.toString());
});


// oldstyle

let url = 'http://api.wunderground.com/api/80dca8463834e03c/conditions/q/CA/Los_Angeles.json';

$('#runThree').click(function () {
	$.ajax(url)
		.done(function (json) {
			console.log('JSON Data: ' + json);
			$('#resultThree').text('result ' + JSON.stringify(json));
		})
		.fail(function (jqxhr, textStatus, error) {
			let err = textStatus + ', ' + error;
			console.log('Request Failed: ' + err);
		});
});


//easier to read
$('#parsedWeather').click(function () {
	getByFetch(url);
	//$('#parsedResult').append(' these are broken ');
});


//using fetch, works on modern browsers

let myHeaders = new Headers();
let myInit = {
	method: 'GET',
	headers: myHeaders,
	mode: 'cors',
	cache: 'default'
};

let myRequest = new Request(url, myInit);

function getByFetch(url) {
	fetch(myRequest).then(function (response) {
		return response.json();
	}).then(function (json) {
		$('#parsedResult').text('partially parsed ');
		console.log('success');
		let weatherData = json['current_observation'];
		for (let key in weatherData) {
			$('#parsedResult').append(' ' + key + ' ' + weatherData[key]);
		}
	});
}
