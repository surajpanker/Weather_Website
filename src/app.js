const express =require('express');
const path =require('path');
const hbs =require('hbs');
const geoCode =require('./utils/geocode.js');
const getTem =require('./utils/getTem.js');

const app =express();

 //path
const pathToPublic =path.join(__dirname,'../public');
const pathToView =path.join(__dirname,'../templates/views');
const pathHandler=path.join(__dirname,'../templates/partials');
console.log(pathHandler,pathToView)
//static
app.use(express.static(pathToPublic));//by default to root
hbs.registerPartials(pathHandler);
//engine
app.set('view engine','hbs');
//handler

app.set('views',pathToView);


app.get('', (req,res) => {
    res.render('index',{title:"Weather App",
title:'Weather App',
name:"Suraj Panker"})
})
app.get('/about',(req,res)=>{
res.render('about',{
    About:"Welcome to My Coding World",
    title:"About",
    name:"Suraj Panker"
});
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message: "Please If you face any problem , Write query on surajpanker82@gmail.com",
        help:"Help",
        name:"Suraj Panker"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    return res.send({error:"please enter address"})

      geoCode(req.query.address,(error,{latitude,longitude,location}={})=>{
          if(error){
            return res.send({error:"Address  not found,Please try again"})
          }
          let  place =location;
          getTem(`${latitude},${longitude}`,(error,response)=>{
              if(error){
                return res.send({error:"Address  not found"})
              }
              res.send({
                  address:place,
                  temp:response.temperature,
                  feel:response.feelslike,
                  forcast:response.description
              })
          })

      })
  
})
    
app.get("/products",(req,res)=>{
    if(!req.query.search){
        return res.send({error:"please use search "})
    }
console.log(req.query.search)
    res.send({
        products:[{name:"products"}]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        ErrorMessage:'This is page , but Article not found',
        title:"404 Error",
         name:"Suraj Panker"})
         ;});
app.get('*',(req,res)=>{
    res.render('404',{
        ErrorMessage:'This is page  not found',
        title:"404 Error",
         name:"Suraj Panker"});
    }
    );





app.listen('3001',()=>{
    console.log("App is running");
})