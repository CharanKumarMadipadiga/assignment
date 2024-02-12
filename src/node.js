const express=require("express");
const {open}=require("sqlite");
const sqlite3=require("sqlite3");
const path=require("path");


const dbPath=path.join(__dirname, "userdetails.db");
let db=null
const app=express();
app.use(express.json());


const initializeDBAndServer= async ()=>{
    try {
        db= await open ({
            filename: dbPath,
            driver: sqlite3.Database
        });
        app.listen(3000, ()=>{
            console.log("Server running at http://localhost:3000");
        });
    }
    catch(error) {
        console.log(`DB Error: ${error.message}`);
        process.exit(1);
    }
    
}

initializeDBAndServer();

// GET method API
app.get("/users",async (request, response)=>{
    const getUsersQuery=`
    SELECT
    *
    FROM
    users
    ;`;
    try {
        const usersList=await db.all(getUsersQuery);
        response.send(usersList);
    }
    catch(error) {
        console.log(error.message);
    }
    
});

app.post("/users/id", async (request, response)=>{
    const {username, password}=request.body
    const createUserQuery=`
    INSERT 
    INTO
    users (username, password)
    VALUES (
        '${username}',
        '${password}',
    );`;
    try {
        await db.run(createUserQuery);
        response.status(200);
        response.send("User created successfully");
    }
    catch(error) {
        console.log(error.message);
    }
    

});





