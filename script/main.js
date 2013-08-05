/****************************************************************************************
* TO-DO List
*
* 1) Make computer smarter on picks after a hit
* 2) Use prototypal inheritance to create all ships
* 3) Add 
*
*****************************************************************************************/

var battle_box = {
	ships : new Array(
		 {
			name : "patrol",
			sunk : false,
			cell_count : 3,
			cell : new Array(),
			cell_computer : new Array(),
			hit: function() {
				this.cell_count--;
				if(this.cell_count <= 0){
					this.sunk = true;
					console.log("you sunk my "+this.name);
					battle_box.gameover.is_gameover();
				}
			}
		},

 		{
			name : "battle ship",
			sunk : false,
			cell_count : 2,
			cell : new Array(),
			cell_computer : new Array(),
			hit: function() {
				this.cell_count--;
				if(this.cell_count <= 0){
					this.sunk = true;
					console.log("you sunk my "+this.name);
					battle_box.gameover.is_gameover();
				}
			}
		}
	),	
	gameover : {
		result: false,
		count: 0,
		is_gameover : function (){
			for(i in battle_box.ships){
				if(battle_box.ships[i].sunk){
					this.count--;
					if(this.count <= 0){
						console.log("Game Over");
					}
				}
			}
		}
	}
}

battle_box.gameover.count =  battle_box.ships.length ;

// safe distance from side based on 10x10
function safe_random_number(num1, num2 = 1) {
	return Math.round(Math.random() * (1 , (num1-1)))+num2;
}

function computers_turn(){
	var square = document.getElementById("grid1");
	var x = safe_random_number(10, 0);
	var y = safe_random_number(10, 0);
	var block = square.childNodes[x].childNodes[y]
	var color = "gray";
	var active = block.childNodes[2];
	
	if(active.innerHTML == 'true'){
		for (i in battle_box.ships) {
			for (j in battle_box.ships[i].cell_computer){
				if ( x == battle_box.ships[i].cell_computer[j].x && y == battle_box.ships[i].cell_computer[j].y ) {
					color = "red";
				} 
				
			}
		}
		block.style.backgroundColor = color;
		active.innerHTML = "false";
	} else {
		// try again		
		computers_turn();
	}
	
}

var case_test = {
	test :function (x,y) {
		var hit = false;
		for (i in battle_box.ships) {
			for (j in battle_box.ships[i].cell){
				if ( x == battle_box.ships[i].cell[j].x && y == battle_box.ships[i].cell[j].y ) {
					battle_box.ships[i].hit();
					hit = true;
				} 
			}
			
		}	
		computers_turn();	
		return hit;
	}
}

// Make GUI grid
function makeGrid(v){ 
	var e = document.body; // whatever you want to append the rows to: 
	for(var j = 1; j <= 2; j++){
		var grid = document.createElement("div"); 
		grid.id = "grid"+j;
    	grid.className = "grid";

		for(var i = 1; i <= v; i++){ 
	    	var row = document.createElement("div"); 
	    	row.className = "rows"; 
	    	for(var x = 1; x <= v; x++){ 
	        	var cell = document.createElement("div"); 
	        	cell.className = "battleBlock"; 
	        	cell.innerHTML = "<div class='xAlis axis'>"+i+"</div><div class='yAxis axis'>"+x+"</div><div class='active axis'>true</div>";
	        	row.appendChild(cell); 
	    	} 
	    	grid.appendChild(row); 
	  	}
	e.appendChild(grid); 
	}
	
  	// load battle boats
	// TO-DO make sure ships dont overlap
	for(var k = 0; k < 2; k++) {
		for(i in battle_box.ships){
			var plane = safe_random_number(2,0);
			var count = battle_box.ships[i].cell_count;
			var start_number = safe_random_number(10 - count);
		 	var xx = 0;
			var yy = 0;	

			for(j = 1; j <= count; j++){ 
				// horizontal or vertical
				if(plane){		
					if(j == 1){
						xx = safe_random_number(10);
					}	
					yy = start_number + j;
				}else{	
					if(j == 1){
						yy = safe_random_number(10);
					}			
					xx = start_number + j;						
				}
				cell = { x : xx, y : yy };

				if(k){
					battle_box.ships[i].cell_computer.push(cell);
					var square = document.getElementById("grid1");
					square.childNodes[xx].childNodes[yy].style.backgroundColor = "green";
				} else {
					battle_box.ships[i].cell.push(cell);
					//console.log("x : "+xx+" - y "+yy);
				}
			}
		}
	}
	
}



// Game controller
$(function(){
	$("body").delegate('#grid2 .battleBlock', 'click', function(ev){
		var square = $(this);
		var axis = ev.target;
		var x = axis.childNodes[0].innerHTML;
		var y = axis.childNodes[1].innerHTML;
		var active = axis.childNodes[2];
				
		if(active.innerHTML === 'true' ) {
			if(case_test.test(x,y)){
				square.css('background', 'red');				
			} else {
				square.css('background', 'blue');
			}
			active.innerHTML = "false";
		}

	});	
	
});

	
