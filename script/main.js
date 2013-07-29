/****************************************************************************************
* TO-DO List
*
* 1) Create ships on grid automatically (later allow users to drag and drop ship)
* 2) Use prototypal inheritance to create all ships
* 3) Make game work correctly 
*
*****************************************************************************************/


var battle_box = {
	ships : new Array(
		 {
			name : "patrol",
			sunk : false,
			cell_count : 2,
			cell : new Array({ x : 1, y : 1 }, { x : 1, y : 2} ),
			hit: function() {
				this.cell_count--;
				if(this.cell_count <= 0){
					this.sunk = true;
					console.log("you sunk my "+this.name);
				}
			}
		},

 		{
			name : "battle ship",
			sunk : false,
			cell_count : 2,
			cell : new Array({ x : 1, y : 1 }, { x : 1, y : 2} ),
			hit: function() {
				this.cell_count--;
				if(this.cell_count <= 0){
					this.sunk = true;
					console.log("you sunk my "+this.name);
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

var case_test = {
	test :function (x,y) {
		var hit = "miss";
		for (i in battle_box.ships) {
			for (j in battle_box.ships[i].cell){
				if ( x == battle_box.ships[i].cell[j].x && y == battle_box.ships[i].cell[j].y ) {
					battle_box.ships[i].hit();
					hit = "hit"
				} 
			}
			
		}
		console.log(hit);
		battle_box.gameover.is_gameover();
	}
}


	case_test.test(1,1);
	case_test.test(1,1);	
