import { displayposter, createWantedPosterFront, createLogin } from "./js/display.js"

function start() {
    let jwt = localStorage.getItem("jwt")
    if (jwt != null) {
        let front = document.querySelector(".front")
        if (front) {
            front.remove()
        }
        document.getElementById("poster-container").appendChild(createWantedPosterFront("timadmar", "250,000,000"))
        displayposter()
    } else {
        document.getElementById("poster-container").appendChild(createLogin())
    }
}
start()