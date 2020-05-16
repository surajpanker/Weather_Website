const request =require('request');
//langlatti is  string
const Gettemture =(langlatti,callback)=>{
    const  url = " http://api.weatherstack.com/current?access_key=ce36fa723fa5c18de6a69fffee286052&query="+encodeURIComponent(langlatti);
    request({url,json:true},(error,{body})=>{
        
    
         if(error){
             callback('UNABLE TO CONNECT NETWORK',undefined);
         }else if(body.error){
             callback("Unacle to get weather data, please try again latter",undefined);
         }
         else{
            
             const pri_data= `${body.current.weather_descriptions[0]}. 
                               Current Temperature is ${body.current.temperature} °C but  , I feel like is ${body.current.feelslike}°C
                                and wind speed is ${body.current.wind_speed} km/h and humidity is ${body.current.humidity} %
                                and date-time ${body.location.localtime}`
    
      callback(undefined,{
          description:pri_data,
          temperature:body.current.temperature,
          feelslike:body.current.feelslike

      })
         }
        })


}

module.exports=Gettemture;

