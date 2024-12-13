// Array containing quiz questions, each with a question string and multiple answers
// Each answer object has a 'text' property and a 'correct' property indicating if it's the right answer

const questions = [
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Shark", correct: false},
            { text: "Blue Whale", correct: true},
            { text: "Elephant", correct: false},
            { text: "Girraffe", correct: false},
        ]
    },
    {
        question: "Which is the smallest country in the world?",
        answers: [
            { text: "Vatican City", correct: true},
            { text: "Bhutan", correct: false},
            { text: "Nepal", correct: false},
            { text: "Bangladesh", correct: false},
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            { text: "Kalahari", correct: false},
            { text: "Gobi", correct: false},
            { text: "Sahara", correct: false},
            { text: "Antarctica", correct: true},
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            { text: "Asia", correct: false},
            { text: "Australia", correct: true},
            { text: "Arctic", correct: false},
            { text: "Africa", correct: false},
        ]
    }
];

// DOM elements for displaying the question, answer buttons, and next button
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

// Variables to keep track of the current question index and score
let currentQuestionIndex = 0;
let score = 0;

// Function to start the quiz, resetting the index and score and displaying the first question
function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"; // Reset the next button text
    showQuestion(); // Reset the next button text
}

// Function to display a question and its answers
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex]; // Get the current question object
    let questionNo = currentQuestionIndex + 1;  // Question number (1-based index)
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;  // Display question text


    // Create a button for each answer and append it to the answerButtons container
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button"); // Create a new button element
        button.innerHTML = answer.text; // Set the button text to the answer text
        button.classList.add("btn"); // Add a CSS class for styling
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

// Function to clear the previous state (remove answer buttons and hide the next button)
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

// Function to handle answer selection
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
        }else{
            selectedBtn.classList.add("incorrect");
        }

        // Highlight all correct answers and disable all buttons
        Array.from(answerButtons.children).forEach(button => {
            if(button.dataset.correct === "true"){
                button.classList.add("correct");
            }
            button.disabled = true;
        });
        nextButton.style.display = "block";
    }

    // Function to display the final score
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.innerHTML = "block";
}

// Function to handle the click of the next button
    function handleNextButton() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        }else{
            showScore();
        }
    }

    // Event listener for the next button click
    nextButton.addEventListener("click", ()=>{
        if(currentQuestionIndex < questions.length){
            handleNextButton();  // Handle next question
        }else{
            startQuiz(); // Restart the quiz if it is finished
        }
    });

    // Start the quiz when the script is first loaded
startQuiz();