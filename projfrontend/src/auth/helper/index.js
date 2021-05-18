import {API}  from "../../backend"
// API means : hhtp://localhost:8000/api/


// signup method
export const signup = user => {
    return fetch(`${API}/signup`, {
        method : "POST",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(error => console.log(error))
}



// sign in method
export const signin = user => {
    return fetch(`${API}/signin`, {
        method : "POST",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(user)
    })
    .then(response => {
        return response.json();
    })
    .catch(error => console.log(error))
}



// authenticate
export const authenticate = (data, next) => {
    if(typeof window!== "undefined") {
        localStorage.setItem ("jwt", JSON.stringify(data))
        next();
    }
}



// signout
export const signout = next => {
    if(typeof window !== "undefined") {
        localStorage.removeItem("jwt");
        next();

        return fetch(`${API}/signout`, {
            method : "GET"
        })
        .then(response => console.log("signout successful"))
        .catch(error => console.log(error))
    }
}



export const isAuthenticated = () => {
    if(typeof window == "undefined") {
        return false
    }
    if(localStorage.getItem ("jwt")) {
        return JSON.parse(localStorage.getItem("jwt"))
    } else {
        return false
    }
}

