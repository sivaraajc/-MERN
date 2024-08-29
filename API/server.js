const express=require('express');
const mysql=require('mysql2');
const app=express();
const cors=require('cors');
const port=4000;
app.use(express.json());
app.use(cors());
const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    port:3306,
    database:'REACTCRUD'
});


db.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Connected to database");
    }
})

app.post('/reactcreate',(req,res)=>{
    const {name,email,password,address,phoneno}=req.body;
    const sql="INSERT INTO REACTCRUD.postreactdata (name,email,password,address,phoneno) VALUES (?,?,?,?,?)";
    const values=[name,email,password,address,phoneno];
    db.query(sql,values,(error,results)=>{
        if(error){
            console.log(error);
            res.status(400).send(error);
        }
        else{
            res.status(200).send(results);
        }
    })
})

app.get('/reactget',(req,res)=>{
    const sql='select * from REACTCRUD.postreactdata';
    db.query(sql,(error,results)=>{
        if(error){
            res.status(501).send(error);
        }
        else {
            res.status(200).send(results);
        }
    })
})

app.put('/reactupdate/:id',(req,res)=>{
    const id=req.params.id;
    const {name,email,password,address,phoneno}=req.body;
    const sql='update  REACTCRUD.postreactdata  set name=?,email=?,password=?,address=?,phoneno=? where id=?';
    const values=[name,email,password,address,phoneno,id];
    db.query(sql,values,(error,results)=>{
        if(error){
            res.status(501).send(error);
        }
        else {
            res.send(results)  
        }
    })
})


app.delete('/reactdelete/:id',(req,res)=>{
    const id=req.params.id;
    const sql='delete from REACTCRUD.postreactdata where id=?';
    const values=[id];
    db.query(sql,values,(error,result)=>{
        if(error) {
            res.send(error);
        }
        else {
            res.send(result)
        }
    });
});



app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})