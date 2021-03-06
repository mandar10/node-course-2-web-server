const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

var app=express();

const port=process.env.PORT || 3000; 

hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine','hbs');

app.use((req,res,next)=>{
    var now =new Date().toString();
    var log=now+":"+req.method+" "+req.url;
    console.log(now+":"+req.method+" "+req.url);
    fs.appendFileSync('server.log',log+"\n");
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintenence.hbs');
// });

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});

app.get('/',(req,res)=>{
    res.render('index.hbs',{
        pageTitle:'Welcome to Black_White',
        currentYear:new Date().getFullYear()
    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About Page',
        currentYear:new Date().getFullYear()
    });
});

app.get('/projects',(req,res)=>{
    res.render('projects.hbs',{
        pageTitle:'Projects',
        currentYear:new Date().getFullYear()
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage:'Unable to process your request'
    });
});

app.listen(port,()=>{
    console.log("Server Started on port "+port);
});