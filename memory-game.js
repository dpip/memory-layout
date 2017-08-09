

function getTimeRemaining(endtime) {
  let t = Date.parse(endtime) - Date.parse(new Date());
  let seconds = Math.floor((t / 1000) % 60);
  let minutes = Math.floor((t / 1000 / 60) % 60);
  return {
    'total': t,
    'minutes': minutes,
    'seconds': seconds
  };
  if (t.seconds === 0) {
    console.log('out of time');
    // alert("Woops! Out of time. Try again!");
    // newBoard();
  }
}

function initializeClock(id, endtime) {
  let clock = document.getElementById(id);
  let minutesSpan = clock.querySelector('.minutes');
  let secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    let t = getTimeRemaining(endtime);

    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);


}

var deadline = new Date(Date.parse(new Date()) + 1 * 3 * 1000);
initializeClock('clock', deadline);


//
// Time todos____ clear the time when the the game is accomlished___clear array, randomize,
// then set time string to zero. It would also be neat to set modes (easy, med, hard, nightmare).
// What if the color of the time changed with each minute and when they finish they get a color
// badge.

// I wrote a function to remove hearts from an array... it's adding instead! haha


let heart_array = ['X','X','X','X','X','X','X'];
let heartsWrap = document.getElementById('hearts-list');
let memory_array = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','J','J'];
let memory_values = [];
let memory_tile_ids = [];
let tiles_flipped = 0;


let zeldaHearts = function removeHearts(){
      heart_array.pop();
}

Array.prototype.memory_tile_shuffle = function(){
    let i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

function newBoard(){
	tiles_flipped = 0;
	let output = '';
    memory_array.memory_tile_shuffle();
	for(var i = 0; i < memory_array.length; i++){
		output += '<div id="tile_'+i+'" class = "tile" onclick="memoryFlipTile(this,\''+memory_array[i]+'\')"></div>';
	}
	document.getElementById('memory_board').innerHTML = output;
}
function memoryFlipTile(tile,val){
	if(tile.innerHTML == "" && memory_values.length < 2){
		tile.style.background = '#FFF';
		tile.innerHTML = val;
		if(memory_values.length == 0){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
		} else if(memory_values.length == 1){
			memory_values.push(val);
			memory_tile_ids.push(tile.id);
			if(memory_values[0] == memory_values[1]){
				tiles_flipped += 2;
				// Clear both arrays
				memory_values = [];
            	memory_tile_ids = [];
				// Check to see if the whole board is cleared
				if(tiles_flipped == memory_array.length){
					alert("Good Game! Generating New Board.");
					document.getElementById('memory_board').innerHTML = "";
					newBoard();
				}
			} else {
				function flip2Back(){
				    // Flip the 2 tiles back over
				    let tile_1 = document.getElementById(memory_tile_ids[0]);
				    let tile_2 = document.getElementById(memory_tile_ids[1]);
				    tile_1.style.background = 'url(tile_bg.jpg) no-repeat';
            	    tile_1.innerHTML = "";
				    tile_2.style.background = 'url(tile_bg.jpg) no-repeat';
            	    tile_2.innerHTML = "";
				    // Clear both arrays
				    memory_values = [];
            	    memory_tile_ids = [];
            let wrongTiles1 = tile_1;
            let wrongTiles2 = tile_2;
            wrongTiles1.classList.add('wrongTiles');
            wrongTiles2.classList.add('wrongTiles');
            let item = document.createElement("div");


            for (let i = 0; i < heart_array.length; i++ ) {
                item.innerHTML = heart_array[heart_array.length - 1];
                heartsWrap.appendChild(item);

            }
            if (heart_array.length === 1) {
              console.log("array is empty");
              alert("Strike 7... yerrrrr outa here! Generating New Board.");
              document.getElementById('memory_board').innerHTML = "";
              while (heartsWrap.firstChild) {
                  heartsWrap.removeChild(heartsWrap.firstChild);
              }

              newBoard();
              let newHeart = "x";
              heart_array.push('X','X','X','X','X','X','X');
              console.log(heart_array);

            }

            zeldaHearts();
            console.log(heart_array);
				}
				setTimeout(flip2Back, 700);
			}
		}
	}
}


newBoard();

// if (hearts_array[] == 0) {
//   newBoard();
// }
