import { query } from "./components.js";
import { fetchinfos, fetchlogin } from "./api.js";
import {drawDonutChart, representaudit} from "./svg.js"

export { displayposter, createWantedPosterFront, createLogin }
async function displayposter() {
    let log = document.querySelector(".front")
    log.remove()
    let jwt   = localStorage.getItem("jwt")
    let creds = await fetchinfos(jwt, query)
    let level = creds.transaction_aggregate.aggregate.max.amount
    let city  = creds.user[0].city
    let login = creds.user[0].login
    let ratio = creds.user[0].auditRatio
    let xp    = 0
    creds.transaction.map(e => xp += e.amount)
    xp = new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(xp)
    document.getElementById("poster-container").appendChild(createWantedPosterFront(login,xp,city,ratio, level))
}
function createLogin() {
    let range = document.createRange()
    let div = range.createContextualFragment(`
     <div class="poster front">
        <div class="piratehead" >
        </div>
         <form>
             <div class="title">LOG-IN</div>
             <input type="text" id="Username" placeholder="Username" required>
             <input type="password" id="Password" placeholder="Password" required>
             <div class="showmore"><button>☠Enter☠</button></div>
         </form>
     </div>
    `);

    let button = div.querySelector("button")
    button.addEventListener("click", async e => {
        e.preventDefault()
        let username = document.querySelector("#Username").value
        let password = document.querySelector("#Password").value
        let err = await fetchlogin(username, password)
        displayerror(err)
    })
    return div

}
function createWantedPosterFront(name, price, city = "Khouribga", ratio, level) {
    let range = document.createRange()
    let element =  range.createContextualFragment(`
        <div class="poster front">
            <div class="title">WANTED</div>
            <img src="./assets/pirate.jpg">
            <div class="brackets">DEAD OR ALIVE</div>
            <div class="name">${name}</div>
            <div class="bounty">${price}KB</div>
            <div class="showmore"><button>☠Show More☠</button></div>
        </div>
    `)
    let btn = element.querySelector("button")
    btn.addEventListener("click", function(){
    let f = document.querySelector(".front")
    f.remove()
    document.getElementById("poster-container").appendChild(createWantedPosterback(name, price, city = "Khouribga", ratio, level))
    })
    element.querySelector('.poster').appendChild(quit())
    return element
}
function createWantedPosterback(name, price, city = "Khouribga", ratio, level){
    let svg = representaudit(ratio)
    let csvg = drawDonutChart(level)
    let range = document.createRange()
    let element =  range.createContextualFragment(`
        <div class="poster">
        <div class="marine">From ${city} Rumoured to be at Zone01-Oujda</div>
        <div class="showmore"><button>☠go back☠</button></div>
        </div>
    `)
    let btn = element.querySelector("button")
    btn.addEventListener("click", function(){
    let f = document.querySelector(".poster")
    f.remove()
    document.getElementById("poster-container").appendChild(createWantedPosterFront(name, price, city = "Khouribga", ratio, level))
    })
    let holder = document.createElement("div")
    holder.classList.add("holder")
    holder.appendChild(svg)
    element.querySelector('.poster').prepend(holder)
    element.querySelector('.poster').prepend(csvg)
    element.querySelector('.poster').appendChild(quit())
    return element
}
function displayerror(err) {
    if (err != "200") {
        let title = document.querySelector(".title")
        title.textContent = err
        setTimeout(e => {
            title.textContent = "LOG-IN"
        }, 2000)
    }
}
function quit(){
    let range = document.createRange()
    let btn = range.createContextualFragment(`<div class="showmore"><button>☠Quit☠</button></div>`)
    let t = btn.querySelector("button")
    t.addEventListener("click", function(){
        localStorage.removeItem("jwt")
        location.reload()
    })
    return btn
}