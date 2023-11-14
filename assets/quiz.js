// assigns elements of the quiz DOM
var startButton = document.getElementById('start-btn');
var questionContainerElement = document.getElementById('question-container');
var questionElement = document.getElementById('question');
var answerButtonsElement = document.getElementById('answer-buttons');
var timerElement = document.getElementById('quiz-timer');
var endScreen = document.getElementById('end-screen');
var saveButton = document.getElementById('save-btn');
var initialsInput = document.getElementById('initials');

// Declare variables to allow shuffled questions and timer function
var shuffledQuestions, currentQuestionIndex;
// sets starting time
var quizTimer = 60; 
// is used to call timer in html
var timerId; 

// sets object of Q&As
var questions = [
    { 
        question: 'Commonly used data types do NOT include:',
        answers: [
            { text: 'strings', correct: false},
            { text: 'booleans', correct: false},
            { text: 'alerts', correct: true},
            { text: 'numbers', correct: false}
        ]
    },
    {
        question: 'The condition in an if/else statement is enclosed with BLANKIDDY BLANK.',
        answers: [
            { text: 'quotes', correct: false},
            { text: 'curly brackets', correct: false},
            { text: 'parenthesis', correct: true},
            { text: 'square brackets', correct: false}
        ]
    },
    {
        question: 'how awesome is this quiz Ive made and how high a score should I get?',
        answers: [
            { text: 'heckin alright, I guess, B-', correct: false},
            { text: 'hell yeah, it rules, A-', correct: false},
            { text: 'epic fail, C-', correct: false},
            { text: '1000%!!! you rule!', correct: true}
        ]
    },
    {
        question: 'Arrays in JavaScript can be used to store BLANKIDDY BLANK.',
        answers: [
            { text: 'numbers and strings', correct: false},
            { text: 'other arrays', correct: false},
            { text: 'booleans', correct: false},
            { text: 'all of the above', correct: true}
        ]
    },
    {
        question: 'String values must be enclosed within BLANKIDDY BLANK.',
        answers: [
            { text: 'commas', correct: false},
            { text: 'curly brackets', correct: false},
            { text: 'quotes', correct: true},
            { text: 'parenthesis', correct: false}
        ]
    },
    {
        question: 'A very useful tool used during development and debugging for printing content to the debugger is:',
        answers: [
            { text: 'JavaScript', correct: false},
            { text: 'terminal/bash', correct: false},
            { text: 'for loops', correct: false},
            { text: 'console.log', correct: true}
        ]
    }
    ];

// adds the event listeners to the buttons which start the game and saves the score (knocks on wood)
startButton.addEventListener('click', startGame);
saveButton.addEventListener('click', saveScore);

// function that starts the game
function startGame() {
    startButton.classList.add('hide');
    shuffledQuestions = questions.sort(function() { return Math.random() - .5; });
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion();
    startTimer();
}

// function to move to next question
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// function to display a question and its answer
function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(function(answer) {
        var button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}
// function to clear the previous questions answer buttons
function resetState() {
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}
// function to allow selection of answer
function selectAnswer(e) {
    var selectedButton = e.target;
    var correct = selectedButton.dataset.correct;
    if (!correct) {
        quizTimer -= 10;
    }
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++;
        setNextQuestion();
    } else {
        endGame();
    }
}
// functions to start and update timer
function startTimer() {
    timerId = setInterval(updateTimer, 1000);
}

function updateTimer() {
    quizTimer--;
    timerElement.innerText = formatTime(quizTimer);

    if (quizTimer <= 0) {
        clearInterval(timerId);
        endGame();
    }
}
// function that determines time format
function formatTime (time) {
    var minutes = Math.floor(time / 60);
    var seconds = time % 60;
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}
// functions that end game and allow saving of score
function endGame() {
    clearInterval(timerId);
    questionContainerElement.classList.add('hide');
    endScreen.classList.remove('hide');
    timerElement.classList.add('hide');
}

function saveScore() {
    var initials = initialsInput.value;
    var score = { initials: initials, score: quizTimer };
    localStorage.setItem('quizScore', JSON.stringify(score));
}