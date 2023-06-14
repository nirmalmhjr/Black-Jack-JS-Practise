document.querySelector('#blackJackHit').addEventListener('click', blackJackHit);
document.querySelector('#blackJackStand').addEventListener('click', blackJackStand);
document.querySelector('#blackJackDeal').addEventListener('click', blackJackDeal);

let blackJackObject ={
    'cards': ['A','2','3','4','5','6','7','8','9','10','J','Q','K'],
    'cardsValue':{'A':[1,11],'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':10,'Q':10,'K':10},
    'hitComplete':'no',
    'isStand':'off',
    'isDeal': 'off',
    'wins': 0,
    'draws': 0,
    'losses': 0
}

let youScore = 0;
let dealerScore= 0;


function blackJackHit(){
    
    if(blackJackObject['isStand'] =='off'){
        
        let cards=blackJackObject['cards'][randomNumber()]
        
        showCards(cards)
        updateYouScore(cards)
        ifAbove21()
    } 
    document.querySelector('#result').textContent = "Let's Play"
    console.log('isStand: ',blackJackObject['isStand'])
    blackJackObject['hitComplete'] = 'yes';
}

function ifAbove21(){
    if(youScore >21){
            document.querySelector('#result').textContent = 'You loose';
            blackJackObject['losses']+=1;
            document.querySelector('#lossPoint').textContent = blackJackObject['losses']
            blackJackObject['isStand'] ='on'
            console.log(blackJackObject['isStand'])
        }
}

function sleep  (ms){
    return new Promise(resolve => setTimeout(resolve,ms))
}

async function blackJackStand(){
    if(blackJackObject['hitComplete'] =='yes'){
        while(dealerScore <= 16){
            let cards = blackJackObject['cards'][randomNumber()]
            
            showCardsDealer(cards)
            updateDealerScore(cards)
            await sleep(1000)
        }

        blackJackObject['isStand'] = 'on'

        blackJackObject['isDeal'] ='on'
}
winLoseDraw()
}

function blackJackDeal(){
    if(blackJackObject['isDeal'] =='on'){
        // youScore = 0;
        // dealerScore = 0;

        youImage =document.querySelector('#you-box-image').querySelectorAll('img');
        dealerImage = document.querySelector('#dealer-box-image').querySelectorAll('img');

        document.querySelector('#you-box-result').textContent = '0';
        document.querySelector('#dealer-box-result').textContent = '0';


        for(i=0;i<youImage.length;i++){
            youImage[i].remove()
        }
        
        for(i=0;i<dealerImage.length;i++){
            dealerImage[i].remove()
        }

    }

        youScore = 0;
        dealerScore = 0;

        blackJackObject['hitComplete'] = 'off';
        blackJackObject['isStand'] = 'off';
        blackJackObject['isDeal'] ='off';

    
    console.log('isStand: ',blackJackObject['isStand'])
    console.log('isDeal: ',blackJackObject['isDeal'] )
}


function randomNumber(){
    return [Math.floor(Math.random()*13)]
}

function showCards(cards){
    let cardImage= document.createElement('IMG');
    cardImage.src = `images/${cards}.png`
    document.querySelector('#you-box-image').appendChild(cardImage)
}

function showCardsDealer(cards){
    let cardsImage =  document.createElement('img');
    cardsImage.src = `images/${cards}.png`
    document.querySelector('#dealer-box-image').appendChild(cardsImage)
}

function updateYouScore(cards){
    if(cards == 'A'){
        if(youScore <=10){
            youScore += blackJackObject['cardsValue'][cards][1]
        } else {
            youScore += blackJackObject['cardsValue'][cards][0]
        }
    } else {
        youScore +=blackJackObject['cardsValue'][cards]
    }

    
    console.log(youScore)
    
    document.querySelector('#you-box-result').textContent = youScore

}

function updateDealerScore(cards){
    if(cards == 'A'){
        if(dealerScore <=10){
            dealerScore += blackJackObject['cardsValue'][cards][1]
        } else {
            dealerScore += blackJackObject['cardsValue'][cards][0]
        }
    } else {
        dealerScore +=blackJackObject['cardsValue'][cards]
    }


    console.log(dealerScore)
    document.querySelector('#dealer-box-result').textContent = dealerScore

}

function winLoseDraw(){
    if(youScore <=21 && dealerScore <=21){
        if(youScore > dealerScore){
            document.querySelector('#result').textContent = 'You win';
            blackJackObject['wins']+=1;
            document.querySelector('#winPoint').textContent = blackJackObject['wins']
        }  else if(youScore < dealerScore){
            document.querySelector('#result').textContent = 'You loose';
            blackJackObject['losses']+=1;
            document.querySelector('#lossPoint').textContent = blackJackObject['losses']
        } else if(youScore = dealerScore){
            document.querySelector('#result').textContent = 'You draw';
            blackJackObject['draws']+=1;
            document.querySelector('#drawPoint').textContent = blackJackObject['draws']
        }
    } else if(dealerScore >21){
        document.querySelector('#result').textContent = 'You win';
        blackJackObject['wins']+=1;
        document.querySelector('#winPoint').textContent = blackJackObject['wins']
    }
}