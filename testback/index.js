const express = require("express");
const app = express();

const port = 8000;   // it can be anything

const admin = (req,res)=> {
    return res.send("This is admin personal dashboard");
};

const isAdmin = (req, res, next)=> {
    console.log("isAdmin is running");
    next();
}

const isloggedIn = (req,res,next) => {
    console.log("authorised member");
    next();
}
// now we are making a get request on route / , and when someone visits on this route, we will add a method and define it
// later on, instead of defining it later on we will define it in the same line using () 'callback' , call back is not a 
// method but it acts the same way, if you are using curly brackets in this call back then if you have to return something
// so instead of that we can use paranthesis, whenever we are making a request it is compulsory to pass (req, res) parameters
// in same order and then we are returning response and sending HEllo there as message.
app.get("/login", (req, res) => {
    return res.send("You are visiting login route");          
} );


app.get("/admin", isloggedIn, isAdmin, admin);


app.get("/signin", (req, res) => {
    return res.send("You are signed in");          
} );

app.get("/signout", (req, res) => {
    return res.send("You are signed out");          
} );

app.get("/Sanyam", (req, res) => {
    return res.send("Sanyam uses instagram");          
} );



// now we have to make sure that we are listening on some port so that our server can send some response back,
// where you want to listen just mention port number and what you want to do after listening , we will again send a call back
app.listen(port, () => {
    console.log("Server is up and running...");
});

// const port = 3000

// app.get('/', (req, res) => res.send('Hello World!'))

// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))