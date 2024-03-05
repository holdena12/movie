class Movie {
  adultTicketPrice;
  childTicketPrice;
  movieTitle;
  id;

  adultTicketsBought = 0;
  childTicketsBought = 0;

  getAmountSpentAdult() {
    return this.adultTicketPrice * this.adultTicketsBought
  }
  getAmountSpentChild() {
    return this.childTicketPrice * this.childTicketsBought
  }
  getTotalTicketsBought() {
    return this.adultTicketsBought + this.childTicketsBought
  }

  purchaseChildTicket() {
    this.childTicketsBought++
  }

  purchaseAdultTicket() {
    this.adultTicketsBought++
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
//console.log(json)

for (let movie of json.movies) {
  const movieObject = new Movie(
    movie.adultPrice,
    movie.childPrice,
    movie.title,
    movie.id,
    
  );
  movies.push(movieObject);
}

let completeTicketsBought =0;

for (let movie of movies) {
  makeButton(movie);
  
  
}
homePage.innerHTML+=`
<button id ="statsBtn" class="btn">Stats</button>`


for(let movie of movies){
  document.getElementById(movie.id).addEventListener("click",function(ev){
    checkOutPage(movie);
  });
}

// TODO: call this when stats page is loading
//for (let movie of movies){
//  countTickets(movie)
//}
getCompleteTicketsPurchased()

function checkOutPage(movie) {
  document.getElementById("checkoutPage").innerHTML = `
      <p>${movie.movieTitle}</p>
      <button id ="${movie.id}k" class="btn">Buy for a kid: ${movie.childTicketPrice}</button>
      <button id = "${movie.id}a" class="btn">Buy for an adult: ${movie.adultTicketPrice}</button>
      <button id ="homeButton" class="btn">Home</button>
  `;

  hide("homePage");
  unHide("checkoutPage");

  document.getElementById("homeButton").addEventListener("click", function(ev) {
      hide("checkoutPage");
      unHide("homePage");
  });
 

  addTicketPurchaseListner(movie)

}
  // Add event listeners for buying tickets
function addTicketPurchaseListner(movie){
  console.log("counting movie with id: " + movie.id)
  document.getElementById(`${movie.id}k`).addEventListener("click", function(ev) {
      movie.purchaseChildTicket()
      console.log("child ticket purchased for " + movie.childTicketPrice + " total tickets bought = " + movie.getTotalTicketsBought())

  });

  document.getElementById(`${movie.id}a`).addEventListener("click", function(ev) {
    movie.purchaseAdultTicket()
    console.log("adult ticket purchased for " + movie.adultTicketPrice + " total tickets bought = " + movie.getTotalTicketsBought())
  });
  for (let movie of movies){
    if (movie.getTotalTicketsBought() > 0){
    document.getElementById("statsBtn").addEventListener("click", function(ev) {
      getStats(movie)

    })
  }

  }
}
function makeButton(movie) {
  //console.log("Made button" + title + ":" + id);
  const homePage = document.getElementById("homePage");
  homePage.innerHTML += `
      <button class="btn" id="${movie.id}">${movie.movieTitle}</button>
  `;
}

function getMovie(id) {
  for (let movie of movies) {
    if (movie.id == id) return movie
  }
}
function getCompleteTicketsPurchased(movie){
  
  for(movie of movies){
    completeTicketsBought += movie.getTotalTicketsBought() 
  }
  return completeTicketsBought
}
function hide(elementId) {
  document.getElementById(elementId).classList.add("hide")
}
function unHide(elementId) {
  document.getElementById(elementId).classList.remove("hide")
}
let i =0;

function getStats(movie) {
  return `
      <li>"${movie.movieTitle}" Child tickets bought: ${movie.childTicketsBought} Adult tickets bought: ${movie.adultTicketsBought} Total tickets bought: ${movie.getTotalTicketsBought()}</li>
  `;
}

function displayAllStats() {
  const statsContainer = document.getElementById("stats");
  statsContainer.innerHTML = "<ul>";

  movies.forEach(movie => {
    if(movie.getTotalTicketsBought()>0){
      statsContainer.innerHTML += getStats(movie);
    }
  });
  statsContainer.innerHTML +=`
  <button id="homeBtn" class = "btn">Home</button>`
  
  
  
 

  statsContainer.innerHTML += "</ul>";

  hide("homePage");
  unHide("stats");
}

// Add event listener for the Stats button
document.getElementById("statsBtn").addEventListener("click", function(ev) {
  displayAllStats();
  document.getElementById("homeBtn").addEventListener("click",function(ev){
    unHide("homePage")
    hide("stats")
  })
});
