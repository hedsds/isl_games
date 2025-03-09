let currentCharacter = "";

function nextCharacter() {
    fetch("/get_character")
        .then(response => response.json())
        .then(data => {
            currentCharacter = data.character;
            document.getElementById("character-image").src = data.image;
            document.getElementById("result").innerText = "";
        });
}

function checkCharacter() {
    let userInput = document.getElementById("user-input").value;
    fetch("/check_input", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: userInput, character: currentCharacter })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("result").innerText = data.message;
    });
}

function newMathProblem() {
    fetch("/get_math_problem")
        .then(response => response.json())
        .then(data => {
            document.getElementById("num1").innerText = data.num1;
            document.getElementById("operation").innerText = data.operation;
            document.getElementById("num2").innerText = data.num2;
            document.getElementById("math-answer").value = "";
            document.getElementById("math-result").innerText = "";
            window.solution = data.solution; // Store the correct answer
        });
}

function checkMathAnswer() {
    let userAnswer = document.getElementById("math-answer").value;
    fetch("/check_answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer: userAnswer, solution: window.solution })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("math-result").innerText = data.message;
    });
}

// Initialize the game
nextCharacter();
newMathProblem();
