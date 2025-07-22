var cardDeckEl = document.getElementById('source'); //Source cards
var dropout = document.getElementById('dropout');
const $btnClose = document.querySelector(".btn-close")
const $congratulation = document.querySelector(".congratulation");

$btnClose.addEventListener("click", () => {
	$congratulation.style.display = "none";
});

dragObj = new DragEvents();
dealer = new CardDealer();
var limitHeight, cardDeck;

const $btnGear = document.querySelector(".btn-gear")
const $menu = document.querySelector(".menu")
//DOM listeners
$btnGear.addEventListener("click", () => {
  $menu.classList.toggle("menu-show")
})

document.forms.startGame.onsubmit = function(e) {
	cardDeck = new CardDeck(); 
	cardDeck.getValueFromRadioButton(this.radioBtn);
	cardDeck.init();
	cardDeck.create();		

	dealer = new CardDealer();
	dealer.shuffle(cardDeck.getCards());
	dealer.reUpload(cardDeck.getCards()); 
	dealer.delivery(44,false,true);	
	dealer.delivery(10,true,true);

	this.style.display = 'none';
	saveState(); // 👈 here
	return false;
}

cardDeckEl.onclick = function(e) {
	if (this.lastElementChild != e.target)
		return;

	var empty = dealer.checkEmpty(document.querySelectorAll('.column'));
	if (empty) {
		var msg = 'Cannot send cards to empty column';
		dealer.showMessage(msg,e.pageX-320,e.pageY-80);
		return;
	}

	dealer.delivery(10, true, true);

	var cols = document.querySelectorAll('.column');
	limitHeight = dealer.getLimitHeight();
	for (var i = 0; i < cols.length; i++) {
		dealer.setSuitedHeight(cols[i], limitHeight);
	}

	// 💾 save state after deck click
	saveState();

	// 🚩 record the position of this deck click
	deckMarkerIndex = historyStack.length - 1;

	console.log("Deck clicked → deckMarkerIndex set to", deckMarkerIndex);
};


// //On Restart Game Button Click
// document.querySelector('.btn-new').onclick = function(e) {
// 	if (!cardDeck) return;
// 	if (dropout.children.length == 104) 
// 		dealer.hideCongratulation();

// 	dropout.innerHTML = '';
// 	var cols = document.querySelectorAll('.column');
// 	for (var i = 0; i < cols.length; i++) {
// 		cols[i].innerHTML = '';
// 	}
// 	dealer.shuffle(cardDeck.getCards());
// 	dealer.reUpload(cardDeck.getCards());
// 	dealer.delivery(44,false,true);
// 	dealer.delivery(10, true,true);
// };

document.addEventListener('touchstart', function(e) {
	if (e.targetTouches[0].target != e.target) return;
	dragObj.startDrag(e);
});

document.addEventListener('mousedown', function(e) {
	if (e.which != 1){
		return;   //e.which = returns numeric keycode for the key pressed or mouse pressed. numeric keycode for mouse pressed = 1
	} 
	dragObj.startDrag(e);
});

document.addEventListener('touchmove', dragObj.moveDrag);
document.addEventListener('mousemove', dragObj.moveDrag);

document.addEventListener('touchend', dragObj.endDrag);
document.addEventListener('mouseup', dragObj.endDrag);  


//////////////////////////////////// undo function ////////////////////////
let historyStack = [];
let deckMarkerIndex = -1;  // 👈 index of last deck click

function saveState() {
	console.log('Called save State')
	const columns = Array.from(document.querySelectorAll('.column')).map(c => c.innerHTML);
	const source = document.getElementById('source').innerHTML;
	const dropout = document.getElementById('dropout').innerHTML;
	const score = document.getElementById('score').textContent;

	historyStack.push({ columns, source, dropout, score });
}

document.getElementById('btn-undo').addEventListener('click', () => {
	console.log(historyStack, historyStack.length);

	if (historyStack.length <= 4) {
		console.log("No more states to undo.");
		// window.alert("No more states to undo.");
		return;
	}

	// do NOT allow undo beyond the deck marker
	if ((historyStack.length - 2) <= deckMarkerIndex) {
		console.log("Cannot undo beyond last deck click.");
		// window.alert("Cannot undo beyond last deck click.");
		return;
	}

	// remove current state
	historyStack.pop();

	// get the previous state
	const lastState = historyStack[historyStack.length - 1];

	const columns = document.querySelectorAll('.column');
	lastState.columns.forEach((html, idx) => {
		columns[idx].innerHTML = html;
	});
	document.getElementById('source').innerHTML = lastState.source;
	document.getElementById('dropout').innerHTML = lastState.dropout;
	document.getElementById('score').textContent = lastState.score;

});



