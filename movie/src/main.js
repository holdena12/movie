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
  getTotalSpent() {
    return this.getAmountSpentAdult() + this.getAmountSpentChild()
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
let totalSpent = 0;
/**
 * Gets the total amount of money spent in all, also accounts for tax.
 */
function getTotalMoneySpent(){
  for(let movie of movies){
    totalSpent += movie.getTotalSpent()
  }
  totalSpent = totalSpent * 1.0875
  Math.round(totalSpent)
  return totalSpent
}
/**
 * Hides the stats page and unHides the home page so you can switch back to the home page.
 */
function goHome(){
  hide("stats")
  unHide("homePage")
}
/**
 * Sets a timer to send you back to the hoe page after you were at the stats page for one minute.
 */
function goBackToHomePage(){
  setTimeout(goHome,6000);
}
/**
 * Created a specilized checkout page for each movie.
*/
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
let allChildTicketsBought = 0;
/**
 * Does the calculations to find how many child tickets were purchased in total.
 */
function getCompleteChildTicketsBought(){
  for(let movie of movies){
    allChildTicketsBought += movie.childTicketsBought
  }
  return allChildTicketsBought
}
let allAdultTicketsBought = 0;
/**
 * Does the calculations to find how many adult tickets were purchased in total.
 */
function getCompleteAdultTicketsBought(){
  for(let movie of movies){
    allAdultTicketsBought += movie.adultTicketsBought
  }
  return allAdultTicketsBought
}

  /**
   * Adds an event listener to check if a ticket is being purchased.
   */
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
/**
 * Makes all of the buttons for the home page by reading from the Movie class.
 */
function makeButton(movie) {
  const homePage = document.getElementById("homePage");
  homePage.innerHTML += `
      <button class="btn" id="${movie.id}">${movie.movieTitle}</button>
  `;
}
/**
 * Gets a movie based on their id.
 */
function getMovie(id) {
  for (let movie of movies) {
    if (movie.id == id) return movie
  }
}
/**
 * Does the calculations for how many tickets you have bought.
*/ 
function getCompleteTicketsPurchased(){
  
  for(let movie of movies){
    completeTicketsBought += movie.getTotalTicketsBought() 
  }
  return completeTicketsBought
}
/**
 * Hides an html element by changing their class.
 */
function hide(elementId) {
  document.getElementById(elementId).classList.add("hide")
}
/**
 * Un hides a hidden html element by changing their class.
 */
function unHide(elementId) {
  document.getElementById(elementId).classList.remove("hide")
}
let i =0;
/**
 * Gets the stats of the movie selected.
 */
function getStats(movie) {
  return `
      <p class="bold">${movie.movieTitle} </p>
        <li class="txt">
      Child tickets bought: ${movie.childTicketsBought} 
      Adult tickets bought: ${movie.adultTicketsBought} 
      Total tickets bought: ${movie.getTotalTicketsBought()}
      Total money spent on adult tickets: $${movie.getAmountSpentAdult()}
      Total money spent on child tickets: $${movie.getAmountSpentChild()}
      Total money spent: $${movie.getTotalSpent()}


        </li>
  `

}
/**
 * Displays a stats page and references the get stats function to get the stats for each movie.
 */
function displayAllStats() {
 
  const statsContainer = document.getElementById("stats")
  statsContainer.innerHTML = "<ul>"
  movies.forEach(movie => {
    if(movie.getTotalTicketsBought()>0){
      statsContainer.innerHTML += getStats(movie)
    }
  })
  statsContainer.innerHTML +=`
  <p class="txt">Total amount of tickets bought: ${getCompleteTicketsPurchased()}</p>
  <p class="txt">Total amount of child tickets bought: ${getCompleteChildTicketsBought()}</p>
  <p class="txt">Total amount of child tickets bought: ${getCompleteAdultTicketsBought()}</p>
  <p class="txt">Total amount spent plus tax: $${getTotalMoneySpent()}
  <button id="homeBtn" class = "btn">Home</button>`

  
  //<p>Total amount spent on tickets ${}
  
 

  statsContainer.innerHTML += "</ul>"

  hide("homePage")
  unHide("stats")
}

// Add event listener for the Stats button
document.getElementById("statsBtn").addEventListener("click", function(ev) {
  displayAllStats()
  goBackToHomePage()
  document.getElementById("homeBtn").addEventListener("click",function(ev){
    unHide("homePage")
    hide("stats")
  })
})
