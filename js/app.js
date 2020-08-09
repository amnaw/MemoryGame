var cardimg = ["chihiro","monoki","kiki","sophie","arrietty","tales","sheeta","nausica"];
cardimg = cardimg.concat(cardimg);                //double the cardimg array
var card = document.querySelectorAll(".card");   //cards Nodelist
var cards = [];                                 //To
for(var i = 0; i <= cardimg.length - 1; i++){  //cards Array
    cards.push(card[i]);
};
// cards board
const cardsBoard = document.querySelector('#cards-board');

//got the inspiration for this func from this channel "All Things JavaScript, LLC"..
function shuffle(array) {  
    
    var temp,randomIndex;
    for(var i = 0; i <= array.length - 1; i++){
        randomIndex = Math.floor(Math.random() * (i + 1));
        temp = array[i];
        array[i] = array[randomIndex];
        array[randomIndex] = temp;
    }
    return array;
};

//Each time the cards will mixed ;)
var cardsMixer = function(){
    //var outerCards = document.querySelectorAll(".card"); 
    //for(var i = 0; i <= outerCards.length - 1; i++){
      //  outerCards[i].classList.remove("match");
        //outerCards[i].classList.remove("open"); 
        
    //}
    for(var i = 0; i <= cards.length - 1; i++){
        cards[i].classList.remove("match");
        cards[i].classList.remove("open"); 
        
    }
       setTimeout(waitThenShuffle, 1000)
       
    };

var waitThenShuffle = function(){
    shuffle(cardimg);
        
        //openCards=[];
        for(var i = 0; i <= cards.length - 1; i++){
           
            cards[i].innerHTML = `<div class="${cardimg[i]}" ></div>`;

        }
}

var makeSureAllClosed = function(){
    for(var i = 0; i <= cards.length - 1; i++){
        cards[i].classList.remove("match");
        cards[i].classList.remove("open"); 
        
    }
    openCards = []; 
        return 1;
}

//Add event listener to the deck
var deck = document.querySelectorAll(".deck");
var openCards = [];
var c = 0; //to prevent displaying pop msg after close

/* this is for the popUp message when the player wins ;) I got the inspiration for the PopUp message
 * from the channel "DarkCode"
 */
function pop(){
    
    if((matchs === 8) && ( c === 0)){
        var congrats = document.querySelector(".congrats");
        if(stars.length === 1){
            congrats.innerHTML = `<h2>Congratulations</h2>
            <img src="img/star2.png" alt="star">`;
        }
        if(stars.length === 2){
            congrats.innerHTML = `<h2>Congratulations</h2><img src="img/star2.png" alt="star">
            <img src="img/star2.png" alt="star">`;
        }
        if(stars.length === 3){
            congrats.innerHTML = `<h2>Congratulations</h2><img src="img/star2.png" alt="star">
            <img src="img/star2.png" alt="star">
            <img src="img/star2.png" alt="star">`;
        }
        if(stars.length === 4){
            congrats.innerHTML = `<h2>Congratulations</h2><img src="img/star2.png" alt="star">
            <img src="img/star2.png" alt="star">
            <img src="img/star2.png" alt="star"><img src="img/star2.png" alt="star">`;
        }
        if(stars.length === 5){
            congrats.innerHTML = `<h2>Congratulations</h2><img src="img/star2.png" alt="star">
            <img src="img/star2.png" alt="star"><img src="img/star2.png" alt="star">
            <img src="img/star2.png" alt="star"><img src="img/star2.png" alt="star">`;
        }
        
        congrats.innerHTML += `<h3> You won in ${min} min and ${sec} sec with ${moves} moves !
        </h3> <a class="close" onclick="unpop()">Close</a>
        <a class="replay" onclick="replay()">Play Again</a>`;

        congrats.style.display = "block";
        c = 1;
    }
}

var closePop = document.querySelector(".close");
var replayBtn = document.querySelector(".replay");

//the func that upPop the message
function unpop(){
    document.querySelector(".congrats").style.display = "none";
}

//the func that restart the game when user wants to play more after winning
function replay(){
    unpop();
    rep();
}


//the func that sets the timer 
var sec = 0;
var min = 0;
var counter = setInterval(function secs(){
    if(sec <= 58){
        sec += 1;
        timeSpan.innerHTML = `Timer: ${min}:${sec}`;}
    else {
        sec = 0;
        min += 1;
        timeSpan.innerHTML = `Timer: ${min}:${sec}`;}
        
    }, 1000);

var incorrectTry = 0;
var matchs = 0;
var moves = 0;
var moveSpan = document.querySelector(".moves");
var timeSpan = document.querySelector(".timer");
var stars = document.getElementsByClassName("fa fa-star");
var starsContainer = document.querySelector(".stars");

//the func that starts a Game and sets everything to the beginning
var startGame = function game(){

    cardsMixer();
    //setTimeout(cardsMixer(), 8000 ) 
        moves = 0;
        matchs = 0;
        moveSpan.innerHTML = `${moves}`;
        sec = 0;
        min = 0;
        timeSpan.innerHTML = `Timer: ${min}:${sec}`;
        starsContainer.innerHTML = `<li><i class="fa fa-star"></i></li>
            <li><i class="fa fa-star"></i></li>
            <li><i class="fa fa-star"></i></li>
            <li><i class="fa fa-star"></i></li>
            <li><i class="fa fa-star"></i></li>`;
}

startGame();

