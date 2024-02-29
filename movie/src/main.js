


class Movie {
  adultTicketPrice;
  childTicketPrice;
  movieTitle;
  id;

  adultTicketsBought = 0;
  childTicketsBought = 0;

  amountSpentAdult() {
    return this.adultTicketPrice * this.adultTicketsBought
  }
  amountSpentChild() {
    return this.childTicketPrice * this.childTicketsBought
  }
  totalTicketsBought() {
    return this.adultTicketsBought + this.childTicketsBought
  }

  constructor(
    adultTicketPrice,
    childTicketPrice,
    movieTitle,
    id
  ) {
    this.adultTicketPrice = adultTicketPrice
    this.childTicketPrice = childTicketPrice
    this.movieTitle = movieTitle
    this.id = id
  }
}
const movies = []

const json = await(await (fetch('./data.json'))).json()
console.log(json)

for (let movie of json.movies) {
  const movieObject = new Movie(
    movie.adultPrice,
    movie.childPrice,
    movie.title,
    movie.id,
    makeButton(movie.title,movie.id),
    checkOutPage(movie.childPrice,movie.adultPrice,movie.title,movie.id)
    
    
  )
  
  movies.push(movieObject)
  }


function checkOutPage(pricek,pricea,title,id){
  document.getElementById(id).addEventListener("click",function(ev){

  const checkoutPage = document.getElementById("checkoutPage")
  checkoutPage.innerHTML = `
  <p>${title}</p>
  <button id ="${id}k"class = "btn">Buy for a kid: ${pricek}</button>
  <button id = "${id}a"class = "btn">Buy for an adult: ${pricea}</button>

  `
  hide("homePage")
  unHide("checkoutPage")
  })
}
function makeButton(title,id) {
 
  console.log("Made button")

 
  const homePage = document.getElementById("homePage")
  homePage.innerHTML += `
    <button class = "btn"id = "${id}">${title}</button>`
  unHide("homePage")
    
    
}

function getMovie(id) {
  for (let movie of movies) {
    if (movie.id == id) return movie
  }
}

function hide(elementId) {
  document.getElementById(elementId).classList.add("hide")
}
function unHide(elementId) {
  document.getElementById(elementId).classList.remove("hide")
}

function getStats(title,adultTicketBought,childTicketsBought,totalTicketsBought) {

 
    let stats = document.getElementById("stats")

    stats.innerHTML += `
    <p> Adult tickets bought for ${title} is :${adultTicketBought}</p>
    <p> Child tickets bought for ${title} is :${childTicketsBought}</p>
    <p> Total tickets bought for ${title} is :${totalTicketsBought}</p>`

  
}







