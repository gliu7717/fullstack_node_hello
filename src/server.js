import express from 'express'
let app = express();

app.get('/hello', (req,res)=>{
    res.send("Hello!")
})

app.listen(3000, ()=>{
    console.log("Server is listening on port 3000")
})