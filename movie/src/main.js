let adultTP = 0
let kidTP = 0
let totalTP = 0
let mutantTP = 0
let trollTP = 0
let spiderTP = 0

function hide(elementId){
  document.getElementById(elementId).classList.add("hide")
}
function unHide(elementId){
  document.getElementById(elementId).classList.remove("hide")
}
function getStats(totalTP){
  let stats = document.getElementById("stats")
  stats.innerHTML = `
  <div id = "stats">
  <p> Total tickets purchased: ${totalTP}
  <button id="goHome">Home</button>`
  document.getElementById("goHome").addEventListener("click",function(ev){
    hide("stats")
    unHide("homePage")
  })
}
function checkout(pricea,pricek,movie){


  
  
  let div = document.getElementById("checkoutPage")
  div.innerHTML =` 
  <div id = "checkoutPage" >
  <div id="${movie}">
  <button id="adultT">Buy for adult: ${pricea}</button>
  <button id="kidT">Buy for a kid: ${pricek}</button>
  <button id="homeButton">Home</button>
  </div>
  </div>
  `
  
  document.getElementById("homeButton").addEventListener("click",function(ev){
    unHide("homePage")
    hide("checkoutPage")
  })

  console.log(kidTP,adultTP,totalTP)
}
function countTicketsPurchased(element,typeP, movieP){
  document.getElementById(element).addEventListener("click",function(ev){
    typeP +=1
    movieP +=1
    totalTP +=1
  })
}


 

document.getElementById("tmnt").addEventListener("click",function(ev){
  hide("homePage")
  checkout("$15.49","$12.49",mutantTP)
  unHide("checkoutPage")
  countTicketsPurchased("adultT","adultTP",mutantTP)
  countTicketsPurchased("kidT","kidTP",mutantTP)




})
document.getElementById("smasv").addEventListener("click",function(ev){
  hide("homePage")
  checkout("$14.49","$11.24",spiderTP)
  unHide("checkoutPage")
  countTicketsPurchased("adultT","adultTP",spiderTP)
  countTicketsPurchased("kidT","kidTP",spiderTP)
  




})
document.getElementById("tbt").addEventListener("click",function(ev){
  hide("homePage")
  checkout("$10.49","$7.49",trollTP)
  unHide("checkoutPage")
  countTicketsPurchased("adultT","adultTP",trollTP)
  countTicketsPurchased("kidT","kidTP",trollTP)
  




})
document.getElementById("goToStats").addEventListener("click",function(ev){
  hide("homePage")
  getStats(totalTP)


  
})