//adding a Eventlistener to the whole grid 
/*
deck[0].addEventListener("click", function(e){
    if((e.target.classList.contains("card")) && (!e.target.classList.contains("open")) && (!e.target.classList.contains("match"))){
        if(openCards.length <= 1 ){
            e.target.classList.add("open");
            openCards.push(e.target); //adds the clicked card to the openCards Array to limit and control the open cards

            setTimeout(function(){
                if((openCards.length === 2) && ( openCards[0].innerHTML === openCards[1].innerHTML )){console.log("Yaay:)")
                   for(var i=0; i <= 1; i++){
                       openCards[i].classList.add("match");
                       openCards[i].classList.remove("open");} 
                       matchs += 1;
                       moves += 1;
                       moveSpan.innerHTML = `${moves}`;
                       openCards = [];     //make sure to empty this array cuz the cards are no longer opend it is matched
                       if(matchs === 8){
                           clearInterval(counter); //if the matchs=8 (winning) kill the timer (stop it)
                            pop();                //popUp the congrats message
                        }
                    }
                },1000);

            setTimeout(function(){
                if((openCards.length === 2) && ( openCards[0].innerHTML != openCards[1].innerHTML )){
                    for(var i=0; i <= 1; i++){
                      openCards[i].classList.remove("open");
                       }
                     
                    moves += 1;
                    incorrectTry += 1;
                    moveSpan.innerHTML = `${moves}`;
                    openCards = [];   //make sure to empty this array cuz the cards are no longer opend
                        
                    if(incorrectTry === 3){
                        stars[4].remove();
                        //starsContainer.innerHTML +=  "<i class='fas fa-star'></i></i>"; 
                     }

                    if(incorrectTry === 5){
                        stars[3].remove();
                        //starsContainer.innerHTML +=  "<i class='far fa-star'></i>"; 
                    }

                     if(incorrectTry === 7){
                        stars[2].remove();
                        //starsContainer.innerHTML +=  "<i class='far fa-star'></i>"; 
                    }

                     if(incorrectTry === 9){
                        stars[1].remove();
                        //starsContainer.innerHTML +=  "<i class='far fa-star'></i>"; 
                    }
                }
        },2000);
            
            setTimeout(function(){  //do not do anything when the opened cards are just one, just till me ;)
                if(openCards.length === 1){
                    console.log("Im 1");}
            },2000);
        }
    };
}); */

//mobile listeners..
/*
const parent = document.querySelector(".deck");
parent.addEventListener("click", function(e) {
     const child = e.target.matches(".card"); //true or false
     if (child) { // If child is click
     // Your code here
     console.log("babay click")
     if((e.target.classList.contains("card")) && (!e.target.classList.contains("open")) && (!e.target.classList.contains("match"))){
        if(openCards.length <= 1 ){
            e.target.classList.add("open");
            openCards.push(e.target); //adds the clicked card to the openCards Array to limit and control the open cards

            setTimeout(function(){
                if((openCards.length === 2) && ( openCards[0].innerHTML === openCards[1].innerHTML )){console.log("Yaay:)")
                   for(var i=0; i <= 1; i++){
                       openCards[i].classList.add("match");
                       openCards[i].classList.remove("open");} 
                       matchs += 1;
                       moves += 1;
                       moveSpan.innerHTML = `${moves}`;
                       openCards = [];     //make sure to empty this array cuz the cards are no longer opend it is matched
                       if(matchs === 8){
                           clearInterval(counter); //if the matchs=8 (winning) kill the timer (stop it)
                            pop();                //popUp the congrats message
                        }
                    }
                },1000);

            setTimeout(function(){
                if((openCards.length === 2) && ( openCards[0].innerHTML != openCards[1].innerHTML )){
                    for(var i=0; i <= 1; i++){
                      openCards[i].classList.remove("open");
                       }
                     
                    moves += 1;
                    incorrectTry += 1;
                    moveSpan.innerHTML = `${moves}`;
                    openCards = [];   //make sure to empty this array cuz the cards are no longer opend
                        
                    if(incorrectTry === 3){
                        stars[4].remove();
                        //starsContainer.innerHTML +=  "<i class='fas fa-star'></i></i>"; 
                     }

                    if(incorrectTry === 5){
                        stars[3].remove();
                        //starsContainer.innerHTML +=  "<i class='far fa-star'></i>"; 
                    }

                     if(incorrectTry === 7){
                        stars[2].remove();
                        //starsContainer.innerHTML +=  "<i class='far fa-star'></i>"; 
                    }

                     if(incorrectTry === 9){
                        stars[1].remove();
                        //starsContainer.innerHTML +=  "<i class='far fa-star'></i>"; 
                    }
                }
        },2000);
            
            setTimeout(function(){  //do not do anything when the opened cards are just one, just till me ;)
                if(openCards.length === 1){
                    console.log("Im 1");}
            },2000);
        }
    };
}});*/

for(var i = 0; i <= cards.length - 1; i++){
    cards[i].addEventListener("click", function(e){
        console.log("ffffff")
        const child = e.target.matches(".card"); //true or false
     if (child) {
        e.target.classList.add("open")
     }
        
    })
    ////
}

//the func that will called when the restart symbol is clicked and it is starts every thing from the beginning
function rep(){
    for(var i = 0; i <= cards.length - 1; i++){
        card[i].classList.remove("match");
        card[i].classList.remove("open");
    }; 
        openCards = [];                              //fix The restart button bug,it occurs cuz the openCards array
                                                    // isn't cleared on restart so it retains the first card click value
                                                   // in it even after restart.
                                                   
        if(matchs === 8){
            counter = setInterval(function secs(){
                if(sec <= 58){
                    sec += 1;
                    timeSpan.innerHTML = `Timer: ${min}:${sec}`;}
                else {
                    sec = 0;
                    min += 1;
                    timeSpan.innerHTML = `Timer: ${min}:${sec}`;
                }
              }, 1000);
            }
            
            //makeSureAllClosed();
            startGame();
  };
 
//add an Eventlistener on the resart symbol 
var repeat = document.querySelector(".repeat");
repeat.addEventListener("click", rep);



