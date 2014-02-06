(function() {
	var sections = [{
		section: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. </p><p>Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. </p><p>Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. </p><p>Vestibulum sapien. Proin quam. Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus. </p><p>Ut ultrices ultrices enim. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. Nulla facilisi. Integer lacinia sollicitudin massa. Cras metus. Sed aliquet risus a tortor. Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue. Proin sodales libero eget ante. Nulla quam. </p>',
		questions: [0,1,2]
	}, {
		section: 'Multiply!',
		questions: [3,4]
	}];

	var questions = [{
		question: 'What is 1+1?',
		choices: [1, 2, 3, 4],
		correctAnswer: 1
	}, {
		question: 'What is 2+2',
		choices: [0, 2, 4, 6],
		correctAnswer: 2
	}, {
		question: 'What is 3+3',
		choices: [3, 4, 5, 6],
		correctAnswer: 3
	}, {
		question: 'What is 4*4',
		choices: [0, 2, 16, 36],
		correctAnswer: 2
	}, {
		question: 'What is 5*5',
		choices: [0, 25, 50, 100],
		correctAnswer: 1
	}];

	var sectionCounter = 0;
	var questionCounter = 0;
	var selections = [];
	var divSection = $('.left');
	var divQuestion = $('.right');

	displayNext();

	$('#next').on('click', function(e) {
		e.preventDefault();

		choose();

		sectionCounter++;
		displayNext();
	});

	$('#prev').on('click', function(e) {
		e.preventDefault();

		choose();

		sectionCounter--;
		displayNext();
	});

	$('#start').on('click', function(e) {
		e.preventDefault();
		sectionCounter = 0;
		questionCounter = 0;
		selections = [];
		displayNext();
		$('#start').hide();
	});	

	$('.button').on('mouseenter', function(){
		$(this).addClass('active');
	});

	$('.button').on('mouseleave', function(){
		$(this).removeClass('active');
	});

	function createElements(index) {
		var sElement = divSection; //$('<div>', {id: 'section'});
		var qElements = divQuestion; //$('<div>', {id: 'question'});
		var aOut = [];

		var sectionHeader = $('<h2>Section ' + (index + 1) + ':</h2>');
		sElement.append(sectionHeader);

		var section = $('<p>').append(sections[index].section);
		sElement.append(section);

		for (var i = 0; i< sections[index].questions.length; i++) {
			var n = sections[index].questions[i];
			var qElement = $('<div>', {class: 'question'});

			var questionHeader = $('<h2>Question ' + (n+1) + ':</h2>');
			qElement.append(questionHeader);

			var question = $('<p>').append(questions[n].question);
			qElement.append(question);

			var radioButtons = createRadios(n);
			qElement.append(radioButtons);

			qElements.append(qElement);
		}

		aOut.push(sElement);
		aOut.push(qElements);

		return aOut;
	};

	function createRadios(index) {
		var radioList = $('<ul>');
		var item;
		var input = '';
		for (var i = 0; i < questions[index].choices.length; i++) {
			item = $('<li>');
			input = '<input type="radio" name="answer' + index +'" value=' + i + ' />';
			input += questions[index].choices[i];
			item.append(input);
			radioList.append(item);
		}
		return radioList;
	};

	function choose() {
		qS = sections[sectionCounter].questions;
		for (var i = 0; i < qS.length; i++) {
			var n = qS[i];
			selections[n] = +$('input[name="answer' + n +'"]:checked').val();
			// alert(selections[n]);
		}
	}

	function displayNext() {
		$('.left').empty();
		$('.right').empty();

		if(sectionCounter < sections.length){
			var elements = createElements(sectionCounter);
			divSection.append(elements[0]);
			divQuestion.append(elements[1]);

			qS = sections[sectionCounter].questions;
			for(var i = 0; i < qS.length; i++){
				var n = qS[i];
				if(!(isNaN(selections[n]))){
					var radioElement = $('input:radio[name="answer'+n+'"]');
					if(radioElement.is(':checked') === false) {
						radioElement.filter('[value='+selections[n]+']').prop('checked', true);
					}
				}
			}

			$('#start').hide();
			if(sectionCounter === 0){
				$('#prev').hide();
				$('#next').show();
			} else {
				$('#prev').show();
			}	
		} else {
			var scoreElem = displayScore();
			divQuestion.append(scoreElem).fadeIn();
			$('#prev').hide();
			$('#next').hide();
		}
	};

	function displayScore() {
		var score = $('<p>', {id: 'score'});

		var numCorrect = 0;
		for (var i = 0; i < selections.length; i++) {
			if (selections[i] === questions[i].correctAnswer) {
				numCorrect++;
			}
		}

		score.append('You got ' + numCorrect + ' questions out of ' + questions.length + ' right!!!');
		return score;
	};

})();
