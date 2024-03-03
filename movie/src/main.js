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
  console.log(movie)
  makeButton(movie.movieTitle, movie.id)
}
function getMovie(id) {
  for (let movie of movies) {
    if (movie.id == id) return movie
  }
}
function getCompleteTicketsPurchased(){
  
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

homePage.innerHTML +=`
<button id = "stats" class = "btn">Stats</button>`
function getStats(movie) {
  
  let stats = document.createElement("div")
  
   
  
  
  stats.innerHTML+=`
  <ul>${movie.movieTitle} Adult tickets bought: ${movie.adultTicketsBought} Child tickets bought: ${movie.childTicketsBought} total tickets bought ${movie.getTotalTicketsBought()}</ul>`
  
  
  hide("homePage")
  

}









