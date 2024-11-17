// Handle User Details Submission
document.getElementById('submit-order').addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const cake = document.getElementById('cake').value;
    const quantity = document.getElementById('quantity').value;
    const message = document.getElementById('message').value;

    if (name && email && cake && quantity > 0) {
        const summary = `
            Thank you, ${name}!
            Your order for ${quantity} ${cake} cake(s) has been received.
            We'll contact you at ${email}. ${message ? `Note: ${message}` : ''}
        `;
        document.getElementById('order-summary').textContent = summary;
    } else {
        alert('Please fill out all required fields.');
    }
});

// Interactive Quiz with Multiple Questions
const quizQuestions = [
    {
        question: "What is your favorite type of cake?",
        options: ["Chocolate", "Vanilla", "Red Velvet", "Cheesecake"],
    },
    {
        question: "Which bakery product do you like the most?",
        options: ["Croissant", "Bagel", "Muffin", "Donut"],
    },
    {
        question: "Do you prefer sweet or savory bakery items?",
        options: ["Sweet", "Savory"],
    },
    {
        question: "How often do you order cakes?",
        options: ["Occasionally", "Monthly", "Weekly", "Rarely"],
    },
];
let currentQuestion = 0;
const answers = [];

function loadQuestion() {
    const questionData = quizQuestions[currentQuestion];
    const questionEl = document.getElementById('quiz-question');
    const optionsEl = document.getElementById('quiz-options');
    
    questionEl.textContent = questionData.question;
    optionsEl.innerHTML = ''; // Clear previous options
    
    questionData.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.addEventListener('click', () => {
            answers.push(option);
            currentQuestion++;
            if (currentQuestion < quizQuestions.length) {
                loadQuestion();
            } else {
                showResults();
            }
        });
        optionsEl.appendChild(button);
    });
    
    document.getElementById('quiz-progress').textContent =
        `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
}

function showResults() {
    const resultText = `You answered: ${answers.join(', ')}. Thanks for taking the quiz!`;
    document.getElementById('quiz-result').textContent = resultText;
    document.getElementById('quiz-container').style.display = 'none';
}

loadQuestion(); // Start the quiz

// API Fetch for Recipe Ideas
document.getElementById('fetch-recipe').addEventListener('click', () => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=cake')
        .then(response => response.json())
        .then(data => {
            const randomIndex = Math.floor(Math.random() * data.meals.length);
            const recipe = data.meals[randomIndex];
            document.getElementById('recipe-display').textContent =
                `Try making ${recipe.strMeal}! Find the recipe here: ${recipe.strSource || "No source available"}`;
        })
        .catch(error => {
            document.getElementById('recipe-display').textContent = "Failed to fetch a recipe.";
            console.error("Error fetching recipe:", error);
        });
});
