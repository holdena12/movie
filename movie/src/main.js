

const movies = []

const json = await(await fetch('./data.json')).json()
console.log(json)
for (let movie of json.movies) {
  const movieObject = new Movie(
    movie.adultPrice,
    movie.childPrice,
    movie.title,
    movie.id
  )
  movies.push(movieObject)


}

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
    returnthis.childTicketPrice * this.childTicketsBought
  }
  totalTicketsBought() {
    this.adultTicketsBought + this.childTicketsBought
  }

  constructor(
    adultTicketPrice,
    childTicketPrice,
    movieTitle,
    id,
  ) {
    this.adultTicketPrice = adultTicketPrice
    this.childTicketPrice = childTicketPrice
    this.movieTitle = movieTitle
    this.id = id
  }
}

function makeButton(title, id) {
  const homePage = document.getElementById("homePage")
  homePage.innerHTML = `
  <button id = "${id}">${title}</button>`
}
for (let movie of movies) {
  console.log(movie)
  makeButton(movie.movieTitle, movie.id)
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

function getStats() {

  for (let movie of movies) {
    const adultSpent = movie.amountSpentAdult()
    const childSpent = movie.amountSpentChild()

    let stats = document.getElementById("stats")

    stats.innerHTML += `
    <p> Adult tickets bought for ${movie.title} is :${movie.adultTicketsBought}</p>
    <p> Child tickets bought for ${movie.title} is :${movie.childTicketsBought}</p>
    <p> Total tickets bought for ${movie.title} is :${movie.totalTicketsBought}</p>`
  }

  let trollsSpent = trollTPA * (10.49)
  trollsSpent = trollsSpent + (trollTPK * 7.49)
  let spiderSpent = spiderTPA * (14.49)
  spiderSpent = spiderSpent + (spiderTPK * 11.24)
  let mutantSpent = mutantTPA * (15.49)
  mutantSpent = mutantSpent + (mutantTPK * 12.49)
  totalSpent = spiderSpent + trollsSpent + mutantSpent
  let stats = document.getElementById("stats")
  totalSpent = totalSpent * 1.0875
  stats.innerHTML = `
  <div id = "stats">
  <p> Total tickets purchased: ${totalTP}</p>
  <p> Total child tickets purchased: ${kidTP}</p>
  <p> Total adult tickets purchased: ${adultTP}</p>
  <p> Total spent in total: ${totalSpent}</p>


  
 `
  if (mutantTP > 0) {
    stats.innerHTML +=
      ` <p> Total tickets bought for Teenage Mutant Ninja Turtles: ${mutantTP}</p>
  <p> Total adult tickets purchased for Teenage Mutant Ninja Turtles: ${mutantTPA}</p>
  <p> Total child tickets purchased for Teenage Mutant Ninja Turtles: ${mutantTPK}</p>
  <p> Total spent on Teenage Mutant Ninja Turtles: $ ${mutantSpent}`
  }
  if (spiderTP > 0) {
    stats.innerHTML +=
      `
 
    <p> Total tickets bought for Spider Man: ${spiderTP}</p>
    <p> Total adult tickets purchased for Spider Man: ${spiderTPA}</p>
    <p> Total child tickets purchased for Spider Man: ${spiderTPK}</p>
    <p> Total spent on Spider Man: $ ${spiderSpent}</p>`
  }
  if (trollTP > 0) {
    stats.innerHTML +=
      `
   
      <p> Total tickets bought for Trolls: ${trollTP}</p>
      <p> Total adult tickets purchased for Trolls: ${trollTPA}</p>
      <p> Total child tickets purchased for Trolls: ${trollTPK}</p>
      <p> Total spent on trolls: $ ${trollsSpent}</p>`
  }
  stats.innerHTML += ` <button id="goHome">Home</button>`
  document.getElementById("goHome").addEventListener("click", function (ev) {
    hide("stats")
    unHide("homePage")
  })
  unHide("stats")
}
function checkout(pricea, pricek, movie) {




  let div = document.getElementById("checkoutPage")
  div.innerHTML = ` 
  <div id = "checkoutPage" >
  <div id="${movie}">
  <button id="adultT">Buy for adult: ${pricea}</button>
  <button id="kidT">Buy for a kid: ${pricek}</button>
  <button id="homeButton">Home</button>
  </div>
  </div>
  `

  document.getElementById("homeButton").addEventListener("click", function (ev) {
    unHide("homePage")
    hide("checkoutPage")
  })

  console.log(kidTP, adultTP, totalTP)
}






document.getElementById("tmnt").addEventListener("click", function (ev) {
  hide("homePage")
  checkout("$15.49", "$12.49", mutantTP)
  unHide("checkoutPage")
  document.getElementById("kidT").addEventListener("click", function (ev) {
    kidTP += 1
    totalTP += 1
    mutantTP += 1
    mutantTPK += 1

  })

  document.getElementById("adultT").addEventListener("click", function (ev) {
    adultTP += 1
    totalTP += 1
    mutantTP += 1
    mutantTPA += 1
  })




})
document.getElementById("smasv").addEventListener("click", function (ev) {
  hide("homePage")
  checkout("$14.49", "$11.24", spiderTP)
  unHide("checkoutPage")
  document.getElementById("kidT").addEventListener("click", function (ev) {
    kidTP += 1
    totalTP += 1
    spiderTP += 1
    spiderTPK += 1
  })

  document.getElementById("adultT").addEventListener("click", function (ev) {
    adultTP += 1
    totalTP += 1
    spiderTP += 1
    spiderTPA += 1
  })






})
document.getElementById("tbt").addEventListener("click", function (ev) {
  hide("homePage")
  checkout("$10.49", "$7.49", trollTP)
  unHide("checkoutPage")
  document.getElementById("kidT").addEventListener("click", function (ev) {
    kidTP += 1
    totalTP += 1
    trollTP += 1
    trollTPK += 1
  })

  document.getElementById("adultT").addEventListener("click", function (ev) {
    adultTP += 1
    totalTP += 1
    trollTP += 1
    trollTPA += 1
  })






})
document.getElementById("goToStats").addEventListener("click", function (ev) {
  hide("homePage")
  getStats(totalTP, kidTP)



})





