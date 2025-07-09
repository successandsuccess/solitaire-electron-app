roadmap
basics
a new object will be created with the following:
✅ an array for stock
✅ an array for wastepile
✅ 4 arrays for foundations
✅ 7 arrays for tableau
cards
✅ create an array with all the necessary cards (52)
each card must be an object:
✅ objects must contain suit, number, color, isFlipped
✅ image url
✅ 1 will be ace card and number > 10 will be a court card, in code will still be a number
DOM
✅ the play area will be divided in 2 rows and 7 columns
the first row will contain:
✅ first cell for stock
✅ second cell for wastepile
✅ empty or info cell
✅ 4 cells for foundation
the second row will contain:
✅ 7 tableaus
starting a new game
✅ the cards array will be shuffled with array.sort(random>0.5)
✅ in the play area, the first card will be placed face down in the first tableau, the second tableau will receive 2 cards, the third one 3 cards... the last tableau will receive 7 cards
✅ a facing-up card will be placed in wastepile
✅ the remaining cards will be placed face down in the stock
✅ all the last cards on the tableau will be flipped automatically
playing
✅ "mousedown" on facing down card will "flip" the card

"mousedown" on facing up card will:

✅ store in "cardFrom" which cell has been pressed and the clicked card in that pile

"mouseup" will:

✅ store in "cardDestination" which cell is under the mouse cursor and the last card in the pile

✅ run a function to check if the movement is valid

✅ clear the cadrFrom and cardDestination variables

the validating function will:

in tableaus the validating function:

if cardFrom number == cardDestination number+1 && cardFrom color != cardDestination color:

✅ remove last cards from the cardFrom column
✅ add cardFrom card or cards to cardDestination
✅ in the foundations, the same will happen but with ascending numbers and only with same suit type

check for win condition:

✅ if all same-suit piled up cards contains 13 cards, the game is over

other ideas
❌ spanish card deck to replace design (won't do, there's nothing to pair in this kind of deck, like colors in the actual designs)
❌ button to switch language (english-spanish) (Unnecesary)
❌ sounds
✅ visual representation of options instead of text
❌ more game modes (this will be done in a new project someday)
❌ draw the cards with divs instead of using a full image for each one