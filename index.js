    const suits = ['♦️', '♣️', '♠️', '💗'];
    const ranks = [
            { name: '2', value: 2 },
            { name: '3', value: 3 },
            { name: '4', value: 4 },
            { name: '5', value: 5 },
            { name: '6', value: 6 },
            { name: '7', value: 7 },
            { name: '8', value: 8 },
            { name: '9', value: 9 },
            { name: '10', value: 10 },
            { name: 'J', value: 10 }, 
            { name: 'Q', value: 10 },
            { name: 'K', value: 10 },
            { name: 'A', value: 11 }  
            ];


const deck = [];

for(let suit of suits){
    for(let rank of ranks){
        deck.push({
            name:rank.name+suit,
            value:rank.value
        })
    }
}


const body = document.querySelector("body")
const hitbutton=document.getElementById("hitbut")
const standbutton=document.getElementById("standbut")
let dealcards=document.getElementById("dealerno")
let usercards=document.getElementById("userno")
let gameres=document.getElementById("gameresult")
let usertotal=0
let dealertotal=0

function game(){
    gameres.textContent=""
    let x=Math.floor(Math.random()*52)
    let c=Math.floor(Math.random()*52)
    let a=Math.floor(Math.random()*52)
    let b=Math.floor(Math.random()*52)

    document.getElementById("gamebut").classList.remove('dim')
    document.getElementById("gamecard").classList.remove('dim')
    hitbutton.disabled=false
    standbutton.disabled=false

    dealcards.textContent="X         "+deck[c].name
    usercards.textContent=deck[a].name+deck[b].name


    usertotal=deck[a].value+deck[b].value
    dealertotal=deck[x].value+deck[c].value
    




}



function hitfun(){
    let d=Math.floor(Math.random()*52)
    usercards.textContent += deck[d].name
    usertotal += deck[d].value
    if(usertotal>21){
        gameres.textContent="YOU BUST"
        hitbutton.disabled=true
        standbutton.disabled=true
        document.getElementById("gamebut").classList.add('dim')
        document.getElementById("gamecard").classList.add('dim')
    }
}



function standfun(){
    if(usertotal>dealertotal){
        gameres.textContent="YOU WIN"
    }
    else if(dealertotal>usertotal){
        gameres.textContent="YOU LOSE"
    }
    else{
        gameres.textContent="PUSH"
    }
    hitbutton.disabled=true
    standbutton.disabled=true
    document.getElementById("gamebut").classList.add('dim')
    document.getElementById("gamecard").classList.add('dim')
}



document.getElementById("playbut").addEventListener("click",()=>{ document.getElementById("mainpage").classList.add('hidden');

document.getElementById("gamepage").classList.remove('hidden')

})


document.getElementById("setbut").addEventListener("click",()=>
{
    document.getElementById("mainpage").classList.add('hidden');
    document.getElementById("settingpage").classList.remove('hidden')
})

game()




    
body.addEventListener("click",(event)=>
    {
        if (event.target === hitbutton || event.target === standbutton) {
        return; 
    }
        if(hitbutton.disabled==true && standbutton.disabled==true){
        game();
  
        console.log("htt")
    }})


