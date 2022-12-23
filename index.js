var $start = document.querySelector('#start')
var $game = document.querySelector('#game')
var $time = document.querySelector('#time')
var $timeHeader = document.querySelector('#time-header')
var $resultHeader = document.querySelector('#result-header')
var $result = document.querySelector('#result')
var $gameTime = document.querySelector('#game-time')

var isGameStarted = false
var score = 0
var color = [
	'red',
	'blue',
	'orange',
	'yellow', 
	'black'
]

function startGame() {
	isGameStarted = true
	show($timeHeader)
	hide($resultHeader)
	$start.classList.add('hide')
	$game.style.backgroundColor = '#fff'
	$gameTime.setAttribute('disabled', true)
	
	var time = parseFloat($gameTime.value)

	var interval = setInterval(function() {
		if(time <= 0) {
			clearInterval(interval)
			endGame()
		}else {
			$time.textContent = time.toFixed(1)
			time = time - 0.1
		}
	}, 100)
	
	renderBox()
}


function endGame() {
	isGameStarted = false
	hide($timeHeader)
	show($resultHeader)
	$result.textContent = score
	show($start)
	$game.style.backgroundColor = '#ccc'
	$game.innerHTML = ''
	$gameTime.removeAttribute('disabled')
}

function renderBox(event) {
	$game.innerHTML = ''

	var box = document.createElement('div')
	var gameSize = $game.getBoundingClientRect()
	var boxSize = randomSize(30, 100)
	var maxHeight = gameSize.height - boxSize
	var maxWidth = gameSize.width - boxSize

	box.style.position = 'absolute'
	box.style.top =  randomSize(0, maxHeight) + 'px'
	box.style.left =  randomSize(0, maxWidth) + 'px'
	box.style.backgroundColor = color[randomSize(0, color.length)]
	box.style.height = box.style.width = boxSize + 'px'
	box.style.cursor = 'pointer'
	
	
	box.setAttribute('data-box', true)

	$game.insertAdjacentElement('afterbegin', box)
}


function randomSize(min, max) {
	return Math.floor(Math.random() * (max - min) + min)
}

function handleBoxClick(event) {
	if(!isGameStarted) {
		return
	}
	if(event.target.dataset.box) {
		score++
		renderBox()
	}
}

function setGameTime(event) {
	var time = +$gameTime.value
	$time.textContent = time.toFixed(1)
	show($timeHeader)
	hide($resultHeader)

}

function show($el) {
	$el.classList.remove('hide')
}
function hide($el) {
	$el.classList.add('hide')
}



start.addEventListener('click', startGame)
$game.addEventListener('click', handleBoxClick)
$gameTime.addEventListener('input', setGameTime)