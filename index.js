const express=require('express');
const app=express();
const path=require('path');
const fs= require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


app.get("/", (req, res) => {
    fs.readdir('./files',(err,files)=>{
        //   console.log(files);
        res.render("index",{files:files});
    })

});
//creating route for create
app.post("/create",(req,res)=>{
    // title and description are name of input fields
    fs.writeFile(`./files/${req.body.title.split(" ").join("-")}.txt`,req.body.description,(err)=>{
        if(err){
            console.log(err);
        }else{
            console.log("file created");
        }
        //to get back to same page after creating file
        res.redirect("/");
    })
    // console.log(req.body);
    // res.send("data received");
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

