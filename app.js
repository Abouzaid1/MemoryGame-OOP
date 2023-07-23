let letters = ["red", 'red', 'green', 'green', 'blue', "blue", 'white', "white", 'yellow', 'yellow', 'purple', 'purple' , "black" ,"black" , "aqua","aqua","brown","brown"]
// let letters = ["red", 'red', 'green', 'green', 'blue', "blue"]
let container = document.getElementById("container")
let preventClick = document.getElementById("preventClick")
let wrongTry = document.getElementById("wrongTry")
let bestScore = document.getElementById("bestScore")
let username = document.getElementById("username")
let namedisplayed = document.getElementById("name")
let login = document.getElementById("login")
let goBtn = document.getElementById("goBtn")
let winPage = document.getElementById("winPage")
let reloadBtn = document.getElementById("reloadBtn")
// winner chicken dinner



function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
    }
    return array;
}



class Memory {
    constructor() {
    }
    localStorageCheck() {
        if (localStorage.getItem("username") != null) {
            namedisplayed.innerText = localStorage.getItem("username")
            login.classList.add("d-none")
        } else if (localStorage.getItem("username") == null) {
            namedisplayed.innerText = username.value
        }
        if (localStorage.getItem("bestScore") != null) {
          
          bestScore.innerText = localStorage.getItem("bestScore")   
      } else{

      }
    }
    loginFunc() {
        goBtn.addEventListener("click", () => {
            if (username.value != "") {
                localStorage.setItem("username", username.value)
                login.classList.add("d-none")
                namedisplayed.innerText = username.value
            }
        })
    }
    randimiseCards() {
        this.randomisedCards = shuffleArray(letters)
    }
    puttingDataInTheContainer() {
        for (let i = 0; i < this.randomisedCards.length; i++) {
            container.innerHTML += `<div class="card" card_id="${i}" data_check="${this.randomisedCards[i]}">
            <div class="content unFlipped">
              <div class="front">
              
              </div>
              <div class="back d-flex justify-content-center align-items-center">
                <div class="w-50 h-50 rounded-circle" style="background-color:${this.randomisedCards[i]}; box-shadow: 0 0 70px 3px white;"></div>
              </div>
            </div>
          </div>`
        }
        this.content = Array.from(document.querySelectorAll(".content"))

    }
    cardClick() {
        this.wrongTryCounter = 0
        this.count = 0
        this.content.forEach(item => {
            item.addEventListener("click", (e) => {
                if (e.target.parentElement.classList.contains("unFlipped")) {
                    
                    e.preventDefault()
                    if (this.count == 0) {
                        item.classList.add("anime")
                        this.count++

                        this.cardId1 = e.target.parentElement.parentElement.attributes.card_id.value
                        this.firstCard = e.target.parentElement.parentElement
                        this.firstCardValue = e.target.parentElement.parentElement.attributes.data_check.value
                        this.firstContent = e.target.parentElement

                    }
                    else if (this.count == 1) {
                        this.cardId2 = e.target.parentElement.parentElement.attributes.card_id.value
                        if (this.cardId1 == this.cardId2) {

                        } else {
                            this.secondCard = e.target.parentElement.parentElement
                            this.secondCardValue = e.target.parentElement.parentElement.attributes.data_check.value
                            this.secondContent = e.target.parentElement

                            item.classList.add("anime")
                            this.count++

                            preventClick.classList.remove("d-none")
                            if (this.firstCardValue == this.secondCardValue) {

                                this.firstContent.classList.remove("unFlipped")
                                this.secondContent.classList.remove("unFlipped")
                                this.firstContent.classList.add("flipped")
                                this.secondContent.classList.add("flipped")
                            } else {
                                this.wrongTryCounter++
                                wrongTry.innerHTML = this.wrongTryCounter
                            }
                        }
                    }
                    if (this.count == 2) {
                        setTimeout(() => {
                            this.content.forEach(items => {

                                if (items.classList.contains("unFlipped")) {
                                    items.classList.remove("anime")
                                }
                            })
                            this.count = 0
                            preventClick.classList.add("d-none")
                            this.winMessage()
                        }, 500)
                    }
                }
            })
        })
    }
   winMessage(){
    this.flippedCards = document.querySelectorAll(".flipped")
    console.log(this.flippedCards.length,this.randomisedCards.length);
    if (this.flippedCards.length == this.randomisedCards.length){
      if(localStorage.getItem("bestScore") != null){
        if(this.wrongTryCounter<localStorage.getItem("bestScore") ){
        localStorage.setItem("bestScore",this.wrongTryCounter)
        }
      }else{
        localStorage.setItem("bestScore",this.wrongTryCounter)
      }
      setTimeout(() => {
        winPage.classList.remove("d-none")
        reloadBtn.addEventListener("click",()=>{

            location.reload();
        })
      }, 500)
     
    }
   }
}
let memoryInstance = new Memory()
memoryInstance.localStorageCheck()
memoryInstance.loginFunc()
memoryInstance.randimiseCards()
memoryInstance.puttingDataInTheContainer()
memoryInstance.winMessage()
memoryInstance.cardClick()


