"use strict";

// this is nice, effective trick:
// With "use strict" on the browser will complain if we use a variable
// before defining it.  Here we define some variables.  Throughout your
// program you MUST use these variables (instead of re-typing the image names
// This way if you make a typo the browser will complain about an undefined
// variable (unlike making a typo in the image name, which will produce a much
// harder to find error)
var PLAYER_X = "Images/x.gif";
var PLAYER_O = "Images/o.gif";
var BLANK = "Images/blank.gif";

var currentPlayer = PLAYER_X;
var gameInProgress = true;

// Thess will be the array that the represents the 'board'
// There's one array for the top row, one for the middle row, and one for the bottom
var topRow = [BLANK, BLANK, BLANK]; // each element contains either PLAYER_X, PLAYER_O, or BLANK
var middleRow = [BLANK, BLANK, BLANK]; // ditto
var bottomRow = [BLANK, BLANK, BLANK]; // also ditto

function updateDisplay(){
	if(currentPlayer == PLAYER_X) {
		$("#currentPlayer").html("It is Player_X's turn");
	} else {
		$("#currentPlayer").html("It is Player_O's turn");
	}
}

function renderBoard() {  
	var col;
	var eltId;
	
	for( col = 0; col < 3; col++) {
		// top row:
		eltId = "#0_" + col;
		if( eltId == BLANK) {
			topRow[col] = BLANK;
		} else if (eltId == PLAYER_X) {
			topRow[col] = PLAYER_X;
		} else if (eltId == PLAYER_O) {
			topRow[col] = PLAYER_O;
		}
	}
	for( col = 0; col < 3; col++) {
		// middle row:
		eltId = "#1_" + col;
		if( eltId == BLANK) {
			topRow[col] = BLANK;
		} else if (eltId == PLAYER_X) {
			topRow[col] = PLAYER_X;
		} else if (eltId == PLAYER_O) {
			topRow[col] = PLAYER_O;
		}
	}
	for( col = 0; col < 3; col++) {
		// bottom row:
		eltId = "#2_" + col;
		if( eltId == BLANK) {
			topRow[col] = BLANK;
		} else if (eltId == PLAYER_X) {
			topRow[col] = PLAYER_X;
		} else if (eltId == PLAYER_O) {
			topRow[col] = PLAYER_O;
		}
	}

}

function resetGame(){
	// could use a loop, but we'll just set it to be all blank
	topRow = [BLANK, BLANK, BLANK];
	middleRow = [BLANK, BLANK, BLANK];
	bottomRow = [BLANK, BLANK, BLANK];

	gameInProgress = true;
	updateDisplay();
}

//		This function and the next function are 'magic' - you're not expected to 
//	understand all the details of how they work.
//		What you ARE expected to understand is that createEventHandlersForBlocks
//	wil set up event handlers for all the blocks.  Specifically, it will set 
//	things up so that if you click on the block with id="1_0", the function
//	clickOnBlock will be called with the paramters 1, 0
//	(i.e., clicking on that block will call clickOnBlock(1,0)
function makeClickHandler( row, col ) {
	return function() {
		clickOnBlock( row, col );
	};
}

function createEventHandlersForBlocks(){
	// top row:
	$("#0_0").click( makeClickHandler( 0, 0) ); // left
	$("#0_1").click( makeClickHandler( 0, 1) ); // center
	$("#0_2").click( makeClickHandler( 0, 2) ); // right
	
	// middle row:
	$("#1_0").click( makeClickHandler( 1, 0) ); // left
	$("#1_1").click( makeClickHandler( 1, 1) ); // center
	$("#1_2").click( makeClickHandler( 1, 2) ); // right

	// bottom row:
	$("#2_0").click( makeClickHandler( 2, 0) ); // left
	$("#2_1").click( makeClickHandler( 2, 1) ); // center
	$("#2_2").click( makeClickHandler( 2, 2) ); // right	
}


$(document).ready( function(){
	// connect resetGame to the button, in order to call it later.
    $("#restartGame").click( resetGame );
	
    createEventHandlersForBlocks(); // no longer used - see below
	
	resetGame(); // call it to set up the game
});


function isBlockOccupied(row, col){
	var blockStatus;
	var row;
	var col;
	for(row = 0; row < 3; row++){
		
		
		for(col = 0; col < 3; col++){
		
			
		}
	}
	
	 //alert("calling isBlockOccupied (" + row + "," + col +")");
}

function changeBlock(row, col, toPlayer){
	//	alert("Changing block (" + row + "," + col +") to be player "+ currentPlayer);
}

function switchPlayers(){
	if( currentPlayer == PLAYER_O ) {
		currentPlayer = Player_X;
	}else {
		currentPlayer = PLAYER_O;
	}
		alert("Current player switched to: " + currentPlayer);
}

function checkForVictory(currentPlayer){
    var resultOfCheck;
	var col;
	var row;

	// check each of the columns    
    for (col = 0; col < 3; col++) {
        resultOfCheck = checkColForVictory(col, currentPlayer);
        
        if (resultOfCheck == true) {
            return resultOfCheck;
		}
    }
    
	// check each of the rows    
    for (row = 0; row < 3; row++) {
        resultOfCheck = checkRowForVictory(row, currentPlayer);
        
        if (resultOfCheck == true) {
            return resultOfCheck;
		}
    }
    
    return checkDiagonalsForVictory(currentPlayer);
}

function checkColForVictory(col, player){
}

function checkRowForVictory(row, player){
}

function checkDiagonalsForVictory(player){
}

function openSpaceExists() {
	var col;
	
	return false; // there are NO spaces open (so the game is over) 
	//	(since we've already checked to see if a player has won, we know
	//		that it's a tie)
}


function clickOnBlock(row, col){
	alert("Clicked on block with id " + row + "_" + col);
    
    if (!gameInProgress) {
        $("#currentPlayer").html("<h1>The curent game has ended - click on the button above the board to restart a new game</h1>");
        return;
    }
    
    if (isBlockOccupied(row, col)) {
        $("#currentPlayer").append("<br/>You can't change that - it's already occupied!");
        return;
    }
    
    changeBlock(row, col, currentPlayer);
	renderBoard();
    
    if (checkForVictory(currentPlayer)) {
		if( currentPlayer == PLAYER_X ) {
			$("#currentPlayer").append("<h1>Congratulations, player X - you've won!</h1>");
		}
		else {
			$("#currentPlayer").append("<h1>Congratulations, player O - you've won!</h1>");
		}
        gameInProgress = false;
        return;
    }
    if (!openSpaceExists()) {
        $("#currentPlayer").append("<h1>Sorry, players - neither player has won, and since there's no place left to move, the game is over!</h1>");
        gameInProgress = false;
        return;
    }
    
    switchPlayers();
    updateDisplay();
}