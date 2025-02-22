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


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

