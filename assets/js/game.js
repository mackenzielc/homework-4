var question = document.querySelector('#question');
var choices = Array.from(document.querySelectorAll('.choice-text'));
// var progressText = document.querySelector('#progressText');
var scoreText = document.querySelector('#score');
// var progressBarFull = document.querySelector('#progressBarFull');
var timerElement = document.querySelector(".timer-count")

var currentQuestion = {};
var acceptingAnswer = true;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];
var timer;
var timeCount;

let questions = [
    {
        question: 'JavaScript is a ____ -side language.',
        choice1: 'Server',
        choice2: 'Client',
        choice3: 'Both',
        choice4: 'None',
        answer: 3,
    },
    {
        question: 'If you want to check if x and y are equal in type and value which of the below statements should you use?',
        choice1: 'x===y',
        choice2: 'x!==y',
        choice3: 'x==y',
        choice4: 'x=y',
        answer: 1,
    },
    {
        question: 'Which of the following will write the message “Hello JavaScript!” in an alert box?',
        choice1: 'alert(“Hello JavaScript!”)',
        choice2: 'alertBox(“Hello JavaScript!”)',
        choice3: 'alert(Hello JavaScript!”)',
        choice4: 'msgAlert(Hello JavaScript!)',
        answer: 1,
    },
    {
        question: 'What is the function of Array object that adds and/or removes elements from an array?',
        choice1: 'sort()',
        choice2: 'unshift()',
        choice3: 'splice()',
        choice4: 'add()',
        answer: 3,
    }

]

var SCORE_POINTS = 100
var MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    timerCount = 30
    availableQuestions = [...questions]
    getNewQuestion()
    startTimer()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    // progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    // progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    var questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        var number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswer = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswer) return

        acceptingAnswer = false
        var selectedChoice = e.target
        var selectedAnswer = selectedChoice.dataset['number']

        var classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        if(classToApply === 'incorrect') {
            timerCount = timerCount - 5
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)

    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

function startTimer () {
    timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = timerCount;
        // if(timerCount >= 0) {
        //     if ((availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) && timerCount > 0) {
        //         localStorage.setItem('mostRecentScore', score)
        
        //         return window.location.assign('end.html') 
        //     }
            
        // }

        if (timerCount === 0) {
            clearInterval(timer);
            localStorage.setItem('mostRecentScore', score)
            return window.location.assign('end.html') 
        }
    }, 1000)
}

startGame()
