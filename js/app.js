'use strict';
console.log('pizza js connected');
/**
Create an array of pizza objects, have a file for them.
dont repeat the correct picture
randomize the pizza image placement
track a score - score should increment by 1 when the user guess the correct image.
TODO a way to track how many attempts they've used - increment attempt in the event handler when any image is clicked
TODO some way to play again without having to refresh
TODO a way to stop the event listener from doing its thing when the num of attempts reaches a maximum number
TODO when they reach the max, show a chart with the score and numAttempts

Persistence of data
When we persist data, we need to be able to do four things with it:
create the data - setItem in localStorage
retrieve it
update it - setItem in localStorage
delete it
*/

//Global variables
const pizzaNames = [
  'Papa-Vitos-Thin',
  'Chicago-Deep-Dish',
  'Brick-Oven-Pizza',
  'Calzone',
  'Chicago-Pizza-and-Oven-Grinder',
  'Detroit-Style',
  'New-York-Thin',
  'Shot-Gun-Dans',
];

let correctPizza = '';
let wrongPizza = '';
let attempts = 0;
let maxAttempts = 10;

const pizzaNameElement = document.getElementById('pizzaName');
const scoreElement = document.getElementById('score');
const attemptsElement = document.getElementById('attempts');
const pizzaImagesParent = document.getElementById('pizzaImages');
const responseElement = document.getElementById('response');

//main function to run the game
function setUp() {
  //1
  correctPizza = generateRandomPizza();
  wrongPizza = generateRandomPizza();
  //2
  updatePizzaName(correctPizza);
  //3
  if (attempts) {
    pizzaImagesParent.removeChild(pizzaImagesParent.lastChild);
    pizzaImagesParent.removeChild(pizzaImagesParent.lastChild);
  }
  //4 render the new pizza
  renderPizzaImage(correctPizza);
  renderPizzaImage(wrongPizza);
  //update score
  updateScoreElement();
  //update attempts
  updateAttempts();
}

setUp();

function generateRandomPizza() {
  const index = Math.floor(Math.random() * pizzaNames.length);
  // console.log(pizzaNames[index]);
  return pizzaNames[index];
}
function updatePizzaName(pizzaName) {
  pizzaNameElement.textContent = pizzaName;
}

function renderPizzaImage(pizzaName) {
  const img = document.createElement('img');
  img.setAttribute('src', 'images/' + pizzaName + '.jpg');
  img.setAttribute('id', pizzaName);
  pizzaImagesParent.append(img);
}

function renderResponse(response) {
  responseElement.textContent = response;
}

//update pizza name
//render pizza images
//event listener to render out our respone.

pizzaImagesParent.addEventListener('click', function (event) {
  if (attempts === maxAttempts) {
    return;
  }
  console.log(event.target);
  const answer = event.target.getAttribute('id');
  console.log('answer!!!',answer);
  if (answer === correctPizza) {
    incrementScore();
    renderResponse('whoo hoo, ZA you right you know your pizza!');
  } else {
    renderResponse('no thats not the correct pizza name for the image.');
  }
  attempts++;
  setUp();
});

function incrementScore() {
  let score = getScore();
  score++;
  createOrUpdateScore(score);
  updateScoreElement();
}

function getScore() {
  let score = localStorage.getItem('scoreValue');
  if (score !== null) {
    score = parseInt(score);
  }
  return score;
}


function createOrUpdateScore(scoreValue) {
  scoreValue = JSON.stringify(scoreValue);
  localStorage.setItem('scoreValue', scoreValue);
  const score = localStorage.getItem('scoreValue');
  return score;
}



function updateScoreElement() {
  scoreElement.textContent = getScore() || 0;
}
function updateAttempts() {
  attemptsElement.textContent = maxAttempts - attempts;
}

