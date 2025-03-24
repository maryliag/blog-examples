const express = require('express')
const db = require('./database')

const app = express(); 
const PORT = 3030;
const pgPool = db.startPsql();

app.get('/users', async ( req, res ) => { 
    res.header("Access-Control-Allow-Origin", "*");
    try { 
        const dbRes = await db.getUsers(pgPool);
        res.send(dbRes.rows);
    } catch(e) {
        console.error(e);
        res.status(500);
        res.send({error: e});
    }
})

app.post('/add', ( req, res ) => { 
    res.header("Access-Control-Allow-Origin", "*");
    var users = db.addUser(pgPool, req.query['first_name'], req.query['last_name'], req.query['email']);
    res.send(users);
})

app.post('/remove', ( req, res ) => { 
    res.header("Access-Control-Allow-Origin", "*");
    var users = db.removeUser(pgPool, req.query['userID']);
    res.send(users);
});

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));