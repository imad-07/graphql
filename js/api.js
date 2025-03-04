export { fetchinfos, fetchlogin }
import { displayposter } from "./display.js";

async function fetchinfos(jwt, query) {
    let result = await fetch("https://learn.zone01oujda.ma/api/graphql-engine/v1/graphql", {
        method: "Post",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({query})
    })
    const data = await result.json()
    if(data.errors){
        localStorage.removeItem("jwt")
        location.reload()
    }else{
        return data.data
    }
}
async function fetchlogin(username, password) {
    let result = await fetch("https://learn.zone01oujda.ma/api/auth/signin", {
        method: "Post",
        headers: {
            Authorization: `Basic ${btoa(`${username}:${password}`)}`
        }
    })
    let jwt = await result.json()
    if (result.ok) {
        if (result.ok) {
            localStorage.setItem("jwt", jwt)
            displayposter()
            return "200"
        }
    } else {
        return "NOT-OK"
    }
}