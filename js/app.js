
const questionNumber = document.querySelector(".question-number")
const questionText = document.querySelector(".question-text")
const optionCotainer = document.querySelector(".option-container")
const answersIndicatorContainer = document.querySelector(".answers-indicator")
const homeBox = document.querySelector(".home-box")
const quizBox = document.querySelector(".quiz-box")
const resultBox = document.querySelector(".result-box")
// const resultBtn = document.getElementById('resultBtn')

let questionCounter = 0;
let currentQuestion;
let availableQuestions = []
let availableOptions = []
let correctAnswers = 0
let attempt = 0


// push the question into availableQuestions Array
function setAvailableQuestions() {
    const totalQuestion = quiz.length;

    for (let i=0; i<totalQuestion; i++){
        availableQuestions.push(quiz[i])
    }
}

// set question number and question and options
function getNewQuestion(){
    //set question number
    questionNumber.innerHTML = `Question ${questionCounter+1} of ${quiz.length}`

    // set question text 
    // get random question
    const questionIndex = availableQuestions[Math.floor(Math.random()*availableQuestions.length)]
    currentQuestion = questionIndex
    questionText.innerHTML = currentQuestion.q

    // get the position of questionIndex from the availableQuestions Array
    const index1 = availableQuestions.indexOf(questionIndex)
    
    // remove the questionIndex from availableQuestion Array, so that the question does not repeat
    availableQuestions.splice(index1,1)
    
    // get options 
    // get the length of options 
    const optionLen = currentQuestion.options.length
    // push options into availableOptions Array
    for (let i=0; i<optionLen; i++){
        availableOptions.push(i)
    }

    optionCotainer.innerHTML = ''
    let animationDelay = 0.2

    // create options in html
    for (let i=0; i<optionLen; i++){
        // random option 
        const optionIndex = availableOptions[Math.floor(Math.random()*availableOptions.length)]
        // get the position of optionIndex from the availableOptions Array
        const index2 = availableOptions.indexOf(optionIndex)
        // remove the optionIndex from the availableOptions Array so that option does not repeat
        availableOptions.splice(index2,1)
        const option = document.createElement("div")
        option.innerHTML = currentQuestion.options[optionIndex]
        option.id = optionIndex
        option.style.animationDelay = animationDelay + 's'
        animationDelay = animationDelay + 0.15
        option.className = "option"
        optionCotainer.appendChild(option)
        option.setAttribute("onclick", "getResult(this)")
    }

    // console.log(availableOptions)
    questionCounter++
}

// get the result of current attempt question
function getResult(element){
    const id = parseInt(element.id)

    //get the answer by comparing the id of clicked option
    if (id === currentQuestion.answer) {
        // set the green color to the correct option
        element.classList.add("correct")
        //add the indicator to correct mark
        updateAnswerIndex("correct")
        correctAnswers++
    }
    else {
        // set the red color to the correct option
        element.classList.add("wrong")
        //add the indicator to wrong mark
        updateAnswerIndex("wrong")

        // if the answer is incorect the show the correct option by adding green color the correct option
        const optionLen = optionCotainer.children.length
        for(let i=0; i<optionLen; i++){
            if(parseInt(optionCotainer.children[i].id) === currentQuestion.answer){
                optionCotainer.children[i].classList.add("correct")
            }
        }
    }
    attempt++
    unclikableOptions();
}

 // make all the options unclikable once the user select a option (RESTRICKT THE USER TO CHANGE OPTION AGAIN)
 function unclikableOptions() {
    const optionLen = optionCotainer.children.length
    for (i=0; i<optionLen; i++){
        optionCotainer.children[i].classList.add("already-answered")
    }
}

function answersIndicator() {
    answersIndicatorContainer.innerHTML = ''
    const totalQuestion = quiz.length
    for (let i=0; i<totalQuestion; i++){
        const indicator = document.createElement("div")
        answersIndicatorContainer.appendChild(indicator)
    }
}

 function updateAnswerIndex(markType) {
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType)
 }

 function next(){
    if (questionCounter === quiz.length){
        quizOver()
    }else {
        getNewQuestion()
    }}

    function quizOver() {
        // hide quiz Box
        quizBox.classList.add("hide")
        //show result box
        resultBox.classList.remove("hide")
        
        quizResult()
    }

    function quizResult(){
        resultBox.querySelector(".total-question").innerHTML = quiz.length
        resultBox.querySelector(".total-attempt").innerHTML = attempt
        resultBox.querySelector(".total-correct").innerHTML = correctAnswers
        resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers
        const percentage = (correctAnswers / quiz.length)*100
        resultBox.querySelector(".total-percentage").innerHTML = percentage.toFixed(1) + "%"
        resultBox.querySelector(".total-score").innerHTML = correctAnswers +" / " + quiz.length
    }

    function resetQuiz() {
         questionCounter = 0;
         correctAnswers = 0
         attempt = 0
    }

    function tryAgainQuiz(){
        //hide the resultQuiz
        resultBox.classList.add("hide")
        //show quizBox
        quizBox.classList.remove("hide")

        resetQuiz()
        startQuiz()
    }

    function goToHome(){
        //hide resultBox
        resultBox.classList.add("hide")
        //show home Box
        homeBox.classList.remove("hide")

        resetQuiz()
    }


    ///  #### STARTING POINT ####

  function startQuiz(){
      //hide home box
      homeBox.classList.add("hide")
      //show quiz Box
      quizBox.classList.remove("hide")

    // first we will set all questions in availableQuestions Array
    setAvailableQuestions()
    /// second we will call getnewQuestion() functions
    getNewQuestion()
    // to create indicator for answers
    answersIndicator()
}

window.onload = function () {
    homeBox.querySelector(".total-question").innerHTML = quiz.length
}