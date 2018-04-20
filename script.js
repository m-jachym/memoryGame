var tableArray = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','J','J','K','K','L','L'];
var tableValues = [];
var tableTileIds = [];
var tilesFlipped = 0;
Array.prototype.memoryTileShuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}
function newBoard(){
	tilesFlipped = 0;
	var output = '';
    tableArray.memoryTileShuffle();
	for(var i = 0; i < tableArray.length; i++){
		output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+tableArray[i]+'\')"></div>';
	}
	document.getElementById('board').innerHTML = output;
}
function memoryFlipTile(tile,val){
	if(tile.innerHTML == "" && tableValues.length < 2){
		tile.style.background = '#FFF';
		tile.innerHTML = '<img src="img/' + val + '.png"/>';
		if(tableValues.length == 0){
			tableValues.push(val);
			tableTileIds.push(tile.id);
		} else if(tableValues.length == 1){
			tableValues.push(val);
			tableTileIds.push(tile.id);
			if(tableValues[0] == tableValues[1]){
				tilesFlipped += 2;
				tableValues = [];
            	tableTileIds = [];
				if(tilesFlipped == tableArray.length){
					alert("Wygrałeś! Zagraj jeszcze raz");
					document.getElementById('board').innerHTML = "";
					newBoard();
				}
			} else {
				function flip2Back(){
				    var tile_1 = document.getElementById(tableTileIds[0]);
				    var tile_2 = document.getElementById(tableTileIds[1]);
				    tile_1.style.background = 'url("img/card.png") no-repeat center center / cover';
            	    tile_1.innerHTML = "";
				    tile_2.style.background = 'url("img/card.png") no-repeat center center / cover';
            	    tile_2.innerHTML = "";
				    tableValues = [];
            	    tableTileIds = [];
				}
				setTimeout(flip2Back, 500);
			}
		}
	}
}

window.onload = newBoard();
