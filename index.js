const express=require('express');
const app=express();
const path=require('path');
const fs= require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended:true}));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


app.get("/", (req, res) => {
    fs.readdir('./files/tasks',(err,files)=>{
        fs.readdir('./files/done',(err,done)=>{
            res.render("index",{files:files,done:done});
        })
    })

});
//creating route for create
app.post("/create",(req,res)=>{
    // title and description are name of input fields
    fs.writeFile(`./files/tasks/${req.body.title.split(" ").join("-")}`,req.body.description,(err)=>{
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
//creating route for read
app.get("/files/:filename",(req,res)=>{
    const file=req.params.filename;
    const content=fs.readFile(`./files/tasks/${req.params.filename}`,"utf-8",(err,data)=>{
        res.render("read",{content:data,file:file});
    })
})
//creating route for edit
app.get("/edit/:filename",(req,res)=>{
    const file=req.params.filename;
    const content=fs.readFile(`./files/tasks/${req.params.filename}`,"utf-8",(err,data)=>{
        res.render("edit",{content:data,file:file});
    })
})
app.post("/edit/:filename",(req,res)=>{
    const oldFile = `./files/tasks/${req.params.filename}`;
    const newFile = `./files/tasks/${req.body.title.split(" ").join("-")}`;
    
    if (fs.existsSync(oldFile)) {
        fs.renameSync(oldFile, newFile);  // Rename instead of creating a new file
    }
   
        fs.writeFile(newFile,req.body.description,(err)=>{
            if(err){
                console.log(err);
            }else{
                console.log("file created");
            }
        })
        res.redirect("/");
   
})
//deleting route
app.get("/delete/:filename",(req,res)=>{
    fs.unlink(`./files/tasks/${req.params.filename}`,(err)=>{
        res.redirect("/");
    })
})
//done route
app.get("/done/:filename",(req,res)=>{
    fs.readFile(`files/tasks/${req.params.filename}`,"utf-8",(err,data)=>{
        fs.writeFile(`files/done/${req.params.filename}`,data,(err)=>{
            if(err){
                console.log(err);
            }else{
                console.log("done");
            }
        })
        fs.unlink(`files/tasks/${req.params.filename}`,(err)=>{
            if(err){
                console.log(err);
            }else{
                console.log("deleted");
            }
        })
        res.redirect("/");
    })
})
//deleting done route
app.get("/done/delete/:filename",(req,res)=>{
    fs.unlink(`files/done/${req.params.filename}`,(err)=>{
        res.redirect("/");
    })
})
//restoring done route
app.get("/done/restore/:filename",(req,res)=>{
    fs.readFile(`files/done/${req.params.filename}`,"utf-8",(err,data)=>{
        fs.writeFile(`files/tasks/${req.params.filename}`,data,(err)=>{ 
            if(err){
                console.log(err);
            }else{
                console.log("restored");
            }
        })
        fs.unlink(`files/done/${req.params.filename}`,(err)=>{
            if(err){
                console.log(err);
            }else{
                console.log("deleted");
            }
        })
        res.redirect("/");
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

