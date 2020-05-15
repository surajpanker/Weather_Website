const request =require('request')
const geocode = (address,callback)=>{
    const url ='http://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?language=en&limit=3&access_token=pk.eyJ1Ijoic3VyYWoxOTkiLCJhIjoiY2thMmF4dTZqMDFiYTNubXNnNzhhYTk3YSJ9.SboknFziGb8Ubfbd4HRrhw';
    request({url,json:true},(error,{body})=>{
    if(error){
    callback("Unable to connect to network",undefined);
    }else if(body.features.length==0){
        callback("Unable to find to your location",undefined);
    }else{
    callback(undefined,{
        latitude: body.features[2].center[1],
        longitude: body.features[2].center[0],
        location:body.features[2].place_name_en
    })
    }
    })
    } 
   

    module.exports=geocode;
