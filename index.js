document.getElementById("playbut").addEventListener("click", () => { 
    document.getElementById("mainpage").classList.add('hidden');
    document.getElementById("gamepage").classList.remove('hidden');
});


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const suits = ['hearts', 'spades', 'diamonds', 'clubs'];
const ranks = [
    { name: '2', value: 2 }, { name: '3', value: 3 }, { name: '4', value: 4 },
    { name: '5', value: 5 }, { name: '6', value: 6 }, { name: '7', value: 7 },
    { name: '8', value: 8 }, { name: '9', value: 9 }, { name: '10', value: 10 },
    { name: 'jack', value: 10 }, { name: 'queen', value: 10 }, { name: 'king', value: 10 },
    { name: 'ace', value: 11 }  
];

let deck = [];            

for (let suit of suits) {
    for (let rank of ranks) {
        deck.push({
            name: rank.name + suit,
            value: rank.value,
            image:`individual sprites/${rank.name}_of_${suit}.png`
        });
    }
}

console.log(deck[0].image)
shuffle(deck);

let baltext = document.getElementById("bal");
let bettext = document.getElementById("bet");
const initialbal = 5000;
let bet = 0;
let newbal = initialbal;
baltext.textContent = `BALANCE: ${initialbal}$`;


const hunbut = document.getElementById("hun");
const twohunbut = document.getElementById("twohun");
const fivehunbut = document.getElementById("fivehun");
const dealbut = document.getElementById("deal");
const hitbut = document.getElementById("hitbut");
const standbut = document.getElementById("standbut");


let dealercard = document.getElementById("dealerno");
let usercard = document.getElementById("userno");

let userhand = [];
let dealerhand = [];
let usertotal = 0;
let dealertotal = 0;
let gameresult=document.getElementById("gameresult")


function assigncard() {
    shuffle(deck)
    
    dealerhand.push(deck.pop());
    dealerhand.push(deck.pop());
    
    
    userhand.push(deck.pop());
    userhand.push(deck.pop());

   
    dealercard.innerHTML = `<img src="individual sprites/back.png" width="100">
                            <img src="${dealerhand[1].image}" width="100">`;
    usercard.innerHTML = `<img src="${userhand[0].image}" width="100">
                            <img src="${userhand[1].image}" width="100">`;        
}

function addbet(value) {
    bet += value;
    newbal -= value;
    bettext.textContent = `BET: ${bet}$`;
    baltext.textContent = `BALANCE: ${newbal}$`;
}


function caltotal(hand) {
    let total = 0;
    for (let i = 0; i < hand.length; i++) {
        total += hand[i].value;
    }
    
    
    let aceCount = hand.filter(card => card.name.startsWith('A')).length;
    while (total > 21 && aceCount > 0) {
        total -= 10;
        aceCount--;
    }
    
    return total;
}

hunbut.onclick = function() {
    if (newbal >= 100) addbet(100);
}

twohunbut.onclick = function() {
    if (newbal >= 200) addbet(200);
}

fivehunbut.onclick = function() {
    if (newbal >= 500) addbet(500);
}

dealbut.onclick = function() {
    if (bet >= 100) {
        assigncard();
        hitbut.classList.remove("hidden");
        standbut.classList.remove("hidden");

        hunbut.classList.add("hidden");
        twohunbut.classList.add("hidden");
        fivehunbut.classList.add("hidden");
        dealbut.classList.add("hidden");
    }
}


hitbut.onclick = function() {
    let nextCard = deck.pop();
    userhand.push(nextCard);
    
    usercard.innerHTML += " "+`<img src="${userhand[userhand.length-1].image}" width="100">`;
    usertotal = caltotal(userhand);
    
    console.log("Current Total: " + usertotal);
    
    if (usertotal > 21) {
        gameresult.textContent="YOU BUST"
        hitbut.disabled=true
        standbut.disabled=true
        document.getElementById("gamecard").classList.add('dim')
        document.getElementById("betbox").classList.add('dim')
        baltext.textContent=`BALANCE: ${newbal}$`
        bet=0
        bettext.textContent=`BET: ${bet}$`
    }
}



standbut.onclick=function() {
    usertotal=caltotal(userhand);
    dealertotal=caltotal(dealerhand);
    if(usertotal>dealertotal){
        gameresult.textContent="YOU WIN"
        newbal+=2*bet
    }
    else if(usertotal<dealertotal){
        gameresult.textContent="YOU LOSE"
    }
    else{
        gameresult.textContent="PUSH"
        balance+=bet
    }
    hitbut.disabled=true
    standbut.disabled=true
    document.getElementById("gamecard").classList.add('dim')
    document.getElementById("betbox").classList.add('dim')
    baltext.textContent=`BALANCE: ${newbal}$`
    bet=0
    bettext.textContent=`BET: ${bet}$`
}



document.body.addEventListener("click",(event)=>
    {
        if (event.target === hitbut || event.target === standbut) {
        return;}
        if(hitbut.disabled==true && standbut.disabled==true){
            hunbut.classList.remove('hidden')
            twohunbut.classList.remove('hidden')
            fivehunbut.classList.remove('hidden')
            dealbut.classList.remove('hidden')
            document.getElementById("betbox").classList.remove('dim')
            document.getElementById("gamecard").classList.remove('dim')
            gameresult.textContent=""
            hitbut.disabled=false
            standbut.disabled=false
            hitbut.classList.add('hidden')
            standbut.classList.add('hidden')
            hunbut.disabled=false
            twohunbut.disabled=false
            fivehunbut.disabled=false
            dealercard.textContent="CHOOSE YOUR"
            usercard.textContent="BETS"
            dealerhand=[]
            userhand=[]
            


     



}})

