const express=require("express");
const {open}=require("sqlite");
const sqlite3=require("sqlite3");
const path=require("path");

const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");


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
app.get("/users/", async (request, response)=>{
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

// Register API

app.post("/register/", async (request, response)=>{
    const userDetails=request.body;
    const {username,password}=userDetails;
    const hashedPassword= await bcrypt.hash(password, 10);
    const checkUserQuery=`
    SELECT
    *
    FROM
    users
    WHERE username='${username}';`;
    const dbUser=await db.get(checkUserQuery);
    if(dbUser!==undefined) {
        response.status(400);
        response.send("User alraedy exists");
    }
    else {
        const createUserQuery = `
        INSERT INTO
        users (username, password)
        VALUES (
            "${username}",
            "${hashedPassword}"
        );`;

        await db.run(createUserQuery);
        response.status(200);
        response.send("User created successfully");
        
    }

});

// Delete API

app.delete("/users/:id", async (request, response)=>{
    const userId=request.params.id;
    const deleteUserQuery=`
    DELETE
    FROM
    users
    WHERE id=${userId};`;
    await db.run(deleteUserQuery);
    response.send("User deleted successfully");

});

// Login API

app.post("/login/", async (request, response)=>{
    const userdetails=request.body;
    const {username, password}=userdetails;
    const loginUserQuery=`
    SELECT 
    *
    FROM
    users
    WHERE
    username='${username}';`;
    const dbResponse= await db.get(loginUserQuery);
    if(dbResponse===undefined) {
        response.status(400);
        response.send("Invalid user");
    }
    else {
        const isPasswordMatched= await bcrypt.compare(password, dbResponse.password);
        if(isPasswordMatched===true) {
            const payload={username: username};
            const jwtToken=jwt.sign(payload, "MY_SECRET_KEY");
            console.log(jwtToken);
            response.send({jwtToken});
        } 
    }
})









